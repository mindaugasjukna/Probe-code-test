"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import users from "../../users.json";
import { useRouter } from "next/navigation";

type SignupInput = {
  name: string;
  dob: string;
  email: string;
  password: string;
  repeatpassword: string;
};

const SignUp: React.FC = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupInput>();

  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    users.push({
      id: users.length + 1,
      name: data.name,
      email: data.email,
      password: data.password,
      dob: data.dob,
    });

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* NAME */}
      <label>Name</label>
      <input
        type="text"
        {...register("name", {
          required: "Name is required",
        })}
      />
      {errors.name && <p>{errors.name.message}</p>}

      {/* DOB */}
      <label>DOB</label>
      <input
        type="text"
        {...register("dob", {
          required: "DOB is required",
        })}
      />
      {errors.dob && <p>{errors.dob.message}</p>}

      {/* EMAIL */}
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

      {/* PASSWORD */}
      <label>Password</label>
      <input
        type="password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && <p>{errors.password.message}</p>}

      {/* REPEAT PASSWORD */}
      <label>Repeat password</label>
      <input
        type="password"
        {...register("repeatpassword", {
          required: "Repeatpassword is required",
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do no match";
            }
          },
        })}
      />
      {errors.repeatpassword && <p>{errors.repeatpassword.message}</p>}

      <input type="submit" />
    </form>
  );
};

export default SignUp;
