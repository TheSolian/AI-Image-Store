import cookie from '@elysiajs/cookie'
import cors from '@elysiajs/cors'
import jwt from '@elysiajs/jwt'
import swagger from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import stripeRouter from './routers/stripe-router'

const app = new Elysia().use(cors()).use(swagger()).use(stripeRouter)

app.listen(8080)
