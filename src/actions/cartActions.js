import { ADD_TO_CART, REMOVE_FROM_CART } from "../types"

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice()
  let alreadyExist = false
  cartItems.forEach(item => {
    if (item._id === product._id) {
      alreadyExist = true
      item.count += 1
    }
  })

  if (!alreadyExist) { cartItems.push({ ...product, count: 1 }) }
  console.log(cartItems)

  dispatch({
    type: ADD_TO_CART,
    payload: { cartItems }
  })
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

export const removeFromCart = (product) => (dispatch, getState) => {
  const items = getState().cart.cartItems
  const cartItems = items.slice().filter(item => item._id !== product._id)
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } })
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}