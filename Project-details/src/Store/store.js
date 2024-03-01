import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Features/setUser';
import adminReducer from '../Features/setAdmin';



export default configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer,
      
    }
})