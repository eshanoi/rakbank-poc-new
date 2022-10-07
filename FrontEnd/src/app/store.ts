import {
    Action,
    configureStore,
    ThunkAction,
} from '@reduxjs/toolkit';

import contentApiSlice from '../blocks/ContainerBlock/contentarea-slice';

export const store = configureStore({
    reducer: {
        contentBlock: contentApiSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
