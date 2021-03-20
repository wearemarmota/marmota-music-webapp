import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { saveAuthToken } from "./middlewares";
import rootReducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, applyMiddleware(saveAuthToken))
let persistor = persistStore(store)

export { store, persistor }