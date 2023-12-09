"use client"
import React from "react"
import HeroCarousel from "@/components/HeroCarousel"
import { Box } from "@mui/joy"
import ProductsList from "./ProductsList"
import { useRouter } from "next/navigation"
import Navbar from "@/components/Navbar"

const Home = () => {
  const router = useRouter()
  const subdomain = router.query?.subdomain || "tomepromo"
  console.log(subdomain)

  return (
    <>
      <Navbar />
      <section>
        <div>
          <HeroCarousel />
        </div>
      </section>
      <Box
        component="section"
        sx={{
          p: 2,
          m: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Últimas Ofertas</h2>
        <ProductsList />
      </Box>
    </>
  )
}

export default Home
