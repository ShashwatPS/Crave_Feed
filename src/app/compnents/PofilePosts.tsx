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
import {useAppDispatch} from "@/app/globalRedux/hooks";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {getQueryKey} from "@trpc/react-query";

const PostInMyProfile = () => {

    const dispatch = useAppDispatch();
    const router = useRouter()
    const queryClient = useQueryClient();
    const imgp7 = img6.src
    const imgpP = imgP.src

    const postData = trpc.getUserPosts.useQuery({userId : 1})
    const postDataArray = postData.data;

    // HANDLE VIEW COMMENTS BUTTON
    const [expandedArray, setExpandedArray] = React.useState(new Array(postDataArray?.length).fill(false));

    const handleExpansion = (index: number) => {
        setExpandedArray((prevExpandedArray) =>
            prevExpandedArray.map((_, i) => (i === index ? !prevExpandedArray[i] : false))
        );
    };

    // HANDLE LIKES
    // Bug fix: replaced window.location.reload() with targeted tRPC query invalidation.
    // Reloading the full page on every like click destroyed all local state, reset navigation,
    // and caused a jarring full-page flash on a 10ms timer — a race condition waiting to happen.
    const mutation = trpc.likePost.useMutation({
        onSuccess: () => {
            const queryKey = getQueryKey(trpc.getUserPosts, {userId: 1}, "query");
            queryClient.invalidateQueries({queryKey});
        }
    });

    const handleLikePost = async (postId: number) => {
        try {
            await mutation.mutateAsync({ userId: 1, postId });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="post-container">
            <div className="content">
                {postDataArray && postDataArray.map((value, index) => (
                    <div className="content-post" key={index}>
                        <div className = "post-div1" style={{display : "flex"}}>
                            <Avatar alt="Remy Sharp" src={imgp7} style={{border : "2px solid black" , position : "relative" , width : "7vh" , height : "7vh" , marginTop : "1vh" , marginBottom : "1vh" , marginLeft : "2vh"}}/>
                            <div>
                                <h2>{value.Usera.name}</h2>
                                <h3 onClick={() => {router.push(`https://www.google.com/maps/search/?api=1&query=${value.Location}`)}}><LocationOnIcon style={{color : "gray" , height : "17px" , marginTop : "-0.4vh" , marginRight : "-0.4vh"}}/>{value.Location}</h3>
                            </div>
                        </div>
                        <img src={imgpP} alt="" />
                        <div className="reactions">
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
                            <Accordion
                                expanded={expandedArray[index]}
                                onChange={() => handleExpansion(index)}
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
  
export default PostInMyProfile;
