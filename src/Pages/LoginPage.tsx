import React from "react";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { url } from "../util/constant";
import { AxiosPromise } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

const Title = styled("h1")`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;
const TextInput = styled(TextField)`
  font-size: 28px;
`;

type Inputs = {
  Username: string;
  Password: string;
};

const LoginPage = () => {
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
      .post(`${url}/users/auth/`, {
        username: Username,
        password: Password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios({
    //   method: "post",
    //   url: `${url}/users/auth/`,
    //   data: {
    //     Username: Username,
    //     Password: Password,
    //   },
    // }).then(function (response: any) {
    //   console.log(response);
    // });
  };

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
            {...register("Password", { required: true })}
            error={errors.Password ? true : false}
          ></TextInput>
        </div>
        <Button variant="contained" type="submit">
          LOG IN
        </Button>
        {/* <input type="submit" /> */}
      </form>
    </div>
  );
};

export default LoginPage;
