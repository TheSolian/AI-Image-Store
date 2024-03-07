import { clsx, type ClassValue } from 'clsx'
import Stripe from 'stripe'
import { twMerge } from 'tailwind-merge'
import { formatPrice } from './formatters'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const API_URL = import.meta.env.VITE_API_URL || ''

export function calculateTotal(
  cartItems: {
    id: string
    price: number
    currency: string
    amount: number
    product: Stripe.Product
  }[],
) {
  const total = cartItems.reduce((total, cartItem) => {
    return total + cartItem.price * cartItem.amount
  }, 0)

  return formatPrice(total, cartItems[0].currency)
}
