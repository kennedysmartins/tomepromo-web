import PriceInfoCard from "@/components/PriceInfoCard"
import Card from "@/components/Card"
import { addClick, getProductById, getSimilarProducts } from "@/lib/actions"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Box, Button, Container, IconButton, Typography } from "@mui/joy"
import { AddBox, Bookmark, FavoriteBorder, Share } from "@mui/icons-material"
import { Metadata } from "next"
import * as S from "./styles"
import CupomCard from "@/components/CupomCard"
import ButtonBuyLink from "@/app/p/[id]/ButtonBuyLink"
import Navbar from "@/components/Navbar"
type Params = {
  params: { id: Number }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const product: Product = await getProductById(id)

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    openGraph: {
      title: product.title,
      description: "As melhores promoções e ofertas - Tome Promo",
      url: `https://tomepromo.com.br/p/${id}`,
      siteName: "Tome Promo",
      images: [{ url: product.imagePath }],
      locale: "pt_BR",
      type: "website",
    },
  }
}

const ProductPage = async ({ params: { id } }: Params) => {
  const product: Product = await getProductById(id)
  if (!product) {
    return
  }

  const similarProducts = await getSimilarProducts(id)
  const codeCupom = product.cupom.replace("🏷️ Use o cupom:", "").trim()



  return (
    <>
        <Navbar />
      <Container>
        <Box
          component="section"
          sx={{
            alignItems: "center",
            display: "flex",
            mt: 15,
            mb: 15,
            gap: 3,
            flexDirection: {
              xs: "column", // Mobile
              sm: "row", // Desktop e tamanhos maiores
            },
            "@media screen and (max-width: 600px)": {
              mt: 0,
            },
          }}
        >
          <Box
            component="section"
            sx={{
              display: "flex",
              gap: 5,
              width: "100%",
              backgroundColor: "white",
              borderRadius: 8, // Adiciona a borda redonda
              border: "2px solid #f7f7f7",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              objectFit: "contain",
              "@media screen and (max-width: 600px)": {
                mt: 0,
                border: "none",
                borderRadius: 0,
              },
            }}
          >
            <img
              src={product.imagePath}
              alt={product.title}
              style={{ width: "95%" }}
            />
          </Box>
          <Box
            component="section"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
            }}
          >
            <Typography level="h3">{product.title}</Typography>

            <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
              <PriceInfoCard
                title="Preço Atual"
                iconSrc="/assets/icons/price-tag.svg"
                value={product.currentPrice}
              />
              {/* <PriceInfoCard
              title="Maior Preço"
              iconSrc="/assets/icons/arrow-up.svg"
              value={product.originalPrice}
            /> */}
            </Box>

            {(product.conditionCupom != "Use o cupom:" || codeCupom) && (
              <CupomCard
                cupom={codeCupom}
                conditionCupom={product.conditionCupom}
              />
            )}

            <S.GradientBackground />

            <ButtonBuyLink
              title={"Pegar Promoção"}
              buyLink={product.buyLink}
              id={product.id}
            />

            <Box
              component="section"
              sx={{
                display: "flex",
                gap: 2,
                mb: 2,
              }}
            >
              <Button
                startDecorator={<FavoriteBorder />}
                size={"sm"}
                color="danger"
              >
                {product.reviewsCount}
              </Button>

              <IconButton color="primary" size={"sm"} variant="solid">
                <Share />
              </IconButton>

              <IconButton color="success" size={"sm"} variant="solid">
                <Bookmark />
              </IconButton>

              {product.website === "Amazon" && (
                <Link href={`https://amzn.to/46PLQHd`}>
                  <Button
                    startDecorator={<AddBox />}
                    size={"sm"}
                    color="neutral"
                  >
                    Seja Amazon Prime
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Box>

        {similarProducts && similarProducts?.length > 0 && (
          <Box
            component="section"
            sx={{
              p: 2,
              m: 2,
              mb: 15,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Últimas Ofertas</h2>
            <Box
              sx={{
                p: 2,
                m: 2,
                // alignItems: "center",
                justifyContent: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
              }}
            >
              {similarProducts?.map((product: any) => (
                <Card key={product.id} product={product} />
              ))}
            </Box>
            <Link href={`/`}>
              <Button size={"lg"} color="primary">
                Ver mais ofertas
              </Button>
            </Link>
          </Box>
        )}
      </Container>
    </>
  )
}

export default ProductPage
