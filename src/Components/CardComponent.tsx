import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { TodoInterface, DetailInterface } from "../interface";
import { refreshAndGetAllItem } from "../services";
import FormDialog from "./DialogAction";

const Edit = styled("div")`
  font-size: 16px;
  text-align: center;
  color: #bf4f74;
`;

interface CardInterface {
  item: TodoInterface;
  setItem: any;
}

const CardComponent: React.FC<CardInterface> = ({ item, setItem }) => {
  const handleAction = (data: DetailInterface) => {
    onUpdateItem(data);
  };
  const onUpdateItem = (data: DetailInterface) => {
    axios
      .put(`/todos/${item._id}`, {
        title: data?.title,
        description: data?.description,
      })
      .then((res) => refreshAndGetAllItem().then((res) => setItem(res)));
  };
  const onDeleteItem = () => {
    axios
      .delete(`/todos/${item._id}`)
      .then((res) => refreshAndGetAllItem().then((res) => setItem(res)))
      .catch((err) => console.log(err));
  };
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div style={{ margin: 20 }}>
      <Card sx={{ maxWidth: 500 }}>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onDeleteItem}>
              <ClearIcon />
            </IconButton>
          }
          title={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Description: {item.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ justifyContent: "flex-end" }}>
          <Edit onClick={handleClickOpen}>Edit</Edit>
        </CardActions>
        <CardActions disableSpacing></CardActions>
      </Card>
      <FormDialog
        open={openDialog}
        handleClose={handleClose}
        onAction={handleAction}
        isEdit={true}
      ></FormDialog>
    </div>
  );
};

export default CardComponent;
