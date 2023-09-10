import axios from "axios";
import { url } from "../util/constant";
axios.defaults.baseURL = url;
// const token = window.localStorage.getItem("token");
// axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
export default axios;
