import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { saveAuthToken } from "./middlewares";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  version: 1, // Must be updated when reducer's structure change
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(saveAuthToken))
);

let persistor = persistStore(store);

export { store, persistor };
