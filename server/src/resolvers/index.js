import {extractFragmentReplacements} from 'prisma-binding'

import Query from './Query'
import Mutation from './Mutation'
import User from './User'
import Order from './Order'
import CartItem from './CartItem'
import Book from './Book'

const resolvers =  {
    Query,
    Mutation,
    User,
    Order,
    CartItem,
    Book
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export {resolvers, fragmentReplacements}