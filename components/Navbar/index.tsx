"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as S from './styles'
import { Box } from '@mui/joy'
import { useRouter } from "next/navigation"
import GlobalStyles from "@mui/joy/GlobalStyles"


const navIcons = [
  { src:'/assets/icons/search.svg', alt:'search' },
  { src:'/assets/icons/black-heart.svg', alt:'black-heart' },
  { src:'/assets/icons/user.svg', alt:'user' },
]

const Navbar = () => {
  const router = useRouter()
  // const subdomain = router.query.subdomain
  const subdomain = "tomepromo"
  const divName = subdomain ? subdomain : "Off"
  return (
    <>
      <Box sx={{backgroundColor:"background.level1",}}>
        <S.Header>
          <nav>
            <Link href="/" className="flex items-center gap-1">
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/assets/icons/logo.svg"
                  width={27}
                  height={27}
                  alt="logo"
                />

                <S.TextLogo>
                  {divName && (
                    <>
                      {divName}
                      <span className="text-primary">Shop</span>
                    </>
                  )}
                </S.TextLogo>
              </Box>
            </Link>

            <div className="flex items-center gap-5">
              {navIcons.map((icon) => (
                <Image
                  key={icon.alt}
                  src={icon.src}
                  alt={icon.alt}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              ))}
            </div>
          </nav>
        </S.Header>
      </Box>
    </>
  )
}

export default Navbar