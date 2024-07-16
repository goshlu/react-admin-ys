import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "@/routes";
import AuthRouter from "./routes/utils/authRouter";

function App() {
  return (
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>
  );
}

export default App;
