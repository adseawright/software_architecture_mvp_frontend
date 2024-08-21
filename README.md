# JrPreneur Frontend Files

## Cart.js
This component manages the shopping cart functionality, allowing users to view, add, and remove items from their cart. It also handles the checkout process by creating an order and navigating the user to the order confirmation page upon successful purchase.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - Load cart items from `localStorage`.
  - Handle checkout and order creation.
  - Remove items from the cart.
- **Related Styles**: `Cart.css`

## Checkout.js
The Checkout component integrates with PayPal to handle payments. It loads PayPal buttons and manages the payment process, including capturing payment details and clearing the cart upon successful payment.

- **Dependencies**: React, PayPal, React Router
- **Key Features**:
  - Load PayPal buttons dynamically.
  - Capture and process payment details.
  - Redirect users upon successful payment.
- **Related Styles**: None

## Login.js
This component handles user authentication. It manages the login form, validates user credentials, and stores the authentication token in `localStorage` upon successful login.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - User login form with email and password fields.
  - Handle authentication and error scenarios.
  - Redirect to the profile page after login.
- **Related Styles**: `Login.css`

## NavBar.js
The NavBar component provides a navigation menu for the application. It includes links to the profile, stores, products, and logout pages, using icons to represent each section.

- **Dependencies**: React, React Router
- **Key Features**:
  - Navigation links to different application sections.
  - Uses images as icons for navigation.
- **Related Styles**: `NavBar.css`

## OrderConfirmation.js
This component displays the order confirmation page after a successful purchase. It shows the order ID and provides links for users to navigate back to the storefront or their profile.

- **Dependencies**: React, React Router
- **Key Features**:
  - Display order confirmation details.
  - Provide navigation links to storefront and profile.
- **Related Styles**: `OrderConfirmation.css`

## Products.js
This component manages the product catalog within a store. It allows users to add, update, delete, and view products. It also handles the display of product details and provides navigation to the storefront.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - CRUD operations for products.
  - Display product list and details.
  - Link to the storefront for product browsing.
- **Related Styles**: `Products.css`

## Profile.js
The Profile component handles the user’s profile, including store and product management. It allows users to update their profile, create stores, and manage products within their stores.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - Display and update user profile.
  - Manage stores and products.
  - Provide navigation to different sections of the app.
- **Related Styles**: `Profile.css`

## Register.js
This component handles user registration. It includes a form for new users to sign up by providing their username, email, and password. Upon successful registration, the user is redirected to the profile page.

- **Dependencies**: React, Axios
- **Key Features**:
  - User registration form with validation.
  - Handle registration and redirect upon success.
- **Related Styles**: `Register.css`

## Storefront.js
The Storefront component displays products from a specific store. Users can browse products, add them to their cart, and navigate to the cart for checkout.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - Fetch and display products for a specific store.
  - Add products to the shopping cart.
  - Navigation to the cart for checkout.
- **Related Styles**: `Storefront.css`

## Stores.js
This component manages the list of stores associated with the user. It allows users to create, update, delete, and view stores. It also provides navigation to manage products within a store.

- **Dependencies**: React, Axios, React Router
- **Key Features**:
  - CRUD operations for stores.
  - Display a list of stores owned by the user.
  - Provide navigation to the storefront and products.
- **Related Styles**: `Stores.css`
