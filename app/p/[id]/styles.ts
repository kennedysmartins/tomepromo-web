"use client"
import styled from "styled-components"

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 2px solid black;
  padding-left: 16px;
`

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const BuyNowButton = styled.button`
  /* .btn */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  min-width: 200px;
  padding: 16px 16px;
  background-color: #3490dc;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #2779bd;
  }
`

export const SimilarProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding-top: 14px;
`

export const SimilarProductsTitle = styled.p`
  /* .section-text */
  color: #3490dc;
  font-size: 32px;
  font-weight: bold;
`

export const SimilarProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 7px;
  width: 100%;
`

export const ProductPageContainer = styled.div`
  /* .product-container */
  display: flex;
  flex-direction: column;
  gap: 28px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const ProductImage = styled.div`
  /* .product-image */
  flex-grow: 1;
  max-width: 50%;
  padding: 16px;
  border: 2px solid #cddbff;
  border-radius: 17px;

  img {
    max-height: 250px;
    object-fit: contain;
    width: 100%;
    background-color: transparent;
  }
`

export const ProductInfo = styled.div`
  /* .product-info */
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px;
  border-top: 2px solid #e4e4e4;
`

export const ProductHearts = styled.div`
  /* .product-hearts */
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: #fff0f0;
  border-radius: 10px;
  padding: 2px;
`

export const ProductStars = styled.div`
  /* .product-stars */
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: #fbf3ea;
  border-radius: 27px;
  padding: 2px;
`

export const ProductReviews = styled.div`
  /* .product-reviews */
  display: flex;
  align-items: center;
  gap: 2px;
  background-color: #fff;
  border-radius: 27px;
  padding: 2px;
`

export const ModalButton = styled.button`
  /* .btn */
  padding: 16px 16px;
  background-color: #3490dc;
  &:hover {
    background-color: #2779bd;
  }
`

export const GradientBackground = styled.div`
  position: fixed; // Alterado para posição fixa
  bottom: 0;
  left: 0;
  width: 100%;
  height: 5.5rem;
  background: #f7f7f7;
  z-index: 100; // Defina um z-index menor para que fique atrás do botão
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.8); // Adicione uma sombra sutil de baixo para cima
  border-top: 1px solid #ededed;
  @media screen and (min-width: 601px) {
    display: none; // Oculta o fundo gradiente e sombra em dispositivos com largura de tela maior que 600 pixels
  }
`