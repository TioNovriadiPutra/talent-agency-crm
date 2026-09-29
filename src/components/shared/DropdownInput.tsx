import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  required?: boolean;
};

function DropdownInput() {
  return <div>DropdownInput</div>;
}

export default DropdownInput;
