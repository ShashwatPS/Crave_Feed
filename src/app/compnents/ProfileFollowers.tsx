import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import img4 from "../_assets/image5.jpg"
import img1 from "../_assets/image7.jpg"
import img2 from "../_assets/image4.jpg"
import img3 from "../_assets/image6.png"
import img5 from "../_assets/image2.jpg"
import "../styles/ProfileFollowers.css"
import { useAppDispatch, useAppSelector } from "../globalRedux/hooks";
import { trpc } from "../_trpc/client";
import { userFollowingData } from "../globalRedux/features/users/postPageUser";
import { userFollowersData } from "../globalRedux/features/users/postPageUser";
export default function FollowersInMyProfile(){

    const dispatch = useAppDispatch();
    const mutation = trpc.followUnfollow.useMutation()
    // const following = trpc.getFollowingById.useQuery({id : 1})
    // console.log(following)

    // useEffect(() => {
    //     if(following.data)
    //     {
    //         dispatch(userFollowingData(following.data))
    //     }
    // })

    // const fetchedProfile = useAppSelector((state) => state.followingData.following.followingId)
    
    const follower = trpc.getFollowersById.useQuery({ id : 1})

    useEffect(() => {
        if(follower.data)
        {
            dispatch(userFollowersData(follower.data))
        }
    }, [follower])
    
    const fetchedProfile = useAppSelector((state) => state.followersData.followers)
    console.log(fetchedProfile)
    
    // const fetchedProfile = [
    //     {
    //         h1 : "Ivanka James",
    //         h2 : "@ivankajames",
    //         img : img3
    //     },
    //     {
    //         h1 : "Big Bundah Girl",
    //         h2 : "@bigBgirl",
    //         img : img1 
    //     },
    //     {
    //         h1 : "GlizzyGobbler",
    //         h2 : "@GZperiod",
    //         img : img2
    //     },
    //     {
    //         h1 : "Tiny Weenie",
    //         h2 : "@teeniweeni",
    //         img : img4    
    //     },
    //     {
    //         h1 : "Bob Loader",
    //         h2 : "@BLnigger",
    //         img : img3
    //     },
    //     {
    //         h1 : "Dee Snuts",
    //         h2 : "@DjNutter",
    //         img : img5
    //     }
    // ]
    return(
        <div className="follower-main-div">
                {fetchedProfile.map((value, index) => (
                    <div>
                    <Avatar alt="Profile Pic" src={img4.src} style={{position : "relative" , width : "10vh" , height : "10vh" , marginTop : "1vh" , marginLeft : "8vh" , border: "2px solid black"}}/>
                <div className="follower-profile">
                    {/* <h1>{value.FollowingUser.name}</h1> */}
                    <h1>{value.Usera.name}</h1>

                    {/* <h2>{value.FollowingUser.username}</h2> */}
                    <h2>{value.Usera.username}</h2>

                </div>
                <button onClick={() => {
                     mutation.mutate({ followerId : value.followerId , followingId : 1})
                }}>Remove</button>
                </div>))
                }
        </div>
    )
}