import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../../data/products.js';
import { loadCart, cart } from '../../data/cart.js';

export function updateHeaderCartQuantity() {
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
}

async function loadPage() {
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        updateHeaderCartQuantity();
        resolve();
      });
    });

  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();
