import styled from "styled-components"


export const Header = styled.header`
  width: 100%;

  a {
    text-decoration: none;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-block: 1.4rem;
    padding-inline: 6px;
    margin-inline: auto;
    width: 80%

  }
`

export const TextLogo = styled.p`
  color: black;
  font-weight: 700;

  span {
    color: red;
  }
`
