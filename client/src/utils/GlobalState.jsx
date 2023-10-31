//Future dev. Global states and reducers to be used for future dev to optimise code
import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducers";

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    user:{},
    complaints: [],
    comments: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };
