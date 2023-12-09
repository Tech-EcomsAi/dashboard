import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@lib/auth'
import SessionProvider from '@providers/sessionProvider'
import { ReduxStoreProvider } from '@providers/reduxProvider'
import ErrorBoundaryProvider from '@providers/errorBoundaryProvider'
import "@styles/app.scss";
import { Suspense } from 'react'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
// title: 'Ecoms Ai',
// description: 'The everything app',
// }


export const metadata: Metadata = {
  title: 'Ecoms Ai',
  description: 'The everything app',
  generator: `
  
  ᴾʳᵉˢᵉⁿᵗⁱⁿᵍ ʸᵒᵘ...
        ▀▄▀▄▀▄🄴🄲🄾🄼🅂🄰🄸▀▄▀▄▀▄
    ✳  🎀  𝒯𝒽𝑒 𝑒𝓋𝑒𝓇𝓎𝓉𝒽𝒾𝓃𝑔 𝒶𝓅𝓅  🎀  ✳
    
  `,
  manifest: "/manifest.json",
  keywords: ["Ecommerce", "Artificial Intelligence"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#5271FF" }],
  authors: [
    { name: "Dnyaneshwar Garudkar" },
    {
      name: "Dnyaneshwar Garudkar",
      url: "https://garudkar.in",
    },
  ],
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
};


export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundaryProvider>
          <ReduxStoreProvider>
            <SessionProvider session={session}>
              <Suspense fallback={<Loading page="Main Layout" />}>
                {children}
              </Suspense>
            </SessionProvider>
          </ReduxStoreProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  )
}
