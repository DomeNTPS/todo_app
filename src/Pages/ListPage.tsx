import { useCallback, useEffect, useState } from "react";
import axios from "../config/axios_config";
import { Button } from "@mui/material";
import FormDialog from "../Components/AddDialog";
import CardComponent from "../Components/CardComponent";
import { TodoInterface } from "../interface";
import { refreshAndGetAllItem } from "../services";

interface AddTodoInterface {
  title: string;
  description: string;
}

const ListPage = () => {
  const [todo, setTodo] = useState<TodoInterface[]>([]);

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

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    refreshAndGetAllItem().then((res) => setTodo(res));
  }, []);
  console.log(todo);

  return (
    <div>
      ListPage
      {todo?.map((item, index) => (
        <div key={index}>
          <CardComponent item={item} setItem={setTodo}></CardComponent>
        </div>
      ))}
      <Button variant="outlined" onClick={handleClickOpen}>
        Add List
      </Button>
      <FormDialog
        open={openDialog}
        handleClose={handleClose}
        onAdd={handleAddTodo}
      ></FormDialog>
    </div>
  );
};

export default ListPage;
