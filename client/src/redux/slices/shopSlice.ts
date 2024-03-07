import { createSlice } from '@reduxjs/toolkit'
import Stripe from 'stripe'

export interface ShopState {
  prices: Stripe.Price[]
  shoppingCart: {
    id: string
    price: number
    currency: string
    amount: number
    product: Stripe.Product
  }[]
}

const initialState: ShopState = {
  prices: [],
  shoppingCart: [],
}

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.prices = action.payload
    },
    addToCart: (state, action) => {
      const { id, price, currency, amount, product } = action.payload

      const existingItem = state.shoppingCart.find((item) => item.id === id)

      if (existingItem) {
        existingItem.amount += amount
      } else {
        state.shoppingCart.push({
          id,
          price,
          currency,
          amount,
          product,
        })
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload

      state.shoppingCart = state.shoppingCart.filter((item) => item.id !== id)
    },
    addOneToCart: (state, action) => {
      const { id } = action.payload

      const existingItem = state.shoppingCart.find((item) => item.id === id)

      if (existingItem) {
        existingItem.amount += 1
      }
    },
    removeOneFromCart: (state, action) => {
      const { id } = action.payload

      const existingItem = state.shoppingCart.find((item) => item.id === id)

      if (existingItem) {
        if (existingItem.amount === 1) {
          state.shoppingCart = state.shoppingCart.filter(
            (item) => item.id !== id,
          )
        } else {
          existingItem.amount -= 1
        }
      }
    },
  },
})

export const {
  setPrices,
  addToCart,
  removeFromCart,
  addOneToCart,
  removeOneFromCart,
} = shopSlice.actions

export default shopSlice.reducer
