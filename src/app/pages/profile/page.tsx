"use client"

import React from "react";
import { useState , KeyboardEvent } from "react";
import "./page.css";
import Avatar from '@mui/material/Avatar';
import img4 from "../../_assets/image6.png"
import CircularProgress from '@mui/material/CircularProgress';
import PostInMyProfile from "@/app/compnents/PofilePosts";
import FollowersInMyProfile from "@/app/compnents/ProfileFollowers";
import FollowingInMyProfile from "@/app/compnents/ProfileFollowing";
import { useAppSelector } from "@/app/globalRedux/hooks";
import { Modal , Box } from "@mui/material";

export default function MyProfile(){
    const imgp4 = img4.src
    const [active , setActive] = useState("POSTS")
    const [open, setOpen] = useState(false);
    const id = useAppSelector((state) => state.currentUser.user.id)
    const username = useAppSelector((state) => state.currentUser.user.username);
    const name = useAppSelector((state) => state.currentUser.user.name);
    const followers = useAppSelector((state) => state.userFollowers.numberOfFollowers);
    const followings = useAppSelector((state) => state.userFollowing.followingNumbers);
    const posts = useAppSelector((state) => state.userPost.postCount)
    const [foodTags, setFoodTags] = useState<string[]>([]);
    const [cuisineTags, setCuisineTags] = useState<string[]>([]);
    const [image, setImage] = useState<string>();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  }  

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



    return (
    <div className="mainDiv">
      <section className="sec2">
            <div className="secondary-div1">
                <Avatar alt="Profile Pic" src={imgp4} style={{position : "relative" , width : "20vh" , height : "20vh" , marginTop : "5vh" , marginLeft : "16vh" , border: "2px solid black"}}/>
                <div className="profileInfo">
                    <h1>{id !== null ? (
                        name
                    ) : (
                        <CircularProgress color="inherit" size={35} sx={{marginLeft : 5}}/>
                        // "Ivanka James"
                        )}</h1>
                    <h2>{username}</h2>
                    {/* <h2>@vibhorhalke</h2> */}
                    <div className="profile-follow">
                        <div className="profile-post">
                            <h1>{posts !== 0 ? (
                                posts
                                ) : (
                                    0
                                    )}</h1>
                            <h3>Post</h3>
                        </div>
                        <div className="profile-followers">
                            <h1>{followers !== 0 ? (
                                followers
                                ) : (
                                    0
                                    )}</h1>
                            <h3>Followers</h3>
                        </div>
                        <div className="profile-following">
                            <h1>{followings !== 0 ? (
                                followings
                                ) : (
                                    0
                                    )}</h1>
                            <h3>Following</h3>
                        </div>
                        <button className="Edit-Profile" onClick={() => setOpen(true)}>Edit Profile</button>
                    </div>
                    <p>Ivanka James: Culinary maven weaving flavors into unforgettable symphonies, turning every meal into a celebration of taste and culture.</p>
                </div>
            </div>
            <div className="secondary-div2">
                <div className="nav-buttons">
                    <button className="button" onClick={() => {setActive("POSTS");}}>
                        POSTS
                    </button>
                    <button className="button" onClick={() => {setActive("FOLLOWING")}}>
                        FOLLOWING                    
                    </button>
                    <button className="button" onClick={() => {setActive("FOLLOWERS")}}>
                        FOLLOWERS
                    </button>
                </div>
                <div className="button_result">
                    {active === "POSTS" && <PostInMyProfile/>}
                    {active === "FOLLOWERS" && <FollowersInMyProfile/>}
                    {active === "FOLLOWING" && <FollowingInMyProfile/>}
                </div>
            </div>
      </section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{padding: "5vh 40vh"}}
      >
        <Box >
        <div className="sub-div">
                <h2>Edit Profile</h2>
                    <div className="Upload-button" style={{display : "flex"}}>
                        <Avatar alt="Profile Pic" src={image} style={{position : "relative" , width : "14vh" , height : "14vh" , marginTop : "-2vh" , marginLeft : "30vh" , border: "2px solid black"}}/>
                        <div className="Upload-button-div">
                            <input type="file" onChange={handleImageChange} className="input-file" />
                        </div>
                    </div>
                <div className="inputs">
                    {/* <h3>Name</h3> */}
                    <input type="text" placeholder="Your Name" />
                    {/* <h3>Bio</h3> */}
                    <input type="text" placeholder="Bio" />
                    {/* <h3>Username</h3> */}
                    <input type="text" placeholder="Username" />
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
                <button>Update</button>
            </div>
        </Box>
      </Modal>
    </div>
  )
}