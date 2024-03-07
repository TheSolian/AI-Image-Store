import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'
import { Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Providers } from './components/providers'
import { ShoppingCart } from './components/shopping-cart'
import { buttonVariants } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Toaster } from './components/ui/sonner'

function App() {
  return (
    <Providers>
      <div className="h-full">
        <header className="flex items-center justify-between px-8 py-4">
          <Link to="/" className="text-3xl">
            Shop
          </Link>
          <div className="flex items-center gap-8">
            <ShoppingCart />
            <SignedIn>
              <UserButton afterSignOutUrl="/signin" />
            </SignedIn>
            <SignedOut>
              <Link to="/signin" className={buttonVariants()}>
                Sign In
              </Link>
            </SignedOut>
          </div>
        </header>
        <Separator />
        <Outlet />
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
        <Toaster />
      </div>
    </Providers>
  )
}

export default App
