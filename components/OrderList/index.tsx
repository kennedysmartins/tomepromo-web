/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react"
import { ColorPaletteProp } from "@mui/joy/styles"
import Box from "@mui/joy/Box"
import Avatar from "@mui/joy/Avatar"
import Chip from "@mui/joy/Chip"
import Link from "@mui/joy/Link"
import Divider from "@mui/joy/Divider"
import IconButton from "@mui/joy/IconButton"
import Typography from "@mui/joy/Typography"
import List from "@mui/joy/List"
import ListItem from "@mui/joy/ListItem"
import ListItemContent from "@mui/joy/ListItemContent"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListDivider from "@mui/joy/ListDivider"
import Menu from "@mui/joy/Menu"
import MenuButton from "@mui/joy/MenuButton"
import MenuItem from "@mui/joy/MenuItem"
import Dropdown from "@mui/joy/Dropdown"

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import BlockIcon from "@mui/icons-material/Block"
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft"
import { formatarData } from "@/lib/utils"
import { getProductsPaginated } from "@/lib/actions"

const listItems = [
  {
    id: "INV-1234",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "O",
      name: "Olivia Ryhe",
      email: "olivia@email.com",
    },
  },
  {
    id: "INV-1233",
    date: "Feb 3, 2023",
    status: "Paid",
    customer: {
      initial: "S",
      name: "Steve Hampton",
      email: "steve.hamp@email.com",
    },
  },
  {
    id: "INV-1232",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "C",
      name: "Ciaran Murray",
      email: "ciaran.murray@email.com",
    },
  },
  {
    id: "INV-1231",
    date: "Feb 3, 2023",
    status: "Refunded",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      email: "maria.mc@email.com",
    },
  },
  {
    id: "INV-1230",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      email: "fulton@email.com",
    },
  },
  {
    id: "INV-1229",
    date: "Feb 3, 2023",
    status: "Cancelled",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      email: "hooper@email.com",
    },
  },
]

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Repostar</MenuItem>
        {/* <MenuItem>Rename</MenuItem> */}
        {/* <MenuItem>Move</MenuItem> */}
        <Divider />
        <MenuItem color="danger">Deletar</MenuItem>
      </Menu>
    </Dropdown>
  )
}

export default function OrderList() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [pageSize] = React.useState(20) // Ajuste o tamanho da página conforme necessário
  const [totalPages, setTotalPages] = React.useState(null)
  const [products, setProducts] = React.useState(null)

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsPaginated()
        setProducts(data)
        setTotalPages(Math.ceil(count / pageSize))
      } catch (error) {
        console.error("Error fetching products:", error.message)
      }
    }

    fetchProducts()
  }, [currentPage, pageSize])

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  if (!products) {
    return null
  }

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {products.map((product) => (
        <List
          key={product.id}
          size="sm"
          sx={{
            "--ListItem-paddingX": 0,
          }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Avatar src={product.imagePath} size="sm" />
              </ListItemDecorator>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {product.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">
                    {formatarData(product.createdAt)}
                  </Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{product.id}</Typography>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}
                >
                  <Link level="body-sm" component="button">
                    Editar
                  </Link>
                  <RowMenu />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  true: <CheckRoundedIcon />, // Se verdadeiro (publicado)
                  false: <BlockIcon />, // Se falso (não publicado)
                }[product.published]
              }
              color={
                {
                  true: "success", // Se verdadeiro (publicado)
                  false: "danger", // Se falso (não publicado)
                }[product.published] as ColorPaletteProp
              }
            >
              {product.published ? "Publicado" : "Não Publicado"}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" mx="auto">
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
