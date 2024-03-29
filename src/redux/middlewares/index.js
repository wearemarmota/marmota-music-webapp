import { setClientWithAuth } from "../../shared/api-service";
import { SET_AUTH, UNSET_AUTH } from "../actionTypes";
import { persistor } from "../store";

// This middleware updates the auth token on api-service
export const saveAuthToken = (store) => (next) => (action) => {
  switch (action.type) {
    case SET_AUTH:
      setClientWithAuth(action.payload.token);
      break;
    case UNSET_AUTH:
      setClientWithAuth(null);
      break;
    case "persist/REHYDRATE":
      const persistedVersion = action.payload?._persist.version;
      const currentVersion = store?.getState()._persist.version;

      if (persistedVersion !== currentVersion) {
        persistor.purge();
      } else {
        setClientWithAuth(action.payload?.auth?.token || null);
        break;
      }
      break;

    // no default
  }
  return next(action);
};
