
import './globals.css'
// import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { getServerSession } from "next-auth"
import SessionProvider from "@/contexts/SessionProvider"

import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material/styles"
import { CssVarsProvider } from "@mui/joy/styles"
import CssBaseline from "@mui/joy/CssBaseline"




const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'], weight: ['300', '400','500','600','700' ]
})

// export const metadata: Metadata = {
//   title: 'OffShop',
//   description: 'Your offer shop',
// }

export default async function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>
          <CssVarsProvider>
            <CssBaseline />
            <SessionProvider session={session}>
            <main>{children}</main>
            </SessionProvider>
          </CssVarsProvider>
      </body>
    </html>
  )
}
