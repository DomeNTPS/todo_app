import { Routes, Route } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import ListPage from "../Pages/ListPage";

const Router = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/listPage" element={<ListPage />} />
  </Routes>
);

export default Router;
