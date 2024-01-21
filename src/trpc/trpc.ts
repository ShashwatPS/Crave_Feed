import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const t = initTRPC.context<{ prisma: {
        Follower : typeof prisma.follower,
        Usera : typeof prisma.usera,
        Post: typeof prisma.post,
        Like: typeof prisma.like,
        Comment: typeof prisma.comment,
        UserAuth: typeof prisma.user,
    } ; username?: string; }>().create();

export const router = t.router;
export const publicProcedure = t.procedure;