import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";

interface DialogInterface {
  open: boolean;
  handleClose: () => void;
  onAdd: any
}
interface TodoAddInterface {
  title: string;
  description: string;
}

const FormDialog: React.FC<DialogInterface> = ({ open, handleClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoAddInterface>();
  const onSubmit: SubmitHandler<TodoAddInterface> = (
    data: TodoAddInterface
  ) => {
    onAdd(data)
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add ToDo List</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new thing you want to do.</DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              title
              <TextField
                {...register("title", { required: true })}
                error={errors.title ? true : false}
              ></TextField>
            </div>
            <div>
              description
              <TextField
                {...register("description", { required: true })}
                error={errors.description ? true : false}
              ></TextField>
            </div>
            <Button variant="contained" type="submit">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
