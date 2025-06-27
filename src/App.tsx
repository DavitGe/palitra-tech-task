import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./components/routing";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
