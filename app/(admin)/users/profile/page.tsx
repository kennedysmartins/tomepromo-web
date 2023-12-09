import * as React from "react"
import Box from "@mui/joy/Box"
import NavAdmin from "@/components/NavAdmin"
import HeaderAdmin from "@/components/HeaderAdmin"
import MyProfile from "./components/MyProfile"

export default function Profile() {
  return (
    <>
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <NavAdmin />
        <HeaderAdmin />
        <Box
          component="main"
          className="MainContent"
          sx={{
            pt: { xs: "calc(12px + var(--Header-height))", md: 3 },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
            overflow: "auto",
          }}
        >
          <MyProfile />
        </Box>
      </Box>
    </>
  )
}
