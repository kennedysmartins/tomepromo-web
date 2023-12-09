import * as React from "react"
import { Product } from "@/types"
import AspectRatio from "@mui/joy/AspectRatio"
import Button from "@mui/joy/Button"
import Card from "@mui/joy/Card"
import CardContent from "@mui/joy/CardContent"
import CardOverflow from "@mui/joy/CardOverflow"
import Typography from "@mui/joy/Typography"
import Image from "next/image"
import Skeleton from "@mui/joy/Skeleton"


type MessageCardProps = {
  key: number
  product?: Partial<Product> // Ou outro tipo mais genérico conforme necessário
}

const MessageCard: React.FC<MessageCardProps> = ({ product }) => {
  function formatCurrency(amount: Number) {
    const options = { minimumFractionDigits: 2 }
    const formattedAmount = new Intl.NumberFormat("pt-BR", options).format(
      amount
    )

    return formattedAmount
  }
  return (
    <Card
      sx={{
        // backgroundColor: "#f7f7f7",
        width: 320,
        maxWidth: "100%",
        boxShadow: "lg",
      }}
    >
      <CardOverflow>
        <AspectRatio
          sx={{  p: 2 }}
          objectFit="contain"
        >
          <Skeleton variant="overlay" loading={!product.imagePath}>
            <div
              style={{
                backgroundColor: "#ffffff",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={product.imagePath}
                alt={product.title}
                loading="lazy"
                width={150}
                height={125}
              />
            </div>
          </Skeleton>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        {product.website && (
          <Typography sx={{ mb: 2 }} level="p">
            🔖 {product.website}
          </Typography>
        )}

        {product.catchyText && (
          <Typography level="p" sx={{ mb: 2 }}>
            <strong>{product.catchyText}</strong>
          </Typography>
        )}
        {product.catchyText ? (
          <Typography level="p" sx={{ mb: 2 }}>
            {product.title}
          </Typography>
        ) : (
          <Typography level="p" sx={{ mb: 2 }}>
            <b>{product.title}</b>
          </Typography>
        )}

        {product.currentPrice && (
          <Typography level="p">
            💵{" "}
            <strong>
              R${" "}
              {formatCurrency(
                product.cupomValue
                  ? parseFloat(product.currentPrice) -
                      parseFloat(product.cupomValue)
                  : parseFloat(product.currentPrice)
              )}
            </strong>
            <i>{" " + product.conditionPayment}</i>
          </Typography>
        )}

        {product.recurrencePrice && (
          <Typography level="p">
            🔄 <strong>R$ {formatCurrency(product?.recurrencePrice)}</strong>
            <i>{" com recorrência"}</i>
          </Typography>
        )}

        {product.conditionCupom && product.cupom && (
          <>
            <Typography level="p" sx={{ my: 2 }}>
              <strong>
                🏷️ {product.conditionCupom} {product.cupom}
              </strong>
            </Typography>
          </>
        )}

        {product.buyLink && (
          <>
            <Typography level="p" sx={{ my: 2 }}>
              🛒 <strong>Compre Aqui:</strong> https://tomepromo.com.br/p/
              {product._id}
            </Typography>
          </>
        )}

        {product.announcement1 && product.buyLink && (
          <>
            <Typography level="p" sx={{ mb: 2 }}>
              <i>{product.announcement1}</i>
            </Typography>
          </>
        )}
      </CardContent>
      <CardOverflow>
        <Button
          className="bg-[#252525]"
          variant="solid"
          color="success"
          size="lg"
          disabled={!product.buyLink}
          onClick={() => {
            alert("Olá")
          }}
        >
          Pegar Promoção
        </Button>
      </CardOverflow>
    </Card>
  )
}

export default MessageCard;
