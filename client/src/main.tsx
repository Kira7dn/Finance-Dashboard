import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query/index";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);