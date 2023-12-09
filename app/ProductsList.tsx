"use client"
import { getProductsPaginated } from "@/lib/actions"
import { Box } from "@mui/joy"
import React, { useState, useEffect } from "react"
import Card from "@/components/Card"

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)
  const [visibleProducts, setVisibleProducts] = useState([])
  const [allProducts, setAllProducts] = useState(null)

  const fetchProducts = async () => {
    try {
      const products = await getProductsPaginated(currentPage, pageSize)
      setAllProducts(products)
      setVisibleProducts((prevProducts) => [...prevProducts, ...products])
    } catch (error) {
      console.error("Error fetching products:", error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage])

  const handleScroll = () => {
    const scrollThreshold = 100
    if (
      window.innerHeight +
        document.documentElement.scrollTop +
        scrollThreshold >=
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  if (!visibleProducts) {
    return null // You may want to render a loading indicator here
  }

  return (
    <Box
      sx={{
        p: 2,
        m: 2,
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {visibleProducts.map((product: any) => (
        <Card key={product._id} product={product} />
      ))}
    </Box>
  )
}

export default ProductsList
