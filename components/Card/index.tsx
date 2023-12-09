import * as React from "react"
import { Product } from "@/types"
import AspectRatio from "@mui/joy/AspectRatio"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Chip from "@mui/joy/Chip"
import Link from "@mui/joy/Link"
import Typography from "@mui/joy/Typography"
import Image from "next/image"
import NextLink from "next/link"
import Skeleton from "@mui/joy/Skeleton"
import { formatDistanceToNow } from "date-fns"
import ptBR from "date-fns/locale/pt-BR"
import { formatCurrency } from "@/lib/utils"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  

  const maxTitleLength = 50
  const slicedTitle =
    product.title.length > maxTitleLength
      ? product.title.slice(0, maxTitleLength) + "..."
      : product.title

  // Formatando a data relativa usando date-fns
  const updatedAtRelative = formatDistanceToNow(new Date(product.updatedAt), {
    addSuffix: true,
    locale: ptBR,
  })

  return (
    <Card
      sx={{
        // backgroundColor: "#f7f7f7",
        width: "100%",
        maxWidth: 320,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardOverflow>
        <AspectRatio
          sx={{ 
            // backgroundColor: "#ffffff",
           p: 2 }}
          objectFit="contain"
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              height: "100%",
            }}
          >
            <Skeleton variant="overlay" loading={!product.imagePath}>
              <Image
                src={product.imagePath}
                alt={product.title}
                loading="lazy"
                width={150}
                height={125}
              />
            </Skeleton>
          </div>
        </AspectRatio>
      </CardOverflow>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {/* <Typography level="body-xs">{product.category}</Typography> */}
        <Link
          href={`/p/${product.id}`}
          className="product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
        >
          <Typography
            variant="body-md"
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height:60,
            }}
          >
            {slicedTitle}
          </Typography>
        </Link>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl",
        height:20 }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              {updatedAtRelative}
            </Chip>
          }
        >
          {product?.currentPrice > 0 && (
            <> R$ {formatCurrency(product?.currentPrice)} </>
          )}
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button
          className="bg-[#252525]"
          variant="solid"
          color="success"
          size="lg"
          sx={{
            backgroundColor: "#000",
            color: "#fff !important",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          <NextLink href={`/p/${product.id}`}>
            <Link
              href={`/p/${product.id}`}
              className="product-card"
              fontWeight="md"
              color="neutral"
              textColor="text.primary"
              overlay
              sx={{
                color: "#fff !important",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Pegar Promoção
            </Link>
          </NextLink>
        </Button>
      </CardOverflow>
    </Card>
  )
}
