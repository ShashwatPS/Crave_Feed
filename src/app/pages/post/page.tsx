"use client"

import Explore from "../explore/page";
import MyProfile from "../profile/page";
import React, { useEffect } from "react";
import "./page.css";
import Avatar from '@mui/material/Avatar';
import { useState } from "react";
import img6 from "../../_assets/image4.png"
import img4 from "../../_assets/image6.png"
import ExploreIcon from '@mui/icons-material/Explore';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PersonIcon from '@mui/icons-material/Person';
import { useAppSelector , useAppDispatch } from "@/app/globalRedux/hooks";
import LogoutIcon from '@mui/icons-material/Logout';
import { trpc } from "@/app/_trpc/client";
import { currentUser } from "@/app/globalRedux/features/users/loginUser";
import { followersUser , followingUsers , userPosts } from "@/app/globalRedux/features/users/postPageUser";
import CircularProgress from '@mui/material/CircularProgress';
import ForYou from "../forYou/page";

export default function PostPageTSX() {
    const imgp4 = img4.src
    const [active , setActive] = useState("EXPLORE")

    // Fetching data frombackend
    const dispatch = useAppDispatch()
    
    const user = trpc.getUserById.useQuery({id : 1})
    const follower = trpc.getFollowersById.useQuery({id: 1});
    const following = trpc.getFollowingById.useQuery({id : 1});
    const post = trpc.getPostsById.useQuery({id: 1})
    
    
    // Storing States 

    useEffect(() => {
        if(user.data)
        {
            dispatch(currentUser(user.data))
        }
    })

    useEffect(() => {
        if(follower.data)
        {
            dispatch(followersUser(follower.data?.length))
        }
    })

    useEffect(() => {
        if(following.data)
        {
            dispatch(followingUsers(following.data?.length))
        }
    })

    useEffect(() => {
        if(post.data)
        {
            dispatch(userPosts(post.data?.length))
        }
    })

    // Fetching PRofile image

    const imageUrl = trpc.getUserById.useQuery({id : 1})

    let [signedUrl , setSignedUrl] = useState<string | undefined>(undefined)

    var notOkayImage = imageUrl.data?.profilepicture
    useEffect(() => {
        async function getImageUrl() {
            const response = await fetch(`https://image-upload-nq2i.onrender.com/url/${notOkayImage}`);
            let signedUrl = await response.text();
            setSignedUrl(signedUrl);
        }

        getImageUrl();
    })  

    // Fetching State Values

    const id = useAppSelector((state) => state.currentUser.user.id);
    const username = useAppSelector((state) => state.currentUser.user.username);
    const name = useAppSelector((state) => state.currentUser.user.name);
    const followers = useAppSelector((state) => state.userFollowers.numberOfFollowers);
    const followings = useAppSelector((state) => state.userFollowing.followingNumbers);
    const posts = useAppSelector((state) => state.userPost.postCount)

    return (
    <div className="mainDiv">
      <section className="sec1">
            <h1>CRAVEFEED</h1>
            <Avatar alt="Remy Sharp" src={signedUrl || undefined} style={{position : "relative" , width : "13vh" , height : "13vh" , marginTop : "9vh" , marginLeft : "13vh" , border: "2px solid black"}}/>
            <div className="username">
                <h1>{id !== null ? (
                        name
                    ) : (
                        <CircularProgress color="inherit" size={35} sx={{marginLeft : "6vh"}}/>
                    )}</h1>
                <h2>{username}</h2>
            </div>
            <div className="follow">
                <div className="post">
                <h1>{posts !== 0 ? (
                        posts
                    ) : (
                        0
                    )}</h1>
                    <h3>Post</h3>
                </div>
                <div className="followers">
                    <h1>{followers !== 0 ? (
                        followers
                    ) : (
                        0
                    )}</h1>
                    <h3>Followers</h3>
                </div>
                <div className="following">
                <h1>{followings !== 0 ? (
                        followings
                    ) : (
                        0
                    )}</h1>
                    <h3>Following</h3>
                </div>
            </div>
            <div className="InPages">
                <div className="explore" onClick={() => setActive("EXPLORE")}>
                    <button>
                        <ExploreIcon style={{fontSize : "3.2vh" , marginTop : "0.8px"}}/>
                        <h1>Explore</h1>
                    </button>
                </div>
                <div className="forYou" onClick={ () => setActive("FOR YOU")}>
                    <button>
                        <SupervisedUserCircleIcon style={{fontSize : "3.2vh" , marginTop : "0.8px"}} />
                        <h1>For You</h1>
                    </button>
                </div>
                    <div className="profile" onClick={ () => setActive("PROFILE")}>
                        <button>
                            <PersonIcon style={{fontSize : "3.2vh" , marginTop : "0.8px"}} />
                            <h1>Profile</h1>
                        </button>
                    </div>
            </div>
            <div className="logout">
                <div>
                    <LogoutIcon style={{fontSize : "3.2vh" , marginTop : "2.4vh" , marginLeft : "1.5vh"}}/>
                    <h1>Logout</h1>
                </div>
            </div>
      </section>
      {active === "EXPLORE" && <Explore/>}
      {active === "PROFILE" && <MyProfile/>}
      {active === "FOR YOU" && <ForYou/>}
    </div>
  );
}