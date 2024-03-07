import { Elysia, t } from 'elysia'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'

const router = new Elysia({ prefix: '/stripe' })

router.get('/prices', async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    active: true,
    expand: ['data.product'],
  })

  return prices.data
})

router.post('/create-checkout-session', async ({ body }) => {
  const { cartItems } = body as {
    userId: string
    cartItems: {
      id: string
      price: number
      currency: string
      amount: number
      product: Stripe.Product
    }[]
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: cartItems.map((cartItem) => ({
      price_data: {
        currency: cartItem.currency,
        product_data: {
          name: cartItem.product.name,
          images: cartItem.product.images,
        },
        unit_amount: cartItem.price,
      },
      quantity: cartItem.amount,
    })),
    success_url: 'http://localhost:5173/payment/success',
    cancel_url: 'http://localhost:5173/',
  })

  return session.url
})

export default router
