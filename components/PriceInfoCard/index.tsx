import { formatCurrency } from "@/lib/utils"
import { Box, Typography } from "@mui/joy"
import Image from "next/image"
import React from "react"
interface Props {
  title: string
  iconSrc: string
  value: string
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.level1",
        px: 3,
        py: 2,
        borderRadius: 6,
        width: "100%",
        borderLeft: "2px solid #aaaaaa",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Image src={iconSrc} alt={title} width={24} height={24} />
          <Typography level="p">{title}</Typography>
        </Box>

        <Typography sx={{ fontWeight: "700" }} level="h3">
          R$ {formatCurrency(value)}
        </Typography>
      </Box>
    </Box>
  )
}

export default PriceInfoCard
