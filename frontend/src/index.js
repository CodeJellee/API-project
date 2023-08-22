// frontend/src/index.js
import React from "react";

import "./index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ModalProvider, Modal } from "./context/Modal";
import App from "./App";

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";
import * as spotsActions from "./store/spots"
import * as reviewsActions from "./store/reviews"
import * as bookingsActions from "./store/bookings"

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  window.spotsActions = spotsActions;
  window.reviewsActions = reviewsActions;
  window.bookingsActions = bookingsActions;
}


//BOOKINGS-----------------------------------------------
//window.store.dispatch(window.bookingsActions.thunkGetCurrentUserBookings())
//window.store.dispatch(window.bookingsActions.thunkGetBookingsBySpotId(:spotId))
//window.store.dispatch(window.productActions.thunkDeleteSingleProduct(:productId))
//window.store.dispatch(window.productActions.thunkGetUsersProducts())
// window.store.dispatch(
// 	window.productActions.thunkCreateNewProduct({
// 		item_name: "try plant",
// 		product_price: "300",
// 		product_quantity: "2",
// 		product_description: "Beautiful try plant",
// 		product_dimension: "insert dimension here",
// 		product_preview_image: "try url",
// 	})
//   );
// window.store.dispatch(
//     window.productActions.thunkUpdateSingleProduct(2, {
//         item_name: "TESTINGtry plant",
//         product_price: "300",
//         product_quantity: "2",
//         product_description: "Beautiful try plant",
//         product_dimension: "insert dimension here",
//         product_preview_image: "try url",
//     }, {
//     email: "demo@aa.io",
//     first_name: "Demo",
//     id: 1,
//     last_name: "User",
//     username: "Demo"
// })
// );

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:
function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
