import { writable } from 'svelte/store';
export const userEmail = writable('');

export const RMAId = writable('');

export const userIdStore = writable();
export const selectedProductsStore = writable([]);
export const orderStore = writable({ orderId: null, orderDate: null });
