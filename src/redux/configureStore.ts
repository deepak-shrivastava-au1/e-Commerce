import { persistStore, persistReducer } from 'redux-persist'
import sessionStorage from 'redux-persist/lib/storage/session'
import rootReducer from '../redux/Slices'
import {createStateSyncMiddleware, withReduxStateSync} from "redux-state-sync";
import thunk from "redux-thunk"


import { configureStore } from '@reduxjs/toolkit'
import { REDUX_PERSIST_KEY } from '../constants/Constants'

const reduxStateSyncConfig = {
  blacklist: ["persist/PERSIST", "persist/REHYDRATE"]
};

const persistConfig = {
  key: REDUX_PERSIST_KEY,
  storage:sessionStorage,
  whitelist : ['user']
}


const rootPersistedReducer = persistReducer(persistConfig, withReduxStateSync(rootReducer))

export default () => {

  let store=configureStore({
    reducer:rootPersistedReducer,  
    middleware: [thunk]
  });

  let persistor = persistStore(store)

  return { store, persistor }
}