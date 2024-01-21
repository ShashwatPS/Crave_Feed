"use client"

import React from "react";
import { useState } from "react";
import "./page.css";
import Avatar from '@mui/material/Avatar';
import img4 from "../../_assets/image6.png"
import CircularProgress from '@mui/material/CircularProgress';
import PostInMyProfile from "@/app/compnents/PofilePosts";
// import FollowersInMyProfile from "@/app/compnents/ProfileFollowers";
// import FollowingInMyProfile from "@/app/compnents/ProfileFollowing";
import VisitorsFollowersInMyProfile from "@/app/compnents/VisitProfileFollowers";
import VisitorsFollowingInMyProfile from "@/app/compnents/VisitProfileFollowing";
import { trpc } from "@/app/_trpc/client";
import { useAppSelector } from "@/app/globalRedux/hooks";
import VisitorsPostsInMyProfile from "@/app/compnents/VisitProfilePosts";
export default function UserUpdate(){
    const imgp4 = img4.src
    const [active , setActive] = useState("POSTS")
    // const id = useAppSelector((state) => state.currentUser.user.id)
    // const username = useAppSelector((state) => state.currentUser.user.username);
    // const name = useAppSelector((state) => state.currentUser.user.name);
    // const followers = useAppSelector((state) => state.userFollowers.numberOfFollowers);
    // const followings = useAppSelector((state) => state.userFollowing.followingNumbers);
    // const posts = useAppSelector((state) => state.userPost.postCount)
    
    const mutation = trpc.followUnfollow.useMutation()
    
    let followerId = useAppSelector((state) => state.followerFollowing.followerId)
    let followingId = useAppSelector((state) => state.followerFollowing.followingId)

    console.log("followerFollowing " , followerId , followingId)
    let isFollowing = trpc.followingStatus.useQuery({followerId , followingId})

    console.log("isFollowing ?????" , isFollowing.data)

    let visitedUserId = useAppSelector((state) => state.visitingUser.visitingUserId.visitingUserId)
    console.log(visitedUserId)
    const user = trpc.getUserById.useQuery({ id: visitedUserId });
    const follower = trpc.getFollowersById.useQuery({ id: visitedUserId });
    const following = trpc.getFollowingById.useQuery({ id: visitedUserId });
    const post = trpc.getPostsById.useQuery({ id: visitedUserId });

    const id = user.data?.id;
    const username = user.data?.username;
    const name = user.data?.name ;
    const followers = follower.data?.length;
    const followings = following.data?.length;
    const posts = post.data?.length
    return (
    <div className="mainDiv , visitUsermainDiv">
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
                        <button className="Edit-Profile" onClick={() => {
                            mutation.mutate({ followerId , followingId});
                        }} >
                            {isFollowing.data === 1?(
                                "Unfollow"
                            ):(
                                "Follow"
                            )
                            }
                        </button>
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
                    {active === "POSTS" && <VisitorsPostsInMyProfile/>}
                    {active === "FOLLOWERS" && <VisitorsFollowersInMyProfile/>}
                    {active === "FOLLOWING" && <VisitorsFollowingInMyProfile/>}
                </div>
            </div>
      </section>
    </div>
  )
}