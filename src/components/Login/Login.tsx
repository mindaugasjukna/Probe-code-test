"use client";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/Layout/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import users from "../../users.json";

type LoginInput = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    setErrorMessage("");

    const foundUser = users.find(
      (user) => data.email === user.email && data.password === user.password
    );

    if (!foundUser) {
      setErrorMessage("User not found");
      return;
    }

    if (foundUser) {
      setCurrentUser(foundUser);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email</label>
      <input
        type="email"
        {...register("email", {
          required: "Email Address is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Not an email",
          },
        })}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <label>Password</label>
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {errorMessage && <p>{errorMessage}</p>}
      <input type="submit" />
    </form>
  );
};

export default Login;
