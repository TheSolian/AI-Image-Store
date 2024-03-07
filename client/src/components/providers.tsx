import { store } from '@/redux/store'
import { ClerkProvider } from '@clerk/clerk-react'
import { Provider } from 'react-redux'

interface ProviderProps {
  children: React.ReactNode
}

export const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <ClerkProvider
        publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      >
        {children}
      </ClerkProvider>
    </Provider>
  )
}
