import axios from "axios";

export const refreshAndGetAllItem = async() => {
  const allItem = await axios.get(`/todos/`)
  return allItem.data
};
