## The Hawaiian Cowboy shop

The Hawaiian Cowboy shop represents a virtual shop which integrates FastSprint as its e-commerce solution.
It is a pretty simple page to showcase various FastSpring functionalities:
- Store Builder Library: acting as the frontend client to handle the product cart and checkout.
  - It leverages on the HTML directives to display products' name.
  - It uses the `fastspring.builder` javascript object to perform session checkout.
- FastSpring API: there is an initial call to the API to retrieve products' information. However, because the domain needs to be whitelisted it will be failed because of CORS. In such case, it fallbacks to previously retrived data.


Too speed things up, this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
