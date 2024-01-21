import { appRouter } from '@/trpc';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { PrismaClient } from "@prisma/client";
import providers from "@/components/Providers";

let prisma = new PrismaClient

const handler = (req : Request) =>
    fetchRequestHandler({
        req,
        endpoint: '/api/trpc',
        router: appRouter,
        createContext: ()=> ({
            prisma: { Usera : prisma.usera , Post: prisma.post, Follower: prisma.follower, Like: prisma.like, Comment: prisma.comment, UserAuth: prisma.user}
        }),
    });

export { handler as GET, handler as POST};