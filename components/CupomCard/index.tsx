"use client"
import { CopyAll, LocalOffer } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/joy"
import Image from "next/image"
import React, {useState} from "react"
interface Props {
  cupom: string
  conditionCupom: string
}

const CupomCard = ({ cupom, conditionCupom }: Props) => {
  const [copied, setCopied] = useState(false)

     const handleCopyToClipboard = (cupomCopy: string) => {
       setCopied(true)
       navigator.clipboard.writeText(cupomCopy).then(() => {
         alert("Cupom copiado: " + cupomCopy)
         setTimeout(() => {
           setCopied(false)
         }, 500)
       })
     }

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.level1",
        px: 3,
        py: 1,
        borderRadius: 6,
        width: "100%",
        border: "2px dashed #aaaaaa",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            position: "relative",
          }}
        >
          <LocalOffer />
          <Typography level="p">
            {conditionCupom ? <>{conditionCupom}</> : <>Use o cupom:</>}
          </Typography>
          {cupom && (
            <IconButton
              sx={{
                cursor: "pointer",
                position: "absolute",
                right: 1,
                top: "50%",
                fontSize: 5,
              }}
              onClick={() => handleCopyToClipboard(cupom)}
              disabled={copied}
            >
              <CopyAll />
            </IconButton>
          )}
        </Box>
        <Typography sx={{ fontWeight: "600" }} level="h4">
          {cupom}
        </Typography>
      </Box>
    </Box>
  )
}

export default CupomCard
