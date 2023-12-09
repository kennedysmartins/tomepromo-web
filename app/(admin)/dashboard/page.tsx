import HeaderAdmin from "@/components/HeaderAdmin"
import NavAdmin from "@/components/NavAdmin"
import { Box, Container, Typography } from "@mui/joy"
import Breadcrumbs from "@mui/joy/Breadcrumbs"
import Link from "@mui/joy/Link"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"

import React from "react"

const Dashboard = () => {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <HeaderAdmin />
        <NavAdmin />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            // height: "100dvh",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 6,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Bem vindo ao TomePromo
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Dashboard
