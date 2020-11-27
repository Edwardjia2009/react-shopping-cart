import { FETCH_PRODUCTS, FILTER_PRODUCT_BY_SIZE, ORDER_PRODUCT_BY_SIZE } from "../types"

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products")
  const data = await res.json()
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data
  })
}

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCT_BY_SIZE,
    payload: {
      size: size,
      items: size === "" ? products : products.filter(product => product.availableSizes.includes(size))
    }
  })
}

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice()
  sortedProducts.sort((a, b) => {
    return sort === "lowest"
      ? a.price > b.price
        ? 1
        : -1
      : sort === "highest"
        ? a.price < b.price
          ? 1
          : -1
        : a._id > b._id
          ? 1
          : -1
  })
  dispatch({
    type: ORDER_PRODUCT_BY_SIZE,
    payload: {
      sort: sort,
      items: sortedProducts
    }
  })
}