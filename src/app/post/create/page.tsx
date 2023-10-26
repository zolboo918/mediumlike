import Form from "@/components/post/Form";
import { FunctionComponent } from "react";

interface createProps {
  params: {
    id: string;
  };
}

const create: FunctionComponent<createProps> = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default create;
