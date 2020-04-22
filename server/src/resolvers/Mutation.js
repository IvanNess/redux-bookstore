import bcrypt from 'bcryptjs'

import getUserId from '../utils/getUserId'
import generateToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const createOrder = (parent, {order, user}, {prisma, request}, info)=>{

    const total = order.reduce((res, cartItem) => {
        return res + cartItem.total
    }, 0)

    return prisma.mutation.createOrder({
        data:{
            user: {
                connect:{
                    id: user
                }
            },
            total,
            cartItems: {
                create: order.map(({count, total, book})=>({
                    count, 
                    total,
                    book: {
                        connect: {
                            id: book
                        }
                    }
                }))
            }
        }
    }, info)
}

const Mutation = {
    createUser: (parent, { data: { name, email, password, order } }, { prisma, request }, info) => {
        if(!order){
            console.log('noorder')
            return prisma.mutation.createUser({
                data: {
                    name,
                    email,
                    password                
                }
            })
        }

        const total = order && order.reduce((res, cartItem) => {
            return res + cartItem.total
        }, 0)

        return prisma.mutation.createUser({
            data: {
                name,
                email,
                password,
                orders: {
                    create: {
                        total,
                        cartItems: {
                            create: order.map(cartItem => ({
                                count: cartItem.count,
                                total: cartItem.total,
                                book: {
                                    connect: {
                                        id: cartItem.book
                                    }
                                }
                            }))
                        }
                    }
                }
            }
        }, info)
    },

    addOrder: async function(parent, {user, order}, {prisma, request}, info){

        const {id: newOrderId} = await createOrder(parent, {user, order}, {prisma, request}, "{id}")

        console.log(newOrderId)

        return prisma.mutation.updateUser({
            where:{
                id: user
            },
            data: {
                orders:{
                    connect:{
                        id: newOrderId
                    }
                }
            }
        }, info)

    },

    createOrder

    //     createComment: async (parent, args, { prisma, request }, info) => {
    //         const userId = getUserId(request)
    //         const postExists = await prisma.exists.Post({
    //             id: args.post,
    //             published: true
    //         })
    //         if (!postExists)
    //             throw new Error('no post found')
    //         return prisma.mutation.createComment({
    //             data: {
    //                 text: args.text, 
    //                 author: { connect: { id: userId } },
    //                 post: { connect: { id: args.post } }
    //             }
    //         }, info)
    //     },
    //     updateComment: async (parent, { id, data }, { prisma, request }, info) => {
    //         const userId = await getUserId(request)

    //         const commentExists = await prisma.exists.Comment({ 
    //             id,
    //             author:{
    //                 id: userId
    //             }
    //         })
    //         if (!commentExists) throw new Error('you can not update this comment')

    //         return prisma.mutation.updateComment({
    //             where: { id },
    //             data
    //         }, info)
    //     },
    //     deleteComment: async (parent, { id }, { prisma, request }, info) => {
    //         const userId = await getUserId(request)

    //         const commentExists = await prisma.exists.Comment({ 
    //             id,
    //             author:{
    //                 id: userId
    //             } 
    //         })
    //         if (!commentExists) throw new Error('you can not delete this comment')

    //         return prisma.mutation.deleteComment({ where: { id } }, info)
    //     },


    //     createUser: async (parent, args, { prisma }, info) => {
    //         const userExists = await prisma.exists.User({ email: args.data.email })
    //         if (userExists)
    //             throw new Error('email taken.')
    //         const password = await hashPassword(args.data.password)
    //         const user = await prisma.mutation.createUser({ data: { ...args.data, password } })
    //         const token = generateToken(user.id)
    //         return { user, token }
    //     },

    //     login: async (parent, args, { prisma }, info) => {
    //         const user = await prisma.query.user({ where: { email: args.email } })
    //         if (!user)
    //             throw new Error('User or password is incorrect.')
    //         const isPasswordMatched = await bcrypt.compare(args.password, user.password)
    //         if (!isPasswordMatched)
    //             throw new Error("User or password is incorrect.")
    //         return {
    //             user,
    //             token: generateToken(user.id)
    //         }
    //     },

    //     updateUser: async(parent, args, { prisma, request }, info) => {
    //         const userId = getUserId(request)

    //         if(typeof args.data.password === 'string'){
    //             args.data.password = await hashPassword(args.data.password)
    //         }

    //         return prisma.mutation.updateUser({
    //             where: { id: userId },
    //             data: args.data
    //         }, info)
    //     },

    //     deleteUser: async (parent, args, { prisma, request }, info) => {
    //         const userId = getUserId(request)

    //         const userExists = await prisma.exists.User({ id: userId })
    //         if (!userExists)
    //             throw new Error('user not found')
    //         return prisma.mutation.deleteUser({ where: { id: userId } }, info)
    //     },

    //     createPost: (parent, { title, body, published }, { prisma, request }, info) => {
    //         const userId = getUserId(request)

    //         return prisma.mutation.createPost({
    //             data: {
    //                 title,
    //                 body,
    //                 published,
    //                 author: {
    //                     connect: {
    //                         id: userId
    //                     }
    //                 }
    //             }
    //         }, info)
    //     },
    //     updatePost: async (parent, { id, data }, { prisma, request }, info) => {
    //         const userId = getUserId(request)
    //         const postExists = await prisma.exists.Post({
    //             id,
    //             author: {
    //                 id: userId
    //             }
    //         })
    //         if (!postExists) throw new Error('No post found')
    //         const isPublished = await prisma.exists.Post({
    //             id,
    //             published: true
    //         })
    //         if(isPublished && data.published===false){
    //             await prisma.mutation.deleteManyComments({
    //                 where:{
    //                     post:{
    //                         id
    //                     }
    //                 }
    //             })
    //         }
    //         return prisma.mutation.updatePost({ where: { id }, data }, info)
    //     },

    //     deletePost: async (parent, args, { prisma, request }, info) => {
    //         const userId = getUserId(request)
    //         const postExists = await prisma.exists.Post({
    //             id: args.id,
    //             author: {
    //                 id: userId
    //             }
    //         })
    //         if (!postExists) throw new Error('No post found.')
    //         return prisma.mutation.deletePost({ where: { id: args.id } }, info)
    //     }
}

export default Mutation