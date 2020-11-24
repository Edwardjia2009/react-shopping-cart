import './App.css';
import data from './data.json'
import React, { Component } from 'react'
import Products from './components/Products';
import Filter from './components/Filter';

export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: data.products,
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
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
