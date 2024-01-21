"use client"

import React , {KeyboardEvent} from "react";
import { useEffect } from "react";
import "./page.css";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import img6 from "../../_assets/image4.jpg"
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Accordion , AccordionDetails , AccordionSummary , Typography} from "@mui/material";
import { Modal , Box} from "@mui/material";
import { trpc } from "@/app/_trpc/client";
import { useAppDispatch, useAppSelector } from "@/app/globalRedux/hooks";
import { userPostData , pushUserId , setVisitingUser , toggleFollowerFollowing} from "@/app/globalRedux/features/users/postPageUser";
import { useRouter } from "next/navigation";

export default function ForYou() {

    const router = useRouter()
    const imgpP = img6.src
    const mutation = trpc.likePost.useMutation()

    let [signedUrl, setSignedUrl] = useState<string | null>(null);

    useEffect(() => {
        // Fetch signedUrl and update state
        async function getImageURL() {
            const responseImage = await fetch(`https://image-upload-nq2i.onrender.com/url/Website.png`);
            signedUrl = await responseImage.text();
            setSignedUrl(signedUrl);
        }

        getImageURL();
    }, []);


    let modelDataPosts = trpc.getTheFuckOutOfHere.useQuery({user_preferences : "Chicken, Sugar, None, None, None, Dairy" , previous_choices : ["Butter Chicken"]})
        
    
    setTimeout(() => {console.log("This is modelData" , modelDataPosts.data)},5000)


    let [image, setImage] = useState<string>();
    const [open, setOpen] = useState(false);
    const [foodTags, setFoodTags] = useState<string[]>([]);
    const [cuisineTags, setCuisineTags] = useState<string[]>([]);
    const dispatch = useAppDispatch()
    const [toBeUploadedImage , setToBeUploadedImage] = useState<string>()
    let userDataByFil;
    
    // Upload Post Logic
    const [uploadCaption , setUploadCaption] = useState<string>('')
    const [uploadCity , setUploadCity] = useState<string>('')
    const [uploadRestaurant , setUploadRestaurant] = useState<string>('')
    const [uploadLocation , setUploadLocation] = useState<string>('')

    const mutationUploadPost = trpc.newPost.useMutation();



    const okID = useAppSelector((state) => state.userInfo.viewUserId)
    userDataByFil = trpc.getUserById.useQuery(okID)
    console.log(userDataByFil.data)
    
    const UserInfoData = userDataByFil.data;
    const postData = trpc.getPosts.useQuery({userId : 1})
    
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          setImage(URL.createObjectURL(e.target.files[0]));
        }
      }


      // IMAGE UPLOAD LOGIC



    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleCombinedChange = (event) => {
        handleImageChange(event);
        handleFileChange(event);
    };

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
            setToBeUploadedImage(result.data.imageName)
        } catch (error) {
            console.error('Error uploading file:', error);
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


    useEffect(() => {
        if(postData.data)
        {
            dispatch(userPostData(postData.data))
        }
    })

    const postDataArray = useAppSelector((state) => state.postData.postData)
    console.log(postDataArray)
    
    // HANDLE VIEW COMMENTS BUTTON

    const [expandedArray, setExpandedArray] = React.useState(new Array(postDataArray.length).fill(false));

  const handleExpansion = (index: number) => {
    // Toggle the expansion state of the clicked Accordion and close others
    setExpandedArray((prevExpandedArray) =>
      prevExpandedArray.map((_, i) => (i === index ? !prevExpandedArray[i] : false))
    );
  };

    // HANDLE LIKES 

    const [like, setLike] = useState(
        postDataArray.map((post) => ({ id: post.id , like: "UNLIKE" }))

    );

    function handleLike(postId: any) {
        setLike((prevLikes) =>
          prevLikes.map((prevLike) =>
            prevLike.id === postId ? { ...prevLike, like: "LIKE" } : prevLike
          )
        );
      }
      
      function handleUnLike(postId: any) {
        setLike((prevLikes) =>
          prevLikes.map((prevLike) =>
            prevLike.id === postId ? { ...prevLike, like: "UNLIKE" } : prevLike
          )
        );
      }
      



      const handleLikePost = async (postId: number) => {
        try {
            const result = await mutation.mutate({ userId: 1, postId });
            setTimeout(() => {
                window.location.reload();
            },10)
            console.log(result);
        } catch (error) {
            // Handle errors
            console.error(error);
        }
      };

    return (
    <div className="mainDiv">
      <section className="sec2">
            <div className="search">
                <div className="searchBox">
                    <SearchIcon style={{fontSize : "4.5vh" , marginRight : "2vh" , color: "rgb(213, 213, 213)"}}/>
                    <input type="text" placeholder="Search" />
                </div>
                <div className="addBtn">
                    <button onClick={() => setOpen(true)}> 
                    <AddBoxIcon/>
                    Add post
                    </button>
                </div>
            </div>
            <div className="posts , ForYouPosts">
                <div className="PandS">
                    <h1>Your Cravings</h1>
                    <div className="content">
                        {/* This is post content div */}
                        {modelDataPosts.data && modelDataPosts.data?.map((value, index) => (
                        // {imageArray.map((value, index) => (
                            <div className="content-post" key={index}>
                                <div className = "post-div1" style={{display : "flex"}}>
                                    <Avatar  src={imgpP} alt="Remy Sharp" style={{border : "2px solid black" , position : "relative" , width : "7vh" , height : "7vh" , marginTop : "1vh" , marginBottom : "1vh" , marginLeft : "2vh"}}/>
                                    <div>
                                    {/* <h2>{value.Usera.name}</h2> */}
                                        <h2>{value.Usera.name}</h2>
                                        <h3 onClick={() => {router.push(`https://www.google.com/maps/search/?api=1&query=${value.Location}`)}}><LocationOnIcon style={{color : "gray" , height : "17px" , marginTop : "-0.4vh" , marginRight : "-0.4vh"}}/>{value.Location}</h3>
                                    </div>
                                    <button onClick={() => {
                                        const id = value.Usera.id;
                                        dispatch(pushUserId({id}));
                                    }}>User Info</button>
                                </div>
                                {signedUrl && (
                                    <img src={signedUrl} alt="" />
                                )}
                                <div className="reactions">
                                    {/* {like.find((prevLike) => prevLike.id === value.id)?.like === "LIKE" ? (
                                        <FavoriteIcon style={{ color: "crimson" }} onClick={() => handleUnLike(value.id)} />
                                        ) : (
                                        <FavoriteBorderIcon onClick={() => handleLike(value.id)} />
                                    )} */}
                                    {value.Likes.length > 0 ? (value.Likes.map((like, index) => (
                                    <React.Fragment key={index}>
                                        {like.postId && like.postId === value.id ? (
                                            <FavoriteIcon style={{ color: "crimson" }} onClick={() => handleLikePost(value.id)} />
                                        ) : (
                                            <FavoriteBorderIcon/>
                                        )}
                                    </React.Fragment>
                                ))) : (
                                    <FavoriteBorderIcon onClick={() => handleLikePost(value.id)} />
                                )}
                                    <ChatBubbleIcon style={{marginLeft : "3vh"}}/>
                                    <SendIcon style={{marginLeft : "3vh"}}/>
                                </div>
                                <div className="about-post">
                                    <div>
                                        <h3>{value.caption}</h3>
                                    </div>
                                </div>
                                <div className="content-comments">
                                {/* <Accordion
                                    expanded={expanded}
                                    onChange={handleExpansion}
                                    // slots={{ transition: Fade }}
                                    // slotProps={{ transition: { timeout: 400 } }}
                                    // sx={{
                                    //     '& .MuiAccordion-region': { height: expanded ? 'auto' : 0 },
                                    //     '& .MuiAccordionDetails-root': { display: expanded ? 'block' : 'none' },
                                    //     }}
                                    style={{boxShadow : "none" ,borderRadius : "20px" , marginTop : "-0.5vh"}}
                                > */}
                                    <Accordion
                                    expanded={expandedArray[index]} // Use the individual expanded state
                                    onChange={() => handleExpansion(index)} // Pass the index to handleExpansion
                                    style={{ boxShadow: "none", borderRadius: "20px", marginTop: "-0.5vh" }}
                                    >
                                        <AccordionSummary
                                        aria-controls="panel1-content"
                                        id="panel1-header" >
                                        <Typography style={{fontSize : "14px"}}>View Comments</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        {value.Comments && Array.isArray(value.Comments) && value.Comments.length > 0 && (
                                            value.Comments.map((comment, commentIndex) => (
                                                <div key={commentIndex} className="comment-load-main-div">
                                                    <div style={{ display: "flex" }} className="comment-load-div">
                                                        <Avatar src={imgpP} alt="Remy Sharp" style={{ position: "relative",border: "1px solid black" , width: "6vh", height: "6vh", marginBottom: "1vh" }} />
                                                        <div className="comment-name-username">
                                                            <h2>{comment.Usera.name}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="comment-pTag">
                                                        <p>{comment.text}</p>
                                                    </div>
                                                </div>
                                            ))
                                            )}
                                    </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                        ))}
                    </div>
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
                <h2>Add Post</h2>
                <img src={image} alt="" />
                <div className="Add-Post-Upload-button">
                    <div className="Add-post-Upload-button-div">
                        <input type="file" onChange={handleCombinedChange} className="input-file" id={"fileInput"}/>
                    </div>
                </div>
                <div className="inputs">
                    <input type="text" onChange={(e) => setUploadCaption(e.target.value)}  placeholder="Add caption here" />
                        <div className="flex-input">
                            <input type="text" onChange={(e) => setUploadCity(e.target.value)} placeholder="Add City"/>
                            <input type="text" onChange={(e) => setUploadRestaurant(e.target.value)} placeholder="Enter Restaurant" id="flex-input2" />
                        </div>
                    <h3> </h3>
                    <div className="tags-input-container">
                        <input type="text" style={{paddingLeft : "1vh"}} onChange={(e) => e.target.value} className="tags-input" placeholder="Enter Location"/>                        
                    </div>
                    <h3>Three foods you crave most</h3>
                    <div className="tags-input-container">
                    {cuisineTags.map((tag, index) => (
                        <div className="tag-item" key={index}>
                            <span className="text">{tag}</span>
                            <span className="close" onClick={() => removeTagCuisine(index)}>&times;</span>
                        </div>
                    ))}
                        <input type="text" onKeyDown={handleKeyDownCuisine} style={{paddingLeft : "1vh"}} className="tags-input" placeholder="Enter the cousine"/>                        
                    </div>
                </div>
                <div>
                    <button className="post-button"
                            onClick={async () => {
                                    await uploadFile();
                                    const imageUrl = toBeUploadedImage || '';
                                    mutationUploadPost.mutate({userId : 1 , restaurantName : uploadRestaurant , dishName : "Random" , cityName : uploadCity , caption : uploadCaption , image : imageUrl , location : uploadLocation})
                                    window.location.reload();
                    }}
                    >POST</button>
                </div>
        </div>
        </Box>
      </Modal>
    </div>
  );
}   