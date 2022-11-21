import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GoodsItem, SearchGoodsParams } from "./types";
import { pickBy, identity } from "lodash";

export const fetchGoods = createAsyncThunk<GoodsItem[], SearchGoodsParams>(
    'goods/fetchGoodsStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const res = await axios.get<GoodsItem[]>(`https://63550e47da523ceadcf97b37.mockapi.io/items`, {
            params: pickBy({
                page: currentPage,
                limit: 8,
                category,
                sortBy,
                order,
                search
            }, identity,
            ),
        });
        return res.data;
    }
)
