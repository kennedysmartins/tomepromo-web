"use client"
const apiUrl = process.env.NEXT_PUBLIC_API_URL
import HeaderAdmin from "@/components/HeaderAdmin"
import NavAdmin from "@/components/NavAdmin"
import * as React from "react"
import Snackbar from "@mui/joy/Snackbar"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded"
import Link from "@mui/joy/Link"
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa"
import {
  Search,
  Add,
  AutoAwesomeMosaicOutlined,
  AutoAwesome,
  LinkRounded,
  Delete,
  CopyAll,
  Collections,
} from "@mui/icons-material"
import MessageCard from "@/components/MessageCard"
import axios from "axios"
import {
  FormLabel,
  IconButton,
  Input,
  Stack,
  Box,
  Button,
  Typography,
  Container,
  FormControl,
  Textarea,
  Divider,
  Breadcrumbs,
  Chip,
} from "@mui/joy"
import { formatCurrency, getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils"
import { storeProduct } from "@/lib/actions"
import { setTimeout } from "timers"

const catchyTextOptions = [
  "#BlackFridayAmazon",
  "Acaba rápido ⚡⚡",
  "Menor preço nos últimos 30 dias 🔥",
  "Menor preço já visto 😱🚨",
  "OFERTA RELÂMPAGO ⚡",
  "MUITO BARATO 🔥",
  "PRECINHO TOP 💋",
  "CORREEE 🏃‍♂️🏃‍♂️",
  "VAI ACABAR 🏃‍♂️🏃‍♂️🚨",
]

const CreateProduct = () => {
  const [open, setOpen] = React.useState(false)
  const [isAnalyzing, setIsAnalyzing] = React.useState(false)
  const [isCopying, setIsCopying] = React.useState(false)
  const [isSharing, setIsSharing] = React.useState(false)
  const [isSharingText, setIsSharingText] = React.useState(false)
  const [isCreating, setIsCreating] = React.useState(false)
  const [isCanvas, setIsCanvas] = React.useState(false)

  const [product, setProduct] = React.useState({
    id: "",
    url: "",
    linkPesquisa: "",
    title: "",
    catchyText: "",
    category: "",
    cupom: "",
    cupomValue: "",
    conditionCupom: "Use o cupom: ",
    productCode: "",
    buyLink: "",
    website: "",
    conditionPayment: "",
    currentPrice: "",
    originalPrice: "",
    recurrencePrice: "",
    imagePath: "",
    announcement1: `📲 Faça parte do nosso grupo: https://linktr.ee/tomepromo`,
  })

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setProduct((prevProduct) => ({
        ...prevProduct,
        url: text,
        linkPesquisa: text,
        buyLink: text,
      }))
      if (text) {
        handleExtractProduct(text)
      }
    } catch (error) {
      console.error("Erro ao colar da área de transferência:", error)
    }
  }

  const handleExtractProduct = async (url: string) => {
    setIsAnalyzing(true)
    resetFormFieldsSearch(url)
    try {
      const amazonData = "tomepromo06-20"
      const magazineData = "magazinetomepromo"
      const response = await axios.post(
        `${apiUrl}/products/extractor2`,
        {
          url,
          amazon: amazonData,
          magazine: magazineData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data.metadata)
      const { metadata } = response.data

      const {
        title,
        currentPrice,
        originalPrice,
        recurrencePrice,
        category,
        imagePath,
        buyLink,
        productCode,
        cupom,
        cupomValue,
        conditionCupom,
        catchyText,
        productName,
        conditionPayment,
        website,
        ...rest
      } = metadata

      setProduct((prevProduct) => ({
        ...prevProduct,
        title: title ?? prevProduct.title,
        currentPrice: currentPrice ?? prevProduct.currentPrice,
        originalPrice: originalPrice ?? prevProduct.originalPrice,
        recurrencePrice: recurrencePrice ?? prevProduct.recurrencePrice,
        category: category ?? prevProduct.category,
        imagePath: imagePath ?? prevProduct.imagePath,
        buyLink: buyLink ?? url,
        productCode: productCode ?? prevProduct.productCode,
        linkPesquisa: url,
        cupom: cupom ?? prevProduct.cupom,
        cupomValue: cupomValue ?? prevProduct.cupomValue,
        catchyText: catchyText ?? prevProduct.catchyText,
        productName: title ?? prevProduct.title,
        conditionPayment:
          conditionPayment.charAt(0).toLowerCase() +
            conditionPayment.slice(1) ?? prevProduct.conditionPayment,
        website: website ?? prevProduct.website,
      }))
    } catch (error) {
      console.error("Erro ao extrair dados da url: ", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsCreating(true)
      const data = { ...product }
      console.log(data)

      let modifiedCurrentPrice = Number(data.currentPrice.trim()) || 0
      // Subtract cupomValue if it exists
      if (data.cupomValue) {
        modifiedCurrentPrice -= parseFloat(data.cupomValue)
      }

      let newData = {
        title: data.title.trim(),
        catchyText: data.catchyText.trim(),
        currentPrice: modifiedCurrentPrice,
        originalPrice: Number(data.originalPrice.trim()) || 0,
        recurrencePrice: Number(data.recurrencePrice.trim()) || 0,
        imagePath: data.imagePath.trim(),
        conditionPayment:
          data.conditionPayment.trim().charAt(0).toLowerCase() +
          data.conditionPayment.slice(1),
        category: data.category.trim(),
        announcement1: data.announcement1.trim(),
        buyLink: data.buyLink.trim(),
        website: data.website.trim(),
        lowestPrice: Number(data.currentPrice),
        highestPrice: Number(data.originalPrice),
        averagePrice: Number(data.currentPrice),
        cupom: data.cupom.trim(),
        conditionCupom: data.conditionCupom.trim(),
        cupomValue: data.cupomValue.trim(),
        productCode: data.productCode?.trim(),
      }

      console.log("newData", newData)

      const success = await storeProduct(newData)

      if (success) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          id: String(success.id), // Convertendo para string
        }))
        setOpen(true)
      }
    } catch (error) {
      console.error(`Failed to submit data`)
    } finally {
      setIsCreating(false)
    }
  }

  const messageTemplate = (id: number) => {
    const productId = product.id !== undefined ? product.id : id
    // Inicialize uma variável para armazenar o conteúdo da mensagem
    let messageContent = ""

let modifiedCurrentPrice = Number(product?.currentPrice.trim()) || 0
// Subtract cupomValue if it exists
if (product.cupomValue) {
  modifiedCurrentPrice -= parseFloat(product.cupomValue)
}

    if (product.website) {
      messageContent += `🔖 ${product.website}\n\n`
    }

    // Condições para adicionar mensagens
    if (product.catchyText) {
      messageContent += `*${product.catchyText.trim()}*\n\n`
    }

    if (product.catchyText) {
      messageContent += `${product.title}\n\n`
    } else {
      messageContent += `*${product.title.trim()}*\n\n`
    }

    if (product.originalPrice) {
      messageContent += `De ~R$ ${formatCurrency(product?.originalPrice)}~\n`
    }

    if (product.currentPrice) {
      messageContent += `💵 *R$ ${formatCurrency(modifiedCurrentPrice)}*`
    }

    if (product.conditionPayment) {
      messageContent += ` _${product?.conditionPayment}_`
    }

    // if (product.cupomValue) {
    //   messageContent += ` - _Desconto aplicado: *R$ ${formatCurrency(
    //     product.cupomValue
    //   )}*_`
    // }

    if (product.recurrencePrice) {
      messageContent += `\n🔄 *R$ ${formatCurrency(
        product?.recurrencePrice
      )}* _com recorrência_\n`
    }

    if (
      product.conditionCupom.trim() != "Use o cupom:" ||
      product.cupom.trim()
    ) {
      messageContent += `\n*🏷️ ${product.conditionCupom.trim()}*`
    }

    if (product.cupom.trim()) {
      messageContent += ` *${product.cupom.trim()}*\n`
    } else {
      messageContent += `\n`
    }

    if (product.buyLink) {
      messageContent += `\n🛒 *Compre Aqui:* https://tomepromo.com.br/p/${productId}\n\n`
    }

    if (product.announcement1) {
      messageContent += `_${product.announcement1.trim()}_\n\n`
    }

    return messageContent
  }

  const handleCopyToClipboard = (id: string) => {
    setIsCopying(true)
    setTimeout(() => {
      const messageContent = messageTemplate(id)
      navigator.clipboard.writeText(messageContent)
      setIsCopying(false)
    }, 500)
  }

 

  
  const handleSharingText = async (id) => {
    setIsSharingText(true)

    try {
      const messageContent = messageTemplate(id)
      navigator.clipboard.writeText(messageContent)
      
      // Compartilha texto e arquivos usando a API navigator.share
      const shareData = {
        title: messageContent,
        text: messageContent,
      }

      if (navigator.canShare(shareData)) {
        await navigator.share(shareData)
      } else {
        alert("A função de compartilhamento não é suportada neste navegador.")
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error)
    } finally {
      setIsSharingText(false)
    }
  }

  const handleSharing = async (id) => {
   setIsSharing(true)
   
   try {
     const messageContent = messageTemplate(id)
     navigator.clipboard.writeText(messageContent)
     const imageUrl = product.imagePath

     // Requisição da imagem com permissões CORS
     const response = await fetch(imageUrl, { mode: "cors" })
     const blob = await response.blob()

     // Cria um objeto File a partir do Blob
     const file = new File([blob], "image.png", {
       type: blob.type,
     })

     // Cria um objeto DataTransfer para os arquivos
     const dataTransfer = new DataTransfer()
     dataTransfer.items.add(file)

     // Compartilha texto e arquivos usando a API navigator.share
     const shareData = {
       files: dataTransfer.files,
     }

     if (navigator.canShare(shareData)) {
       await navigator.share(shareData)
     } else {
       alert("A função de compartilhamento não é suportada neste navegador.")
     }
   } catch (error) {
     console.error("Erro ao compartilhar:", error)
   } finally {
     setIsSharing(false)
   }
 }

  const handleCanvas = async (id, customConfigs = {}) => {
    setIsCanvas(true)
    navigator.clipboard.writeText(`https://tomepromo.com.br/p/${product.id}`)

    try {
      // Cria um canvas
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      let modifiedCurrentPrice = Number(product?.currentPrice.trim()) || 0
      // Subtract cupomValue if it exists
      if (product.cupomValue) {
        modifiedCurrentPrice -= parseFloat(product.cupomValue)
      }

      // Define o tamanho do canvas como o tamanho padrão de um story no Instagram (1080x1920)
      canvas.width = 1080
      canvas.height = 1920

      const defaultImageConfig = {
        x: 30,
        y: 420,
        width: 1020,
        height: 650,
      }
      const defaultTitleConfig = {
        x: canvas.width / 2,
        y: 1150,
        size: 44,
        margin: 40,
      }
      const defaultCurrencyConfig = {
        size: 38,
        weight: 700,
        margin: 42,
      }

      const defaultOldCurrencyConfig = {
        size: 34,
        weight: 700,
        margin: 22,
      }

      const defaultPriceConfig = {
        x: 300,
        size: 58,
        y: 1420,
        weight: 800,
      }

      const defaultOldPriceConfig = {
        x: 280,
        size: 48,
        y: 1350,
        weight: 800,
      }

      const imageConfig = {
        ...defaultImageConfig,
        ...customConfigs.imageConfig,
      }
      const titleConfig = {
        ...defaultTitleConfig,
        ...customConfigs.titleConfig,
      }
      const priceConfig = {
        ...defaultPriceConfig,
        ...customConfigs.priceConfig,
      }
      const priceOldConfig = {
        ...defaultOldPriceConfig,
        ...customConfigs.priceOldConfig,
      }
      const priceCurrencyConfig = {
        ...defaultCurrencyConfig,
        ...customConfigs.priceCurrencyConfig,
      }

      const priceOldCurrencyConfig = {
        ...defaultOldCurrencyConfig,
        ...customConfigs.priceOldCurrencyConfig,
      }

      const messageContent = messageTemplate(id)
      navigator.clipboard.writeText(messageContent)
      const imageUrl = product.imagePath

      // Baixa a imagem da URL
      const response = await fetch(imageUrl, { mode: "cors" })
      const imageBlob = await response.blob()

      // Converte o texto (URL) em Blob
      const textBlob = new Blob([messageContent], { type: "text/plain" })

      // Desenha a imagem de fundo
      const backgroundImage = new Image()
      backgroundImage.src = "/template-tomepromo.png" // Substitua pelo caminho da sua imagem de fundo
      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

        // Desenha a imagem do produto no meio
    const productImage = new Image();
    productImage.src = URL.createObjectURL(imageBlob);
    productImage.onload = () => {
      const imageX = imageConfig.x
      const imageY = imageConfig.y

      // Calculate the dimensions for objectFit contain
      const { width, height, x, y } = getObjectFitContainDimensions(
        imageX,
        imageY,
        imageConfig.width,
        imageConfig.height,
        productImage.width,
        productImage.height
      )

      ctx.drawImage(productImage, x, y, width, height)

      // Adiciona o título abaixo da imagem
      ctx.font = `${titleConfig.size}px Arial`
      ctx.fillStyle = "black"
      ctx.textAlign = "center"

      const maxWords = 5

      // Divide o título em palavras
      const words = product.title.split(/\s+/)

      // Pega as primeiras maxWords palavras
      const titleLine1 = words.slice(0, maxWords).join(" ")

      // Pega as palavras entre maxWords e 2 * maxWords
      let titleLine2 = words.slice(maxWords, maxWords * 2).join(" ")

      // Adiciona "..." no final da segunda linha se ultrapassar
      if (words.length > maxWords * 2) {
        titleLine2 += "..."
      }

      ctx.fillText(titleLine1, titleConfig.x, titleConfig.y)
      ctx.fillText(titleLine2, titleConfig.x, titleConfig.y + 50) // Ajuste a posição conforme necessário

      // Verifica se product.originalPrice existe
if (Number(product.originalPrice) > 0) {
  // Adiciona o preço antigo abaixo do título
  ctx.fillStyle = "#3f3f3f"
  ctx.font = `${priceOldConfig.weight} ${priceOldConfig.size}px Arial`
  const priceOldText = `${formatCurrency(Number(product.originalPrice))}`
  ctx.fillText(priceOldText, priceOldConfig.x, priceOldConfig.y)

  // Adiciona o "R$" ao lado do preço com uma fonte diferente
  ctx.fillStyle = "#3f3f3f"
  ctx.font = `${priceOldCurrencyConfig.weight} ${priceOldCurrencyConfig.size}px Arial`
  const currencyOldText = "DE"
  const currencyOldWidth = ctx.measureText(priceOldText).width
  ctx.fillText(
    currencyOldText,
    priceOldConfig.x - currencyOldWidth - priceOldCurrencyConfig.margin,
    priceOldConfig.y
  )
}


      // Adiciona o preço abaixo do título
      ctx.fillStyle = "white"
      ctx.font = `${priceConfig.weight} ${priceConfig.size}px Arial`
      const priceText = `${formatCurrency(modifiedCurrentPrice)}`
      ctx.fillText(priceText, priceConfig.x, priceConfig.y)

      // Adiciona o "R$" ao lado do preço com uma fonte diferente
      ctx.fillStyle = "white"
      ctx.font = `${priceCurrencyConfig.weight} ${priceCurrencyConfig.size}px Arial`
      const currencyText = "POR"
      const currencyWidth = ctx.measureText(priceText).width
      ctx.fillText(
        currencyText,
        priceConfig.x - currencyWidth - priceCurrencyConfig.margin,
        priceConfig.y
      )

      // Converte o canvas para um Blob
      canvas.toBlob(async (canvasBlob) => {
        // Cria um objeto File a partir do Blob do canvas
        const canvasFile = new File([canvasBlob], "canvas_image.png", {
          type: canvasBlob.type,
        })

        // Cria um objeto DataTransfer para os arquivos
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(canvasFile)

        // Compartilha texto e arquivos usando a API navigator.share
        const shareData = {
          files: dataTransfer.files,
        }

        if (navigator.canShare(shareData)) {
          await navigator.share(shareData)
        } else {
          alert("A função de compartilhamento não é suportada neste navegador.")
        }

        setIsCanvas(false)
      }, "image/png")
    }
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error)
      setIsCanvas(false)
    }
  }

  // Helper function to calculate objectFit contain dimensions
  const getObjectFitContainDimensions = (
    containerX: number,
    containerY: number,
    containerWidth: number,
    containerHeight: number,
    contentWidth: number,
    contentHeight: number
  ) => {
    const containerAspectRatio = containerWidth / containerHeight
    const contentAspectRatio = contentWidth / contentHeight

    let width, height, x, y

    if (containerAspectRatio > contentAspectRatio) {
      // Container is wider, scale based on height
      height = containerHeight
      width = (containerHeight * contentAspectRatio) | 0 // Truncate to an integer
      x = containerX + (containerWidth - width) / 2
      y = containerY
    } else {
      // Container is taller, scale based on width
      width = containerWidth
      height = (containerWidth / contentAspectRatio) | 0 // Truncate to an integer
      x = containerX
      y = containerY + (containerHeight - height) / 2
    }

    return { width, height, x, y }
  }

  const addEmojiToCatchyText = (emoji: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      catchyText: prevProduct.catchyText + emoji,
    }))
  }

  const handleAutoAwesomeClick = () => {
    const currentIndex = catchyTextOptions.indexOf(product.catchyText)
    const nextIndex = (currentIndex + 1) % catchyTextOptions.length
    const nextCatchyText = catchyTextOptions[nextIndex]

    setProduct({
      ...product,
      catchyText: nextCatchyText,
    })
  }

  const resetFormFields = (type: string, link: string) => {
    setIsCopying(false)
    setIsCreating(false)
    setProduct({
      id: "",
      title: "",
      currentPrice: "",
      originalPrice: "",
      recurrencePrice: "",
      category: "",
      image: "",
      website: "",
      cupom: "",
      cupomValue: "",
      conditionCupom: "Use o cupom: ",
      productCode: "",
      buyLink: "",
      linkPesquisa: "",
      url: "",
      catchyText: "",
      conditionPayment: "",
      announcement1: `📲 Faça parte do nosso grupo: https://linktr.ee/tomepromo`,
    })
  }

  const resetFormFieldsSearch = (link: string) => {
    setProduct({
      id: "",
      title: "",
      currentPrice: "",
      originalPrice: "",
      recurrencePrice: "",
      category: "",
      linkPesquisa: link,
      url: link,
      buyLink: "",
      cupom: "",
      cupomValue: "",
      conditionCupom: "Use o cupom: ",
      productCode: "",
      image: "",
      website: "",
      catchyText: product.catchyText,
      conditionPayment: "",
      announcement1: `📲 Faça parte do nosso grupo: https://linktr.ee/tomepromo`,
    })
  }

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
          <Box sx={{ display: "flex", alignItems: "center"}}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="/dashboard"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="/products"
                fontSize={12}
                fontWeight={500}
              >
                Promos
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Criar
              </Typography>
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
              Crie uma promo
            </Typography>
          </Box>
          <Box>
            <Box sx={{ mb: 6 }}>
              <FormLabel>URL</FormLabel>
              <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                <Input
                  color="primary"
                  fullWidth
                  size="lg"
                  value={product.url}
                  onChange={(e) =>
                    setProduct({ ...product, url: e.target.value })
                  }
                  variant="outlined"
                />
                {product.url ? (
                  <Button
                    loading={isAnalyzing}
                    onClick={() => {
                      handleExtractProduct(product.url)
                    }}
                    disabled={isAnalyzing}
                    size="lg"
                    variant="outlined"
                  >
                    <LinkRounded />
                  </Button>
                ) : (
                  <Button
                    loading={isAnalyzing}
                    onClick={handlePasteFromClipboard}
                    disabled={isAnalyzing}
                    size="lg"
                    variant="outlined"
                  >
                    <LinkRounded />
                  </Button>
                )}
                {product.url && (
                  <Button
                    variant="outlined"
                    size="lg"
                    onClick={() => resetFormFields("Search", product.url)}
                    disabled={isAnalyzing}
                    color="danger"
                  >
                    <Delete />
                  </Button>
                )}
              </Box>
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                width: "100%",
                my: 6,
                flexDirection: {
                  xs: "column", // Mobile
                  sm: "row", // Desktop e tamanhos maiores
                },
                gap: 4,
              }}
            >
              <Box sx={{ width: "100%" }}>
                <Stack spacing={1} sx={{ width: "100%" }}>
                  <div>
                    <FormLabel>Texto Chamativo</FormLabel>
                    <Box sx={{ display: "flex", position: "relative" }}>
                      <Input
                        color="primary"
                        size="lg"
                        fullWidth
                        variant="outlined"
                        value={product.catchyText}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            catchyText: e.target.value,
                          })
                        }
                      />
                      <IconButton
                        aria-label="Automatic"
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                        onClick={handleAutoAwesomeClick}
                      >
                        <AutoAwesome />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.8, my: 2 }}>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 🚨")}
                      >
                        🚨
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 🔥")}
                      >
                        🔥
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 😱")}
                      >
                        😱
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 💪")}
                      >
                        💪
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 🏃‍♂️")}
                      >
                        🏃‍♂️
                      </Chip>

                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 🔝")}
                      >
                        🔝
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" ⚡")}
                      >
                        ⚡
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" ⏳")}
                      >
                        ⏳
                      </Chip>
                      <Chip
                        size="sm"
                        onClick={() => addEmojiToCatchyText(" 💋")}
                      >
                        💋
                      </Chip>
                    </Box>
                  </div>

                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      flexDirection: {
                        xs: "column", // Mobile
                        sm: "row", // Desktop e tamanhos maiores
                      },
                    }}
                  >
                    <Box sx={{ width: "100%" }}>
                      <FormLabel>Preço Original</FormLabel>
                      <Input
                        color="primary"
                        size="lg"
                        variant="outlined"
                        fullWidth
                        value={product.originalPrice}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            originalPrice: e.target.value,
                          })
                        }
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormLabel>Preço Atual</FormLabel>
                      <Input
                        color="primary"
                        size="lg"
                        variant="outlined"
                        fullWidth
                        value={
                          product.cupomValue
                            ? (
                                parseFloat(product.currentPrice) -
                                parseFloat(product.cupomValue)
                              ).toString()
                            : product.currentPrice
                        }
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            currentPrice: e.target.value,
                          })
                        }
                      />
                    </Box>
                    <Box sx={{ width: "100%" }}>
                      <FormLabel>Preço Recorrente</FormLabel>
                      <Input
                        color="primary"
                        fullWidth
                        size="lg"
                        variant="outlined"
                        value={product.recurrencePrice}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            recurrencePrice: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Box>

                  <FormLabel>Código do cupom</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    variant="outlined"
                    value={product.cupom}
                    onChange={(e) =>
                      setProduct({ ...product, cupom: e.target.value })
                    }
                  />

                  {product.cupom && (
                    <>
                      <FormLabel>Valor Cupom</FormLabel>
                      <Input
                        color="primary"
                        size="lg"
                        color="success"
                        fullWidth
                        variant="outlined"
                        value={product.cupomValue}
                        onChange={(e) =>
                          setProduct({ ...product, cupomValue: e.target.value })
                        }
                      />
                    </>
                  )}

                  {product.cupom && (
                    <>
                      <FormLabel>Condição Cupom</FormLabel>
                      <Input
                        color="primary"
                        size="lg"
                        color="success"
                        fullWidth
                        variant="outlined"
                        value={product.conditionCupom}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            conditionCupom: e.target.value,
                          })
                        }
                      />
                    </>
                  )}

                  <FormLabel>Nome do produto</FormLabel>
                  <Textarea
                    color="primary"
                    minRows={2}
                    value={product.title}
                    size="lg"
                    onChange={(e) =>
                      setProduct({ ...product, title: e.target.value })
                    }
                  />

                  <FormLabel>Condições</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    variant="outlined"
                    value={product.conditionPayment}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        conditionPayment: e.target.value,
                      })
                    }
                  />

                  <FormLabel>Link Compra</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    required
                    variant="outlined"
                    value={product.buyLink}
                    onChange={(e) =>
                      setProduct({ ...product, buyLink: e.target.value })
                    }
                  />

                  <FormLabel>Anúncio</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    variant="outlined"
                    value={product.announcement1}
                    onChange={(e) =>
                      setProduct({ ...product, announcement1: e.target.value })
                    }
                  />

                  <FormLabel>URL Image</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    required
                    variant="outlined"
                    value={product.imagePath}
                    onChange={(e) =>
                      setProduct({ ...product, image: e.target.value })
                    }
                  />

                  <FormLabel>Site</FormLabel>
                  <Input
                    color="primary"
                    size="lg"
                    fullWidth
                    variant="outlined"
                    value={product.website}
                    onChange={(e) =>
                      setProduct({ ...product, website: e.target.value })
                    }
                  />
                </Stack>
              </Box>

              <Box
                sx={{
                  mt: 3,
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  loading={isCreating}
                  disabled={!product.imagePath || !product.buyLink}
                  fullWidth
                >
                  Adicionar produto
                </Button>
                {product.id && (
                  <Box sx={{ display: "flex", gap: 2, width: "100%", mt: 2 }}>
                    <Button
                      type="button"
                      color="primary"
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      fullWidth
                      loading={isCopying}
                      onClick={() => handleCopyToClipboard(product.id)}
                    >
                      <CopyAll /> Copiar
                    </Button>
                    <Button
                      type="button"
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      color="primary"
                      fullWidth
                      onClick={() => handleSharing(product.id)}
                    >
                      <Collections /> Imagem
                    </Button>
                  </Box>
                )}
                {product.id && (
                  <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 4 }}>
                    <Button
                      type="button"
                      color="success"
                      fullWidth
                      loading={isSharingText}
                      onClick={() => handleSharingText(product.id)}
                    >
                      <FaWhatsapp style={{ fontSize: 22 }} />
                    </Button>
                    <Button
                      type="button"
                      color="danger"
                      fullWidth
                      loading={isCanvas}
                      onClick={() => handleCanvas(product.id)}
                    >
                      <FaInstagram style={{ fontSize: 22 }} />
                    </Button>
                    <Button
                      type="button"
                      color="warning"
                      disabled={true}
                      fullWidth
                      onClick={() => handleSharing(product.id)}
                    >
                      <FaTelegram style={{ fontSize: 22 }} />
                    </Button>
                  </Box>
                )}
                <MessageCard key={1} product={product} />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
        Show Snackbar
      </Button> */}

        <Snackbar
          variant="soft"
          color="success"
          open={open}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          startDecorator={<Add />}
          endDecorator={
            <Button
              onClick={() => setOpen(false)}
              size="sm"
              variant="soft"
              color="success"
            >
              Remover
            </Button>
          }
        >
          Seu produto foi criado.
        </Snackbar>
      </Box>
    </>
  )
}

export default CreateProduct
