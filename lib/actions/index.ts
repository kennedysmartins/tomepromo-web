"use server"
import { revalidatePath } from "next/cache"
import Product from "../models/product.model"
import { connectToDB } from "../mongoose"
import { scrapeAmazonProduct } from "../scraper"
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils"
import { User } from "@/types"
import { generateEmailBody, sendEmail } from "../nodemailer"
import { PrismaClient } from "@prisma/client"

interface ClickParams {
  id: any
  isProduct: boolean
}

const prisma = new PrismaClient()

export const getProducts = async () => {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc", // Assuming 'createdAt' is the field to order by
      },
    })
    return products
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getProductsPaginated = async (page = 1, pageSize = 20) => {
  try {
    const products = await prisma.products.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
    return products
  } catch (error) {
    throw new Error(error.message)
  }
}

export const addClick = async ({
  id,
  isProduct,
}: ClickParams): Promise<any> => {
  try {
    await prisma.$connect()

    if (isProduct) {
      console.log('Adicionando click ao produto com ID:',id)
      const newClick = await prisma.clicks.create({
        data: {
          productId: id,
        },
      })

      return newClick
    } else {
      console.log("Adicionando click ao grupo com ID:", id)
      const newClick = await prisma.clicks.create({
        data: {
          groupId: id,
        },
      })

      return newClick
    }
  } catch (error) {
    throw new Error(error.message)
  } finally {
    await prisma.$disconnect()
  }
}


export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return

  try {
    connectToDB()
    const scrapedProduct = await scrapeAmazonProduct(productUrl)
    if (!scrapedProduct) return

    let product = scrapedProduct

    const existingProduct = await Product.findOne({ url: scrapedProduct.url })

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    )

    revalidatePath(`/products/${newProduct._id}`)
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function storeProduct(scrapedProduct) {
  try {
    await prisma.$connect()

    const newProduct = await prisma.products.create({
      data: scrapedProduct,
    })
    console.log("Produto criado ID", newProduct.id)
    return newProduct
  } catch (error) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  } finally {
    await prisma.$disconnect()
  }
}

export async function getProductById(productId: Number) {
  try {
    const product = await prisma.products.findUnique({
      where: {
        id: parseInt(productId),
      },
    })

    if (!product) return null

    return product
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to get product by ID: ${error.message}`)
  }
}

export async function getAllProducts() {
  try {
    connectToDB()
    const products = await Product.find()

    return products
  } catch (error) {
    console.log(error)
  }
}

export async function getSimilarProducts(productId: Number) {
  try {
    const currentProduct = await prisma.products.findUnique({
      where: {
        id: parseInt(productId),
      },
    })

    if (!currentProduct) return null

    const similarProducts = await prisma.products.findMany({
      where: {
        id: { not: parseInt(productId) },
      },
      take: 3, // Limita a 3 produtos semelhantes
      orderBy: {
        createdAt: "desc", // Assuming 'createdAt' is the field to order by
      },
    })

    return similarProducts
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to get similar products: ${error.message}`)
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId)
    if (!product) return

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    )

    if (!userExists) {
      product.users.push({ email: userEmail })
      await product.save()
      const emailContent = await generateEmailBody(product, "WELCOME")
      await sendEmail(emailContent, [userEmail])
    }
  } catch (error) {
    console.log(error)
  }
}
