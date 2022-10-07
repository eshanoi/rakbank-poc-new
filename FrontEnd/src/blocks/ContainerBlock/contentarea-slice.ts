import {
    createAsyncThunk,
    createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../../app/store';
import { IContentDataBase } from '../../models/base-common-model';
import { getDataByContentIdAsync } from './content-api';

export interface BlockComponent {
    parentId?: number;
    data: IContentDataBase[]
}
const initialState: BlockComponent = {
    data: []
}

export const incrementAsync = createAsyncThunk(
    'counter/fetchBlock',
    async (amount: number) => {
        console.warn('herer', amount)
        const response = await getDataByContentIdAsync(amount);
        return response;
    }
);

export const contentApiSlice = createSlice({
    name: 'contentapi',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(incrementAsync.fulfilled, (state, action) => {
                console.warn('init state ', action)
                if (action?.payload?.contentLink?.id) {
                    const existedDataIndex = state.data.findIndex(m => m.contentLink.id === action?.payload?.contentLink.id);
                    if (existedDataIndex > -1) {
                        state.data[existedDataIndex] = action.payload;
                    } else {
                        state.data.push(action.payload);
                    }
                }

            })
    },
});

export const contentareaSelector = (state: RootState) => state.contentBlock.data[0];
export const contentareaSelectorNew = (blockId: number) => (state: RootState) => state.contentBlock.data.find(m => m.contentLink.id == blockId) as unknown as IContentDataBase;

export default contentApiSlice.reducer;
