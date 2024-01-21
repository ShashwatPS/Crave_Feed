import {appRouter} from "@/trpc";
import {httpBatchLink} from "@trpc/client";

const serverClient = appRouter.createCaller({
    links: [httpBatchLink({
        url: 'http://localhost:3000/api/trpc'
    })],
})