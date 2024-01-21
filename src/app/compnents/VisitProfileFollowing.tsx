import React from "react";
import { Avatar } from "@mui/material";
import img3 from "../_assets/image6.png"
import "../styles/ProfileFollowers.css"
import { trpc } from "../_trpc/client";
import { useAppSelector } from "../globalRedux/hooks";

export default function VisitorsFollowingInMyProfile(){

    let visitedUserId = useAppSelector((state) => state.visitingUser.visitingUserId.visitingUserId)
    console.log(visitedUserId)

    const following = trpc.getFollowingById.useQuery({id : visitedUserId})

    const fetchedProfile = following.data;

    return(
        <div className="follower-main-div">
                {fetchedProfile?.map((value, index) => (
                    <div>
                    <Avatar alt="Profile Pic" src={img3.src} style={{position : "relative" , width : "10vh" , height : "10vh" , marginTop : "1vh" , marginLeft : "16vh" , border: "2px solid black"}}/>
                <div className="follower-profile">
                    <h1>{value.FollowingUser.name}</h1>
                    <h2>{value.FollowingUser.username}</h2>
                </div>
                </div>))
                }
        </div>
    )
}