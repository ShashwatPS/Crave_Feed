import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import img4 from "../_assets/image5.jpg"
import "../styles/ProfileFollowers.css"
import { useAppDispatch, useAppSelector } from "../globalRedux/hooks";
import { trpc } from "../_trpc/client";
export default function VisitorsFollowersInMyProfile(){

    let visitedUserId = useAppSelector((state) => state.visitingUser.visitingUserId.visitingUserId)
    console.log(visitedUserId)

    
    const follower = trpc.getFollowersById.useQuery({ id : visitedUserId})
    
    const fetchedProfile = follower.data
    
    return(
        <div className="follower-main-div">
                {fetchedProfile?.map((value, index) => (
                    <div>
                    <Avatar alt="Profile Pic" src={img4.src} style={{position : "relative" , width : "10vh" , height : "10vh" , marginTop : "1vh" , marginLeft : "16vh" , border: "2px solid black"}}/>
                <div className="follower-profile">
                    {/* <h1>{value.FollowingUser.name}</h1> */}
                    <h1>{value.Usera.name}</h1>

                    {/* <h2>{value.FollowingUser.username}</h2> */}
                    <h2>{value.Usera.username}</h2>

                </div>
                </div>))
                }
        </div>
    )
}
