import { WalletData } from './../../../interfaces/WalletData';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: WalletData = {
    openConnectDialog: false,
    bsc: ''
}
export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setOpenConnectDialog: (state, action: PayloadAction<boolean>) => {
            state.openConnectDialog = action.payload;
        }
    }
})
export const { setOpenConnectDialog } = walletSlice.actions;
const { reducer: walletReducer } = walletSlice;
export default walletReducer;