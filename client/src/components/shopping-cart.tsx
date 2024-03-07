import { API_URL, calculateTotal } from '@/lib/utils'
import { useAppSelector } from '@/redux/hooks'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios'
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { useState } from 'react'
import { PulseLoader } from 'react-spinners'
import { ShoppingCartItem } from './shopping-cart-item'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

interface ShoppingCartProps {}

export const ShoppingCart: React.FC<ShoppingCartProps> = () => {
  const cartItems = useAppSelector((state) => state.shop.shoppingCart)
  const auth = useAuth()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    const res = await axios.post(API_URL + '/stripe/create-checkout-session', {
      userId: auth.userId,
      cartItems,
    })

    setLoading(false)
    window.location.href = res.data
  }

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCartIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-8">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        {cartItems.length > 0 ? (
          <>
            <Separator />
            <div className="flex flex-col gap-2">
              {cartItems.map((cartItem) => (
                <ShoppingCartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </div>
            <Separator />
            <SheetFooter>
              <div className="flex w-full items-center justify-between">
                <p>Total - {calculateTotal(cartItems)}</p>
                <Button onClick={handleCheckout} disabled={loading}>
                  {loading ? (
                    <PulseLoader className="fill-white" />
                  ) : (
                    'Checkout'
                  )}
                </Button>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div>No items in cart</div>
        )}
      </SheetContent>
    </Sheet>
  )
}
