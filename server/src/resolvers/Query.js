import getUserId from '../utils/getUserId'

const Query = {
    getBooks: (parent, args, {request, prisma}, info)=>{
        return prisma.query.books(null, info)
    },

    getUser: async (parent, {name, password}, {request, prisma}, info)=>{
        const user = await prisma.query.user({where: {name}}, "{password}")
        if(user.password===password){
            return prisma.query.user({where: {name}}, info)
        }else{
            throw new Error('Incorect username or password')
        }
    },
}

export default Query