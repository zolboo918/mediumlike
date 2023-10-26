import Form from "@/components/post/Form";
import { FunctionComponent } from "react";

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: FunctionComponent<EditProps> = ({ params: { id } }) => {
  return (
    <div>
      <Form id={id} />
    </div>
  );
};

export default Edit;
