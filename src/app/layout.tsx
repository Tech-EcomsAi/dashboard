import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import SessionProvider from '@providers/sessionProvider'
import { ReduxStoreProvider } from '@providers/reduxProvider'
import ErrorBoundaryProvider from '@providers/errorBoundaryProvider'
import "@styles/app.scss";
import AntdLayoutWrapper from '@antdComponent/layoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ecoms Ai',
  description: 'The everything app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundaryProvider>
          <ReduxStoreProvider>
            <AntdLayoutWrapper>
              <SessionProvider session={session}>
                {children}
              </SessionProvider>
            </AntdLayoutWrapper>
          </ReduxStoreProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  )
}
