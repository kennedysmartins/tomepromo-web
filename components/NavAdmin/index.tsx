"use client"
import * as React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import GlobalStyles from "@mui/joy/GlobalStyles"
import Avatar from "@mui/joy/Avatar"
import Box from "@mui/joy/Box"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import Chip from "@mui/joy/Chip"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Input from "@mui/joy/Input"
import LinearProgress from "@mui/joy/LinearProgress"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import Sheet from "@mui/joy/Sheet"
import Stack from "@mui/joy/Stack"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded"
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded"
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded"
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded"
import GroupRoundedIcon from "@mui/icons-material/GroupRounded"
import SupportRoundedIcon from "@mui/icons-material/SupportRounded"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded"
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

import ColorSchemeToggle from "@/components/ColorSchemeToggle"
import { closeSidebar } from "@/lib/utils"
import { LocalMall, LocalOffer } from "@mui/icons-material"

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean
  children: React.ReactNode
  renderToggle: (params: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  }) => React.ReactNode
}) {
  const [open, setOpen] = React.useState(defaultExpanded)
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "0.2s ease",
          "& > *": {
            overflow: "hidden",
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  )
}

export default function NavAdmin() {
  const { data: session } = useSession()
  const userProfileImg = session?.user?.image as string
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "250px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "260px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <LocalOffer />
        </IconButton>
        <Typography level="title-lg">Tome Promo</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Input
        size="sm"
        startDecorator={<SearchRoundedIcon />}
        placeholder="Pesquisar"
      />
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton role="menuitem" component="a" href="/dashboard">
              <HomeRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Home</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <AssignmentRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Relatórios</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                Em Breve
              </Chip>
            </ListItemButton>
          </ListItem>

          {/* <ListItem>
            <ListItemButton selected>
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Orders</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem> */}

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <LocalMall />
                  <ListItemContent>
                    <Typography level="title-sm">Promos</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/products"
                  >
                    Todas as promos
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/products/create"
                  >
                    Criar promo
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Configurações</ListItemButton>
                  <Chip size="sm" color="primary" variant="solid">
                    Em Breve
                  </Chip>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          {/* <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/joy-ui/getting-started/templates/messages/"
            >
              <QuestionAnswerRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Messages</Typography>
              </ListItemContent>
              <Chip size="sm" color="primary" variant="solid">
                4
              </Chip>
            </ListItemButton>
          </ListItem> */}

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Usuários</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={{ transform: open ? "rotate(180deg)" : "none" }}
                  />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton role="menuitem" component="a" href="/users/profile">
                    Perfil
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Criar novo usuário</ListItemButton>
                  <Chip size="sm" color="primary" variant="solid">
                    Em Breve
                  </Chip>
                </ListItem>
                <ListItem>
                  <ListItemButton>Cargos e permissões</ListItemButton>
                  <Chip size="sm" color="primary" variant="solid">
                    Em Breve
                  </Chip>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}
        >
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Ajuda
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Configurações
            </ListItemButton>
          </ListItem>
        </List>
        {/* <Card
          invertedColors
          variant="soft"
          color="warning"
          size="sm"
          sx={{ boxShadow: "none" }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="title-sm">Used space</Typography>
            <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Your team has used 80% of your available space. Need more?
          </Typography>
          <LinearProgress
            variant="outlined"
            value={80}
            determinate
            sx={{ my: 1 }}
          />
          <Button size="sm" variant="solid">
            Upgrade plan
          </Button>
        </Card> */}
      </Box>
      <Divider />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Avatar alt={session?.user?.name} size="sm" src={userProfileImg} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">
            {(session?.user?.name &&
              (session.user.name.split(" ").length > 1
                ? `${session.user.name.split(" ")[0]} ${session.user.name
                    .split(" ")
                    .pop()}`
                : session.user.name)) ||
              "Deslogado"}
          </Typography>
          {/* <Typography level="body-xs">{session?.user?.email}</Typography> */}
        </Box>
        <IconButton
          size="sm"
          variant="plain"
          color="neutral"
          onClick={() => {
            return session ? signOut() : signIn("google")
          }}
        >
          <LogoutRoundedIcon />
        </IconButton>
      </Box>
    </Sheet>
  )
}
