import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormData = {
  firstName: string;
  age: number;
};

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

export default function UseForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<FormData> = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} />
      <p>{errors?.firstName?.message}</p>

      <input {...register("age")} />
      <p>{errors?.age?.message}</p>

      <input type="submit" />
    </form>
  );
}
