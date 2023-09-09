import { Routes, Route} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";


const Router = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
  </Routes>
);

export default Router;
