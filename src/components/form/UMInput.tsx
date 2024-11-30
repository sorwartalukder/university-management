import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const UMInput = ({ type = "text", name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {label ?? null}
      <Controller
        name={name}
        render={({ field }) => <Input type={type} id={name} {...field} />}
      />
    </div>
  );
};

export default UMInput;
