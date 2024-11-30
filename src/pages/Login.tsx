import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UMForm from "../components/form/UMForm";
import UMInput from "../components/form/UMInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const defaultValues = {
    userId: "A-0001",
    password: "admin123",
  };
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);

    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 5000 });

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ??
          "Something went wrong",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <UMForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <UMInput type="text" name="userId" label={"ID:"} />
        <UMInput type="text" name="password" label={"Password:"} />
        <Button htmlType="submit">Login</Button>
      </UMForm>
    </Row>
  );
};

export default Login;
