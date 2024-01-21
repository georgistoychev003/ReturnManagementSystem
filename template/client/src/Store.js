import { writable } from 'svelte/store';

export const selectedItemsStore = writable([]);

export const userIdStore = writable(null);