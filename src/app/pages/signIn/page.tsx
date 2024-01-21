import React from "react";
import "./page.css";
import img1 from "../../_assets/image5.jpg";
import img2 from "../../_assets/image7.jpg"
import img3 from "../../_assets/image4.jpg"
import img4 from "../../_assets/image6.png"
import LockPersonIcon from '@mui/icons-material/LockPerson';

export default function SignIn() {
    const imgp1 = img1.src
    const imgp2 = img2.src
    const imgp3 = img3.src
    const imgp4 = img4.src
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
                <input type="text" id="input1" placeholder="Email"/>
                <input type="text" id="input2" placeholder="Password"/>
                <button className="loginBut">LOGIN</button>
                <h1>OR</h1>
                <button className="loginBut2">GOOGLE</button>
            </div>
            <div className="box2">
                <h1>Don't have an account?<span>Sign Up</span></h1>
            </div>
      </section>
    </div>
  );
}