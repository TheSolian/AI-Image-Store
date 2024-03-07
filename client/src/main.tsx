import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import HomePage from './pages/home-page.tsx'
import PaymentSuccessPage from './pages/payment-success-page.tsx'
import SignInPage from './pages/sign-in-page.tsx'

const rootRoute = createRootRoute({
  component: App,
})

const indexRoute = createRoute({
  path: '/',
  component: HomePage,
  getParentRoute: () => rootRoute,
})

const signInRoute = createRoute({
  path: '/signin',
  component: SignInPage,
  getParentRoute: () => rootRoute,
})

const paymentSuccessRoute = createRoute({
  path: '/payment/success',
  component: PaymentSuccessPage,
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  paymentSuccessRoute,
])

const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
