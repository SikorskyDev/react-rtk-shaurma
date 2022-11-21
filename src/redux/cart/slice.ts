import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLocalStorage";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { CartItem, CartSliceState } from "./types";

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: "cart",

    initialState,

    reducers: {
        addItem(state, actions: PayloadAction<CartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === actions.payload.id
            );
            // if (findItem?.type === "не гостра") {
            //     findItem.id = `${actions.payload.id}ng`
            // } else if (findItem?.type === "гостра") {
            //     findItem.id = `${actions.payload.id}g`
            // }
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    // Беремо все що прийшло із компонента і в кінець добавляю count:1
                    ...actions.payload,
                    count: 1,
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },

        plusItem(state, actions: PayloadAction<string>) {
            const findItem = state.items.find(
                (obj) => obj.id === actions.payload
            );
            if (findItem) {
                findItem.count++;
            }

            state.totalPrice = calcTotalPrice(state.items);

        },

        minusItem(state, actions: PayloadAction<string>) {
            const findItem = state.items.find(
                (obj) => obj.id === actions.payload
            );

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem(state, actions: PayloadAction<string>) {
            state.items = state.items.filter(
                (obj) => obj.id !== actions.payload
            );
            state.totalPrice = calcTotalPrice(state.items);
        },

        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearItems, minusItem, plusItem } = cartSlice.actions;

export default cartSlice.reducer;
