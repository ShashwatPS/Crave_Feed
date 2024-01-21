import type { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import {PrismaClient} from ".prisma/client";

const prisma = new PrismaClient

export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId:  "987d88094114ae77845f",
            clientSecret: "39d49b6d76b6ba5ad0decf8be586320bd3b3c479",
        })
    ]
}