import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { TodoInterface } from "../interface";
import { refreshAndGetAllItem } from "../services";

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
  const onDeleteItem = () => {
    axios
      .delete(`/todos/${item._id}`)
      .then((res) => refreshAndGetAllItem().then((res) => setItem(res)))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ margin: 20}}>
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
        <CardActions disableSpacing style={{justifyContent: 'flex-end'}}>
          <Edit
            // onClick={handleExpandClick}
          >
            Edit
          </Edit>
        </CardActions>
        <CardActions disableSpacing></CardActions>
      </Card>
    </div>
  );
};

export default CardComponent;
