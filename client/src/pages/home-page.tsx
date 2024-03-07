import { ProductCard } from '@/components/product-card'
import { API_URL } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setPrices } from '@/redux/slices/shopSlice'
import axios from 'axios'
import { useEffect } from 'react'

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  const dispatch = useAppDispatch()
  const prices = useAppSelector((state) => state.shop.prices)

  async function getPrices() {
    const res = await axios.get(API_URL + '/stripe/prices')

    dispatch(setPrices(res.data))
  }

  useEffect(() => {
    getPrices()
  }, [])

  return (
    <main className="container grid grid-cols-4 content-start gap-4 pt-8">
      {prices.map((price) => (
        <ProductCard key={price.id} price={price} />
      ))}
    </main>
  )
}

export default HomePage
