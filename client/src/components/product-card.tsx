import { formatPrice } from '@/lib/formatters'
import { useAppDispatch } from '@/redux/hooks'
import { addToCart } from '@/redux/slices/shopSlice'
import { useAuth } from '@clerk/clerk-react'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import Stripe from 'stripe'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface ProductCardProps {
  price: Stripe.Price
}

export const ProductCard: React.FC<ProductCardProps> = ({ price }) => {
  const dispatch = useAppDispatch()
  const auth = useAuth()
  const navigate = useNavigate()

  const product = price.product as Stripe.Product

  function handleClick() {
    if (!auth.isSignedIn) {
      return navigate({ to: '/signin' })
    }

    try {
      dispatch(
        addToCart({
          id: price.id,
          price: price.unit_amount!,
          currency: price.currency,
          amount: 1,
          product,
        }),
      )

      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <Card>
      <img
        src={product.images[0]}
        alt={product.name}
        className="h-56 w-full rounded-t-md object-cover"
      />
      <CardHeader className="pb-2 text-xl">
        <CardTitle className="h-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="line-clamp-2">{product.name}</p>
              </TooltipTrigger>
              <TooltipContent>{product.name}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-primary">
          {formatPrice(price.unit_amount!, price.currency)}
        </p>
        <p>{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleClick}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
