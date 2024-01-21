import { trpc } from "@/app/_trpc/client";
import {publicProcedure, router} from "@/trpc/trpc";
import { z } from "zod"
import axios from "axios";

export const appRouter = router({
    test : publicProcedure
        .input(z.object({
            counterRPC : z.number()
        }))
        .query(async(opts) => {
            let counterRPC = opts.input.counterRPC;
            return counterRPC;
        }),
        // POST PAGES
    getUserById : publicProcedure
        .input(z.object({
            id : z.number()
        }))
        .query(async(opts) => {
            let userdata = opts.ctx.prisma.Usera.findUnique({
                where : { id : opts.input.id},
                include : {
                    Followers : true ,
                    Following : true
                }
            })

            return userdata;
        }),
    getFollowersById : publicProcedure
        .input(z.object({
            id : z.number()
        }))
        .query(async (opts) => {
            let followerData = opts.ctx.prisma.Follower.findMany({
                where : { followingId : opts.input.id},
                include : {
                    Usera : true
                },
            })
            return followerData
        }),
    getFollowingById : publicProcedure
        .input(z.object({
            id : z.number()
        }))
        .query(async (opts) => {
            let followingData = opts.ctx.prisma.Follower.findMany({
                where : { followerId : opts.input.id },
                include : {
                    FollowingUser : true
                }
            })
            return followingData
        }),
    getPostsById : publicProcedure
        .input(z.object({
            id : z.number()
        }))
        .query(async (opts) => {
            let postData = opts.ctx.prisma.Post.findMany({
                where : { userId : opts.input.id}
            })
            return postData
        }),
    followingStatus : publicProcedure
        .input(z.object({
            followerId : z.number(),
            followingId : z.number()
        }))
        .query(async (opts) => {
            let followerId = opts.input.followerId;
            let followingId = opts.input.followingId;

            const existingRelation = await opts.ctx.prisma.Follower.findFirst({
                where: {
                    followerId,
                    followingId,
                },
            });

            if(existingRelation)
            {
                return 1;
            }
            return 0;
        }),
    // editPost : publicProcedure 
    //     .input(z.object({
    //         name : z.string(),
    //         bio : z.string(),
    //         username : z.string(),
    //         foods : z.array(z.object({
    //             id : z.string() ,
    //             dish : z.string()
    //         })),
    //         cousine : z.object({
    //             id : z.string(),
    //             cousine : z.string()
    //         })
    //     }))
    //     .mutation(async (opts) => {
    //         const postData = await opts.input
    //         const updateProfile = await opts.ctx.prisma.Usera.update({

    //         })
    //     }),  
    // You will have to update or make few more tables for this logic 
    // Usera should have more attributes ....
    // take a look at zod input types ....
    signInCheck: publicProcedure
        .input(z.object({
            username: z.string(),
        }))
        .query(async(opts)=>{
           let username = opts.input.username;
            const userFound = await opts.ctx.prisma.Usera.findUnique({ //Can be removed
                where: { email: username },
            });
            if(userFound){
                return {message: true};
            } else {
                return { message: false};
            }
        }),
    authSignInCheck: publicProcedure
        .input(z.object({
            username: z.string(),
        }))
        .query(async(opts)=>{
            let username = opts.input.username;
            const userFound = await opts.ctx.prisma.UserAuth.findUnique({ //Can be removed
                where: { email: username },
            });
            if(userFound){
                return {message: true};
            } else {
                return { message: false};
            }
        }),
    signUp: publicProcedure
        .input(z.object({
            username : z.string() ,
            email: z.string() ,
            password : z.string(),
            name : z.string()
        }))
        .mutation(async (opts) =>
        {
            let username = opts.input.username;
            let password = opts.input.password;
            let email = opts.input.email;
            let name = opts.input.name
            const newUser = await opts.ctx.prisma.Usera.create({
                data : {
                    email ,
                    username ,
                    password ,
                    name,
                }
            })
            return { id: newUser.id };
        }) ,
    signedUp: publicProcedure
        .input(z.object({
            id : z.number() ,
            bio : z.string() ,
            profilepicture : z.string()
        }))
        .mutation(async (opts) =>
        {
            let id = opts.input.id;
            let bio = opts.input.bio;
            let profilepicture = opts.input.profilepicture;

            await opts.ctx.prisma.Usera.update({
                where: {
                    id: id,
                },
                data: {
                    bio: bio,
                    profilepicture: profilepicture
                },
            })
        }) ,
    followUnfollow: publicProcedure
        .input(z.object({
            followerId: z.number(),
            followingId: z.number(),
        }))
        .mutation(async (opts) => {
            const { followerId, followingId } = opts.input;

            // Check if the users exist
            const [follower, following] = await Promise.all([
                opts.ctx.prisma.Usera.findUnique({ where: { id: followerId } }),
                opts.ctx.prisma.Usera.findUnique({ where: { id: followingId } }),
            ]);

            if (!follower || !following) {
                throw new Error('Invalid user IDs.');
            }

            // Check if the relationship already exists
            const existingRelation = await opts.ctx.prisma.Follower.findFirst({
                where: {
                    followerId,
                    followingId,
                },
            });

            if (existingRelation) {
                await opts.ctx.prisma.Follower.delete({
                    where: {
                        id: existingRelation.id,
                    },
                });

                return { success: true, message: 'Successfully unfollowed the user.' };
            }
            await opts.ctx.prisma.Follower.create({
                data: {
                    followerId,
                    followingId,
                },
            });

            return { success: true };
        }),
    // unfollow: publicProcedure
    //     .input(z.object({
    //         followerId: z.number(),
    //         followingId: z.number(),
    //     }))
    //     .mutation(async (opts) => {
    //         const { followerId, followingId } = opts.input;
    //
    //         const [follower, following] = await Promise.all([
    //             opts.ctx.prisma.Usera.findUnique({ where: { id: followerId } }),
    //             opts.ctx.prisma.Usera.findUnique({ where: { id: followingId } }),
    //         ]);
    //
    //         if (!follower || !following) {
    //             throw new Error('Invalid user IDs.');
    //         }
    //         const existingRelation = await opts.ctx.prisma.Follower.findFirst({
    //             where: {
    //                 followerId,
    //                 followingId,
    //             },
    //         });
    //         if (!existingRelation) {
    //             throw new Error('Not following this user.');
    //         }
    //         await opts.ctx.prisma.Follower.delete({
    //             where: {
    //                 id: existingRelation.id,
    //             },
    //         });
    //         return { success: true }; // To test the code remove later
    //     }),
    newPost: publicProcedure
        .input(z.object({
            userId: z.number(),
            restaurantName: z.string(),
            cityName: z.string(),
            dishName: z.string(),
            caption: z.string(),
            image: z.string(),
            location: z.string(),
        }))
        .mutation(async (opts) => {
            let {userId,restaurantName,cityName,dishName,caption,image,location} = opts.input;

            await opts.ctx.prisma.Post.create({
                data: {
                    userId,
                    restuarant : restaurantName,
                    dish: dishName,
                    city: cityName,
                    caption,
                    image,
                    Location: location,
                },
            });
        }),
    getUserPosts: publicProcedure
        .input(z.object({
            userId: z.number(),
        }))
        .query(async (opts) => {
            const { userId } = opts.input;
            const userPosts = await opts.ctx.prisma.Post.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    Usera : true,
                    Likes: true,
                    Comments: {
                        include : {
                            Usera : true
                        }
                    },
                },
            });
            return userPosts;
        }),
    getPosts: publicProcedure
        .input(z.object({
            userId: z.number(),
        }))
        .query(async (opts) => {
            const { userId } = opts.input;
            const userPosts = await opts.ctx.prisma.Post.findMany({
                where: {
                    userId: {
                        not: userId,
                    },
                },
                include: {
                    Usera : true,
                    Likes: true,
                    Comments: {
                        include : {
                            Usera : true
                        }
                    },
                },
                take: 10, //No of posts to take change accordingly
            });
            return userPosts;
        }),
    addCommentToPost: publicProcedure
        .input(z.object({
            userId: z.number(),
            postId: z.number(),
            text: z.string(),
        }))
        .mutation(async (opts) => {
            const { userId, postId, text } = opts.input;
            const user = await opts.ctx.prisma.Usera.findUnique({ //Can be removed
                where: { id: userId },
            });
            const post = await opts.ctx.prisma.Post.findUnique({ //Can be removed
                where: { id: postId },
            });
            if (!user || !post) {
                throw new Error("User or post not found");
            }
            const newComment = await opts.ctx.prisma.Comment.create({
                data: {
                    userId,
                    postId,
                    text,
                },
            });
            return newComment;
        }),
    likePost: publicProcedure
        .input(z.object({
            userId: z.number(),
            postId: z.number(),
        }))
        .mutation(async (opts) => {
            const { userId, postId } = opts.input;

            const existingLike = await opts.ctx.prisma.Like.findFirst({
                where: {
                    userId,
                    postId,
                },
            });
            if (existingLike) {
                await opts.ctx.prisma.Like.delete({
                    where: {
                        id: existingLike.id,
                    },
                });
                await opts.ctx.prisma.Post.update({
                    where: { id: postId },
                    data: {
                        likeCount: {
                            decrement: 1,
                        },
                    },
                });
                return { message: 'Successfully removed like' };
            } else {
                await opts.ctx.prisma.Like.create({
                    data: {
                        userId,
                        postId,
                    },
                });
                await opts.ctx.prisma.Post.update({
                    where: { id: postId },
                    data: {
                        likeCount: {
                            increment: 1,
                        },
                    },
                });

                return { message: 'Successfully added like' };
            }
        }),
    getLikedPosts: publicProcedure
        .input(z.object({
            userId: z.number(),
        }))
        .query(async (opts) => {
            const { userId } = opts.input;

            // Retrieve the user
            const user = await opts.ctx.prisma.Usera.findUnique({
                where: { id: userId },
                include: { Likes: { include: { Post: true } } },
            });
            if (!user) {
                throw new Error("User not found");
            }
            const likedPosts = user.Likes.map((like) => like.Post);
            return likedPosts;
        }),
    getTheFuckOutOfHere: publicProcedure
        .input (z.object({
            user_preferences: z.string(),
            previous_choices: z.array(z.string()),
        }))
        .query(async (opts) => {
      // Call the recommendation API
        const response = await axios.post('https://cravefeed-model.onrender.com/', opts.input);
        const recommendedDishes = response.data.recommendations;
      // Query the database for posts that match the recommended dishes
        const posts = await opts.ctx.prisma.Post.findMany({
        where: {
          dish: {
            in : recommendedDishes,
          },
        },
        include: {
            Usera : true,
            Likes: true,
            Comments: {
                include : {
                    Usera : true
                }
            }
      }})
      return posts;
    }),
});

export type AppRouter = typeof appRouter;