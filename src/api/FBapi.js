import Constants from '../config/Constants';
const { get } = require('../utils/request');

/* Fallback data
 * If the site has not been whitelisted yet, there will be a CORS error.
 * In such case, fallback to the data below (I previously retrieved
 * using `curl` command-line
 *
 */
const imageURL = 'https://d8y8nchqlnmka.cloudfront.net/46TKvgASRRU/';

const items = [
    {
        id: 'trousers',
        image: `${imageURL}JjxoONuUQOE/trousers.jpg`
    },
    {
        id: 'awesome-shoes',
        image: `${imageURL}x27ScWWvQsU/shoes.png`
    },
    {
        id: 'cowboy-hat',
        image: `${imageURL}sU96NzKGRW8/cowboy_hat.png`
    },
    {
        id: 'shirt',
        image: `${imageURL}8Y-hMQpWSBw/shirt.jpg`
    }
];

/* getProducts
 * It retrieves all the products' information. In order to achieve that
 * we must first get the ids from endpoint `/products` to later query each
 * product endpoint `/products/{id}`
 * 
 * For more information see: https://docs.fastspring.com/integrating-with-fastspring/fastspring-api/products
 *
 */
export const getProducts = (query) => {
    const url = `${Constants.API_URL}products`;
    return get(url).then(res => {
        if (!res.success) {
            throw new Error('Could not retrieve products');
        }
        const productIds = res.products.join();
        return get(`${url}${productIds}`);
    })
    .catch((err) => {
        console.log('Could not get result', err.message);
        // Most likely this is a CORS error because the domain
        // has not been whitelisted yet. Return fake success response
        return { success: true, products: items };
    });
};
