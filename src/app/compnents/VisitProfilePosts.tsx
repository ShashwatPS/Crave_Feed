import React from "react";
import "../styles/ProfilePage.css"
import Avatar from "@mui/material/Avatar";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {pushUserId} from "@/app/globalRedux/features/users/postPageUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import SendIcon from "@mui/icons-material/Send";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {trpc} from "@/app/_trpc/client";
import imgP from "../_assets/post1.webp"
import img6 from "../_assets/image4.jpg"
import {useAppDispatch, useAppSelector} from "@/app/globalRedux/hooks";
import {useRouter} from "next/navigation";
// const imageArray = [
//     img1.src,
//     img2.src,
//     img3.src,
//     img4.src,
//     img5.src,
//     img6.src,
//     img7.src,
//     img8.src,
//     // Add more image URLs as needed
//   ];
//
//   const PostInMyProfile = () => {
//     return (
//       <div className="post-container">
//         {imageArray.map((imageUrl, index) => (
//           <img key={index} src={imageUrl} alt={`Post Image ${index + 1}`} className="post-image" />
//         ))}
//       </div>
//     );
//   };
const VisitorsPostsInMyProfile = () => {

    const router = useRouter()
    const dispatch = useAppDispatch();

    let visitedUserId = useAppSelector((state) => state.visitingUser.visitingUserId.visitingUserId)

    const imgp7 = img6.src
    const imgpP = imgP.src

    const postData = trpc.getUserPosts.useQuery({userId : visitedUserId})
    const postDataArray = postData.data;
    // HANDLE VIEW COMMENTS BUTTON
    const [expandedArray, setExpandedArray] = React.useState(new Array(postDataArray?.length).fill(false));

    const handleExpansion = (index: number) => {
        // Toggle the expansion state of the clicked Accordion and close others
        setExpandedArray((prevExpandedArray) =>
            prevExpandedArray.map((_, i) => (i === index ? !prevExpandedArray[i] : false))
        );
    };

    // HANDLE LIKES
    const mutation = trpc.likePost.useMutation()
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
        <div className="post-container">
            <div className="content">
                {/* This is post content div */}
                {postDataArray && postDataArray.map((value, index) => (
                    // {imageArray.map((value, index) => (
                    <div className="content-post" key={index}>
                        <div className = "post-div1" style={{display : "flex"}}>
                            <Avatar alt="Remy Sharp" src={imgp7} style={{border : "2px solid black" , position : "relative" , width : "7vh" , height : "7vh" , marginTop : "1vh" , marginBottom : "1vh" , marginLeft : "2vh"}}/>
                            <div>
                                {/* <h2>{value.Usera.name}</h2> */}
                                <h2>{value.Usera.name}</h2>
                                <h3 onClick={() => {router.push(`https://www.google.com/maps/search/?api=1&query=${value.Location}`)}} ><LocationOnIcon style={{color : "gray" , height : "17px" , marginTop : "-0.4vh" , marginRight : "-0.4vh"}}/>{value.Location}</h3>
                            </div>
                        </div>
                        <img src={imgpP} alt="" />
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
                                                    <Avatar alt="Remy Sharp" src={imgp7} style={{ position: "relative",border: "1px solid black" , width: "6vh", height: "6vh", marginBottom: "1vh" }} />
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
    );
};

export default VisitorsPostsInMyProfile;