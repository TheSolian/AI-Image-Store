import { formatPrice } from '@/lib/formatters'
import { useAppDispatch } from '@/redux/hooks'
import {
  addOneToCart,
  removeFromCart,
  removeOneFromCart,
} from '@/redux/slices/shopSlice'
import { Trash } from 'lucide-react'
import Stripe from 'stripe'
import { Button } from './ui/button'

interface ShoppingCartItemProps {
  cartItem: {
    id: string
    price: number
    currency: string
    amount: number
    product: Stripe.Product
  }
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
  cartItem,
}) => {
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex">
          <Button
            size="icon"
            variant="outline"
            className="rounded-r-none"
            onClick={() => dispatch(removeOneFromCart(cartItem))}
          >
            -
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-none border-x-0"
            onClick={() => dispatch(removeFromCart(cartItem))}
          >
            <Trash className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-l-none"
            onClick={() => dispatch(addOneToCart(cartItem))}
          >
            +
          </Button>
        </div>
        <span className="max-w-56 truncate">
          {cartItem.amount} x {cartItem.product.name}
        </span>
      </div>
      <span>
        {formatPrice(cartItem.price * cartItem.amount, cartItem.currency)}
      </span>
    </div>
  )
}
