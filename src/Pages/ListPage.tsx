import { useEffect, useState } from "react";
import axios from "../config/axios_config";
import { Button } from "@mui/material";
import FormDialog from "../Components/DialogAction";
import CardComponent from "../Components/CardComponent";
import { TodoInterface } from "../interface";
import { refreshAndGetAllItem } from "../services";
import { useNavigate } from "react-router";

interface AddTodoInterface {
  title: string;
  description: string;
}

const ListPage = () => {
  const [todo, setTodo] = useState<TodoInterface[]>([]);
  const navigate = useNavigate();

  const handleAddTodo = (data: AddTodoInterface) => {
    onAddTodo(data);
  };

  const onAddTodo = (data: AddTodoInterface) => {
    axios
      .post("/todos/", {
        title: data?.title,
        description: data?.description,
      })
      .then((res) => refreshAndGetAllItem().then((res) => setTodo(res)));
  };
  const onLogOut = () => {
    window.localStorage.removeItem("token");
    navigate("/");
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    refreshAndGetAllItem().then((res) => (setTodo(res), console.log(res)));
  }, []);
  console.log(todo);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          margin: "20px 50px",
        }}
      >
        ListPage
        <Button variant="outlined" onClick={onLogOut} style={{ width: 200 }}>
          Log out
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {todo?.map((item, index) => (
          <div key={index}>
            <CardComponent item={item} setItem={setTodo}></CardComponent>
          </div>
        ))}
      </div>

      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ width: 200, marginLeft: 100 }}
      >
        Add List
      </Button>
      <FormDialog
        isEdit={false}
        open={openDialog}
        handleClose={handleClose}
        onAction={handleAddTodo}
      ></FormDialog>
    </div>
  );
};

export default ListPage;
