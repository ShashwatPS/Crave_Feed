"use client";

import { trpc } from './_trpc/client';
import {z} from "zod";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from './globalRedux/hooks';
import { increment , addAnyValue } from './globalRedux/features/counters/counterSlice';

export default function Home() {

    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    // const mutation = trpc.newPost.useMutation();
    // const check = () => {
    //     mutation.mutate({
    //         userId: 1 ,
    //         restaurantName: "KK",
    //         cityName: "Kanpur",
    //         dishName: "Matar Panner",
    //         caption: "Caption This",
    //         image: "This will be the imamge",
    //         location: "location",
    //     })
    //     // const responseData = mutation.data;
    //     // console.log("Mutation Data: ",responseData);
    // }
    const [inputValue, setInputValue] = useState('');
    const { data: users, isLoading, isFetching } = trpc.authSignInCheck.useQuery({ username: "shashwat123student@gmail.com" });
    const counterRPC = trpc.test.useQuery({counterRPC : 20})

    useEffect(() => {
        if(counterRPC.data) {
            dispatch(addAnyValue(counterRPC.data))
        }
    })
    const queryClient = useQueryClient();

    function handleClick() {
        console.log(users);
    }

    if (isLoading || isFetching) {
        return <p>Loading...</p>;
    }
    return(
        <div>
            <h1>Button for checking</h1>
            <button onClick={handleClick}>
                Check for Mutation
            </button>

            <button onClick={() => {dispatch(increment())}} style={{border : "2px solid grey" , borderRadius : '10px' , width : "100px" , height : "40px" , marginTop : "30px" }}>Click Here</button>
            <p>count is : {count}</p>
        </div>
    )
}