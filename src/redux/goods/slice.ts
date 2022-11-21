import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGoods } from "./asyncActions";
import { GoodsItem, GoodsSliceState, Status } from "./types";

const initialState: GoodsSliceState = {
    items: [],
    status: Status.LOADING
}

export const goodsSlice = createSlice({
    name: 'goods',
    initialState,

    reducers: {
        setItems(state, action: PayloadAction<GoodsItem[]>) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGoods.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
        })
        builder.addCase(fetchGoods.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        })
        builder.addCase(fetchGoods.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
        })
    }
    // extraReducers: {
    //     [fetchGoods.pending]: (state) => {
    //         state.status = 'loading';
    //         state.items = [];
    //     },
    //     [fetchGoods.fulfilled]: (state, action) => {
    //         state.items = action.payload;
    //         state.status = 'success';
    //     },
    //     [fetchGoods.rejected]: (state, action) => {
    //         console.log('ERROR');
    //         state.status = 'error';
    //         state.items = [];
    //     }
    // }
})


export const { setItems } = goodsSlice.actions

export default goodsSlice.reducer