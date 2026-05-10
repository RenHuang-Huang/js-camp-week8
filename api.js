// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  // 請實作此函式
  // 回傳 response.data.products
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/products`);
  const data = await response.json();
  return data.products;
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  // 請實作此函式
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`);
	const data = await response.json();
	return {
		carts: data.carts,
		total: data.total,
		finalTotal: data.finalTotal,
	};
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ data: { productId, quantity } }),
		},
	);
	const data = await response.json();
	return {
		carts: data.carts,
		total: data.total,
		finalTotal: data.finalTotal,
	};
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
		{
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { id: cartId, quantity } }),
		},
	);
	const data = await response.json();
	return {
		carts: data.carts,
		total: data.total,
		finalTotal: data.finalTotal,
	};
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts/${cartId}`,
		{
			method: "DELETE",
		},
	);
	const data = await response.json();
	return {
		carts: data.carts,
		total: data.total,
		finalTotal: data.finalTotal,
	};
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  // 請實作此函式
  const response = await fetch(
		`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/carts`,
		{ method: "DELETE" },
	);
	const data = await response.json();
	return {
		carts: data.carts,
		total: data.total,
		finalTotal: data.finalTotal,
	};
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  // 請實作此函式
  const response = await fetch(`${BASE_URL}/api/livejs/v1/customer/${API_PATH}/orders`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: userInfo }),
    },
  );
  const data = await response.json();
  return data;
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  const response = await fetch(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders`, {
    headers: {
      authorization: ADMIN_TOKEN
    }
  });
  const data = await response.json();
  return data.orders;
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  // 請實作此函式
  const response = await fetch(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: ADMIN_TOKEN
    },
    body: JSON.stringify({ data: { id: orderId, isPaid: isPaid } }),
  });
  const data = await response.json();
  return data;
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  // 請實作此函式
  const response = await fetch(`${BASE_URL}/api/livejs/v1/admin/${API_PATH}/orders/${orderId}`, {
    method: "DELETE",
    headers: {
      authorization: ADMIN_TOKEN
    }
  });
  const data = await response.json();
  return data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
