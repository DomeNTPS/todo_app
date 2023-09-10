import React, { useEffect } from "react";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "../config/axios_config";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Title = styled("h1")`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;
const TextInput = styled(TextField)`
  font-size: 28px;
`;

interface Inputs {
  Username: string;
  Password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    onLogin(data.Username, data.Password);
  };
  const onLogin = (Username: string, Password: string) => {
    axios
      .post(`/users/auth/`, {
        username: Username,
        password: Password,
      })
      .then((response) => {
        window.localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common = { Authorization: `Bearer ${response.data.token}` };
        navigate("/listPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const authChecked = window.localStorage.getItem("token");
    if (authChecked) {
      navigate("/listPage");
    }
  }, []);

  return (
    <div>
      <Title>Login Page</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          username
          <TextInput
            {...register("Username", { required: true })}
            error={errors.Username ? true : false}
          ></TextInput>
        </div>
        <div>
          password
          <TextInput
            type="password"
            {...register("Password", { required: true })}
            error={errors.Password ? true : false}
          ></TextInput>
        </div>
        <Button variant="contained" type="submit">
          LOG IN
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
