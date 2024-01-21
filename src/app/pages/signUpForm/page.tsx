"use client"
import React, {useState, ChangeEvent, KeyboardEvent, useRef, useEffect} from "react";
import { Avatar } from "@mui/material";
import "./page.css";
import {trpc} from "@/app/_trpc/client";

export default function SignUpForm() {

    const mutation2 = trpc.signedUp.useMutation();

    const [foodTags, setFoodTags] = useState<string[]>([]);
    const [cuisineTags, setCuisineTags] = useState<string[]>([]);
    const [image, setImage] = useState<string>();

    const [bio , setBio] = useState<string>("");
    const [profilePicture , setProfilePicture] = useState<string>("");
    

    // PROFILE PICTURE UPLOAD


    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };


    const FunctionalComponent = async (result) => {
        const responze = await mutation2.mutate({ id: 5, bio : bio , profilepicture : result.data.imageName});
    }

    const uploadFile = async () => {
        console.log("This is file state" , file);

        if (!file) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('photos', file);

        try {
            const response = await fetch('https://image-upload-nq2i.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            console.log(result);

            FunctionalComponent(result)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }



    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }

    const handleCombinedChange = (event) => {
        handleImageChange(event);
        handleFileChange(event);
    };

    function handleKeyDownFood(e : KeyboardEvent<HTMLInputElement>) {
        if(e.key !== 'Enter') return;
        const value = e.currentTarget.value;
        if(!value.trim()) return;
        setFoodTags([...foodTags, value]);
        e.currentTarget.value = ''
    }

    function removeTagFood(index : number){
        setFoodTags(foodTags.filter((e1 , i) => i !== index))
    }

    function handleKeyDownCuisine(e : KeyboardEvent<HTMLInputElement>) {
        if(e.key !== 'Enter') return;
        const value = e.currentTarget.value;
        if(!value.trim()) return;
        setCuisineTags([...cuisineTags, value]);
        e.currentTarget.value = ''
    }

    function removeTagCuisine(index : number){
        setCuisineTags(cuisineTags.filter((e1 , i) => i !== index))
    }

    return(
        <div className="main-div">
            <div className="sub-div">
                <h2>🍽️ Welcome to <span>CRAVEFEED</span>😋</h2>
                    <div className="Upload-button" style={{display : "flex"}}>
                        <Avatar alt="Profile Pic" src={image} style={{position : "relative" , width : "14vh" , height : "14vh" , marginTop : "-2vh" , marginLeft : "30vh" , border: "2px solid black"}}/>
                        <div className="Upload-button-div">
                            <input type="file" onChange={handleCombinedChange} className="input-file" />
                        </div>
                    </div>
                <div className="inputs">
                    {/* <h3>Name</h3> */}
                    <input type="text" placeholder="Bio" onChange={(e) => {setBio(e.target.value)}}/>
                    {/* <h3>Bio</h3> */}
                    <input type="text" placeholder="Address" />
                    {/* <h3>Username</h3> */}
                    <input type="text" placeholder="City you live in" />
                    {/* <h1> Spill the beans on your cravings, buddy!</h1> */}
                    <h3>Three foods you crave most </h3>
                    <div className="tags-input-container">
                    {foodTags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span className="close" onClick={() => removeTagFood(index)}>&times;</span>
                        </div>
                    ))}
                        <input type="text" onKeyDown={handleKeyDownFood} className="tags-input" placeholder="Enter your food"/>                        
                    </div>
                    <h3>Three cousines you like</h3>
                    <div className="tags-input-container">
                    {cuisineTags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span className="close" onClick={() => removeTagCuisine(index)}>&times;</span>
                        </div>
                    ))}
                        <input type="text" onKeyDown={handleKeyDownCuisine} className="tags-input" placeholder="Enter your food"/>                        
                    </div>
                </div>
                <button onClick={uploadFile}>Let's Go</button>
            </div>
        </div>
    )
}