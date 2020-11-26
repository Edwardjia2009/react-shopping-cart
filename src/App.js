import './App.css';
import data from './data.json'
import React, { Component } from 'react'
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    }
  }

  filterProducts = (event) => {
    if (!event.target.value) {
      this.setState({
        size: event.target.value,
        products: data.products
      })
      return;
    }
    this.setState({
      size: event.target.value,
      products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
    })
  }

  sortProducts = (event) => {
    const sort = event.target.value
    this.setState(state => ({
      sort,
      products: this.state.products.slice().sort((a, b) => {
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
    }))
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.cartItems !== this.state.cartItems) { localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems)) }
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} />
            </div>
          </div>
        </main>
        <footer>
          All Rights Reserved
      </footer>
      </div>
    )
  }
}

export default App;
