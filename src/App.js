import './App.css';
import React, { Component } from 'react'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import { Provider } from 'react-redux';
import store from './store'

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count += 1
        alreadyInCart = true
      }
    })
    if (!alreadyInCart) { cartItems.push({ ...product, count: 1 }) }
    this.setState({ cartItems })
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice()
    this.setState({
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
  }

  createOrder = order => {
    alert("aaa")
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) { localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems)) }
  }

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter />
                <Products addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>
            All Rights Reserved
      </footer>
        </div>
      </Provider>
    )
  }
}

export default App;
