import React, { Component } from 'react'
import formatCurrency from '../utils'

export class Cart extends Component {
  render() {
    const { cartItems } = this.props
    return (
      <div>
        {
          cartItems.length === 0
            ? <div className="cart cart-header">Cart is empty</div>
            : <div className="cart cart-header">You have {cartItems.length} in your cart</div>
        }
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="right">
                  <div>{item.title}</div>
                  {formatCurrency(item.price)} x {item.count} {" "}
                  <button className="button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 &&
          <div className="cart">
            <div className="total">
              <div>
                Total: {" "}
                {formatCurrency(cartItems.reduce((a, c) => a + c.price * c.count, 0))}
              </div>
              <div>
                <button className="button primary">Proceed</button>
              </div>
            </div>
          </div>}
      </div>
    )
  }
}

export default Cart