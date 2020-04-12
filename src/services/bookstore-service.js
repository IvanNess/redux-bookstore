export default class BookstoreService{
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

    getBooks(){
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if(Math.random()>0.75)
                    reject('oops')
                resolve(this.data)
            }, 700)
        })
    }

    login=({name, password})=>{
        
    }
}