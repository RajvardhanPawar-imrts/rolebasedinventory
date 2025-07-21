import AppRouter from "./Router/Router";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AuthLoader from "./auth/AuthLoader";

function App() {
  return (
    <>
      <Provider store={store}>
        <AuthLoader>
          <AppRouter />
        </AuthLoader>
      </Provider>
    </>
  );
}

export default App;
