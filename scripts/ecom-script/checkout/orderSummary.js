import {cart, removeFromCart, updateDeliveryOption, updateQuantity} from '../../../data/cart.js';
import {products, getProduct} from '../../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import { updateHeaderCartQuantity } from '../checkout.js';


export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container
        js-cart-item-container
        js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity
              js-product-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <input class="js-new-quantity-input new-quantity-input" type="number" value="${cartItem.quantity}" data-testid="new-quantity-input">
              <span class="js-update-quantity-link update-quantity-link link-primary">
                Update
              </span>
              <span class="js-save-quantity-link save-quantity-link link-primary" data-testid="save-quantity-link">
                  Save
                </span>
              <span class="delete-quantity-link link-primary js-delete-link
                js-delete-link-${matchingProduct.id}"
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  /*handle "Delete" button click */
  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.remove();

        renderPaymentSummary();        
        updateHeaderCartQuantity(); 
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });

  // Handle "Update" button click
  document.querySelectorAll('.js-update-quantity-link')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.closest('.product-quantity');
      container.querySelector('.js-update-quantity-link').style.display = 'none';
      container.querySelector('.quantity-label').style.display = 'none';
      container.querySelector('.js-new-quantity-input').style.display = 'inline-block';
      container.querySelector('.js-save-quantity-link').style.display = 'inline-block';
    });
  });

  // Handle "Save" button click
  document.querySelectorAll('.js-save-quantity-link')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.closest('.product-quantity');
      const newQuantityInput = container.querySelector('.js-new-quantity-input');
      const newQuantity = parseInt(newQuantityInput.value);
      const productId = button.closest('.js-cart-item-container').classList[2].replace('js-cart-item-container-', '');

      if (isNaN(newQuantity) || newQuantity < 1) {
        alert('Quantity must be at least 1');
        return;
      }

      // Update the quantity in the cart
      import('../../../data/cart.js').then(module => {
        module.updateQuantity(productId, newQuantity);
        renderOrderSummary();
        renderPaymentSummary();
        updateHeaderCartQuantity(); 
      });
    });
  });
}


