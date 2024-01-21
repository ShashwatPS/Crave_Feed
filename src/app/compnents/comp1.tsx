"use client"
import { trpc } from '../_utils/client';

export default function LandingPage()
{
    const getT = trpc.user.dummyResponse.useQuery()
    console.log(getT)
    return (
        <div>
            <section className="mainFooter">
                <div className="mainFooter-childDiv">
                    <h1>Team.</h1>
                    <div>
                        <h4>Connect:</h4>
                        <p>GitHub</p>
                        <p>Youtube</p>
                        <p>SIH</p>
                        <p>LinkdIn</p>
                    </div>
                    <div className="getTodo">
                        {JSON.stringify(getT.data)}
                    </div>
                </div>
            </section>
        </div>
    )
}