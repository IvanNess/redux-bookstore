import bcrypt from 'bcryptjs'
export default class BookstoreService {
    data = [
        {
            id: '1',
            title: 'Production-Ready Microservices',
            author: 'Susan J. Fowler',
            price: 15,
            coverImage: 'https://cv02.twirpx.net/2111/2111167.jpg'
        },
        {
            id: '2',
            title: 'Realease It!',
            author: 'Michael T. Nygard',
            price: 17,
            coverImage: 'https://cv02.twirpx.net/2518/2518659.jpg'
        }
    ]

    users = [
        {
            id: '1',
            name: "tea",
            email: "tea@bk.ru",
            password: '113720',
            orders: []
        }
    ]

    getBooks() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.75)
                    reject('oops')
                resolve(this.data)
            }, 700)
        })
    }

    getUser({ name, password }){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // if (Math.random() > 0.75)
                //     reject('get user error...')
                const user = this.users.find(user=>user.name===name)
                if(user && user.password === password)
                    resolve(user)
                reject('incorrect user or password...')
            }, 700)
        })
    }

    createUser({name, password, email, order}){
        console.log('create user', name, password, email)
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const existed = this.users.find(user=>user.name===name || user.email===email)
                if(existed)
                    reject('User is already existing...')
                const user = {
                    id: `${this.users.length + 1}`,
                    name,
                    email,
                    password,
                    orders: order? [order]: []
                }
                console.log('user', user)
                this.users = [...this.users, user]
                resolve(user)
            }, 700)
        })
    }

    addOrder({userId, order}){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const user = this.users.find(user=>user.id===userId)
                console.log('add order', user)
                user.orders.push(order)
                this.users = [...this.users]
                resolve(user)
            }, 700)
        })
    }

    createOrder({userId, order}){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                const userIdx = this.users.findIndex(user=>user.id===userId)
                if(order!==null)
                    this.users[userIdx].orders.push(order)
                resolve([...this.users])
            }, 700)
        })
    }
}