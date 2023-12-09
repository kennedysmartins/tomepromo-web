export type PriceHistoryItem = {
  price: number
}

export type User = {
  email: string
}

export type Product = {
  id?: number
  url: string
  buyLink: string
  currency: string
  image: string
  title: string
  announcement1: string
  website: string
  catchyText: string
  currentPrice: number
  recurrencePrice: number
  cupom: string
  cupomValue: string
  conditionCupom: string
  originalPrice: number
  priceHistory: PriceHistoryItem[] | []
  highestPrice: number
  lowestPrice: number
  clicks: number
  averagePrice: number
  discountRate: number
  description: string
  category: string
  reviewsCount: number
  stars: number
  isOutOfStock: boolean
  users?: User[]
}

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET"

export type EmailContent = {
  subject: string
  body: string
}

export type EmailProductInfo = {
  title: string
  url: string
}
