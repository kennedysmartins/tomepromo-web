"use client"
import { addClick } from "@/lib/actions"
import { Box, Typography, Button } from "@mui/joy"
import Link from "next/link"
import React from "react"
interface Props {
  title: string
  buyLink: string
  id: any
}

const ButtonBuyLink = ({ buyLink, title, id }: Props) => {
  const click = (id) => {
    addClick({ id: Number(id), isProduct: true })
  }
  return (
    <>
      <Link
        href={buyLink}
        target="_blank"
        onClick={() => {
          click(id)
        }}
      >
        <Button
          size="lg"
          sx={{
            display: "flex",
            width: "100%",
            marginTop: 3,
            textDecoration: "none",
            backgroundColor: "#0e0d0d",
            borderRadius: 8,
            ":hover": {
              backgroundColor: "#2c2c2c",
            },
            position: "relative", // Default position
            bottom: 0,
            left: 0,
            zIndex: 1, // Default z-index
            "@media screen and (max-width: 600px)": {
              width: "80%",
              position: "fixed",
              bottom: 16,
              py: 2, // Adjust the distance from the bottom as needed
              left: "50%", // Center horizontally
              transform: "translateX(-50%)", // Center horizontally
              zIndex: 999,
            },
          }}
        >
          {title}
        </Button>
      </Link>
    </>
  )
}

export default ButtonBuyLink
