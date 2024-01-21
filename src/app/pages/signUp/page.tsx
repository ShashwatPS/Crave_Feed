"use client"

import React from "react";
import "./page.css";
import img1 from "../../_assets/image5.jpg";
import img2 from "../../_assets/image7.jpg"
import img3 from "../../_assets/image4.jpg"
import img4 from "../../_assets/image6.png"
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { useAppDispatch , useAppSelector } from "@/app/globalRedux/hooks";
import { loggedUser } from "@/app/globalRedux/features/users/postPageUser";
import {useRouter} from "next/navigation";
export default function SignUp() {
    const imgp1 = img1.src
    const imgp2 = img2.src
    const imgp3 = img3.src
    const imgp4 = img4.src

    const router = useRouter()

    const dispatch = useAppDispatch();

    const [email , setEmail] = useState<string>("");
    const [username , setUsername] = useState<string>("");
    const [password , setPassword] = useState<string>("");
    const [name , setName] = useState<string>("");

      const mutation = trpc.signUp.useMutation()
      
      const check = async () => {
        await mutation.mutate({email , username , password , name})
        setTimeout(() => {
          console.log("Mutation Data" , mutation.data)
        }, 2000)
      }

    
    return (
    <div className="mainDiv">
      <section id="sec1">
        <h1>CraveFeed</h1>
        <img src={imgp1} alt="Description for imgLO" id="img1" />
        <img src={imgp2} alt="Description for img2" id="img2" />
        <img src={imgp3} alt="Description for img3" id="img3" />
        <img src={imgp4} alt="Description for img4" id="img4" />
      </section>
      <section id="sec2">
            <div className="box1">
                <LockPersonIcon style={{color : "gray" , fontSize : "7vh" , marginLeft : "25vh" , marginTop : "-3vh"}}/>
                <input type="text" id="input1" placeholder="Email" onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="text" id="input2" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                <input type="text" id="input2" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="text" id="input2" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <button className="loginBut" onClick={() => {check();
                    setTimeout(() => {
                        router.push("/pages/signUpForm")
                    } , 300)

                }}>SIGNUP</button>
                <h1>OR</h1>
                <button className="loginBut2">GOOGLE</button>
            </div>
            <div className="box2">
                <h1>Already have an account?<span>Sign In</span></h1>
            </div>
      </section>
    </div>
  );
}