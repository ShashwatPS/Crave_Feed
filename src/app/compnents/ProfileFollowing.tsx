import React from "react";
import { Avatar } from "@mui/material";
import img4 from "../_assets/image5.jpg"
import img1 from "../_assets/image7.jpg"
import img2 from "../_assets/image4.jpg"
import img3 from "../_assets/image6.png"
import img5 from "../_assets/image2.jpg"
import "../styles/ProfileFollowers.css"
import { trpc } from "../_trpc/client";
import { useAppDispatch , useAppSelector } from "../globalRedux/hooks";
import { useEffect } from "react";
import { userFollowingData } from "../globalRedux/features/users/postPageUser";

export default function FollowingInMyProfile(){

    const dispatch = useAppDispatch();
    const mutation = trpc.followUnfollow.useMutation()
    const following = trpc.getFollowingById.useQuery({id : 1})

    // Bug fix: added [following.data] dependency array to prevent infinite re-render loop.
    // Without it, this effect ran on every render, dispatching and triggering another render endlessly.
    useEffect(() => {
        if(following.data) {
            dispatch(userFollowingData(following.data))
        }
    }, [following.data])

    const fetchedProfile = useAppSelector((state) => state.followingData.following)

    return(
        <div className="follower-main-div">
                {fetchedProfile.map((value, index) => (
                    <div key={index}>
                    <Avatar alt="Profile Pic" src={img3.src} style={{position : "relative" , width : "10vh" , height : "10vh" , marginTop : "1vh" , marginLeft : "8vh" , border: "2px solid black"}}/>
                <div className="follower-profile">
                    <h1>{value.FollowingUser.name}</h1>
                    <h2>{value.FollowingUser.username}</h2>
                </div>
                <button onClick={() => {
                    mutation.mutate({ followerId : 1 , followingId : value.followingId})
                }}>Remove</button>
                </div>))
                }
        </div>
    )
}
