import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { DetailInterface } from "../interface";

interface DialogInterface {
  open: boolean;
  handleClose: () => void;
  onAction: any;
  isEdit: boolean;
}

const FormDialog: React.FC<DialogInterface> = ({
  open,
  handleClose,
  onAction,
  isEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DetailInterface>();
  const onSubmit: SubmitHandler<DetailInterface> = (data: DetailInterface) => {
    onAction(data);
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEdit ? "Edit" : "Add"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {isEdit ? "Edit your activity" : "Add new thing you want to do."}
          </DialogContentText>
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
              {isEdit ? "Update" : "Add"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
