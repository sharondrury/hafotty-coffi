import AppRoutes from "./routes";
import BasketProvider from "./website/components/basket/basketContext";

const App = () => {
  return (
    <BasketProvider>
      <AppRoutes />
    </BasketProvider>
  )
}

export default App;
