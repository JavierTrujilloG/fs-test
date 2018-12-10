import React, { Component } from 'react';
import './App.css';

import * as FSapi from './api/FBapi';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: {},
            products: []
        };
        
        this.checkout = this.checkout.bind(this);
        this.selectAmount = this.selectAmount.bind(this);
    }

    async componentDidMount() {
        // Start fresh session
        var mySession = {
            "reset": true,
            "products" : [],
            "paymentContact": {
                "email":"myName@email.com",
                "firstName":"John",
                "lastName":"Doe"
            },
            "language":"en"
        };
        window.fastspring.builder.push(mySession);
        
        const { products } = await FSapi.getProducts();
        // Reset Builder in case it has acted on the DOM before the data is rendered.
        // If that's the case the HTML directives won't work and user won't see anything
        this.setState({ products }, window.fastspring.builder.reset);
    }

    selectAmount(item, event){
        const { cart } = this.state;
        const { value } = event.target;
        if (parseInt(value) === 0 && Object.keys(cart).indexOf(item) > -1) {
            delete cart[item];
        } else { 
            cart[item] = value;
        }
        console.log('carrt', cart);
        this.setState({ cart });
    }

    checkout() {
        const { cart } = this.state;
        const products = Object.keys(cart).map(itemId => ({
            path: itemId,
            quantity: this.state.cart[itemId] || 0
        }));

        // Prepare session object
        var mySession = {
            "reset": true,
            "products" : products,
            "paymentContact": {
                "email":"myName@email.com",
                "firstName":"John",
                "lastName":"Doe"
            },
            "language":"en"
        };
        
        // Push session to fastspring
        window.fastspring.builder.push(mySession, () => {
            window.fastspring.builder.checkout();
        });
    }

    render() {
        const { products, cart } = this.state;
        
        const cards = [];
        const cartElements = [];
        products.forEach(item => {
            cards.push((
                <div className='product-card'>
                    <img style={{height: 50 }} src={item.image} />
                    <p data-fsc-item-path={item.id} data-fsc-item-display />
                    
                </div>
            ));
            cartElements.push((
                <tr>
                    <td data-fsc-item-path={item.id} data-fsc-item-display />
                    <td data-fsc-item-path={item.id} data-fsc-item-price />
                    <td>
                        <select
                            onChange={(e) => this.selectAmount(item.id, e)}
                            data-fsc-item-path-value={item.id}
                            data-fsc-item-quantity-value
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </td>
                </tr>
            ));
        });
        const checkoutEnabled = Object.keys(cart).length > 0;
        const buttonClass = `button-checkout ${checkoutEnabled && 'enabled'}`;
        return (
            <div className="App">
                <h1> The Hawaiian Cowboy </h1>

                <div className='card-container'>
                    {cards}
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th> Item </th>
                                <th> Price </th>
                                <th> Amount </th>
                            </tr>
                            {cartElements}
                        </tbody>
                    </table>
                        <button
                            disabled={!checkoutEnabled}
                            className={buttonClass}
                            onClick={this.checkout}
                        >
                            Checkout
                        </button>
                
                </div>

            </div>
        );
    }
}

export default App;
