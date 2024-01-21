import { writable } from 'svelte/store';

export const selectedItemsStore = writable([]);

export const userEmail = writable('');