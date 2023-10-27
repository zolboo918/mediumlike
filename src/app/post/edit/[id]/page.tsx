import Form from "@/components/post/Form";
import { getPostById } from "@/lib/prisma/posts";
import { Post } from "@/types";
import { FunctionComponent } from "react";

interface EditProps {
  params: {
    id: string;
  };
}

const Edit: FunctionComponent<EditProps> = async ({ params: { id } }) => {
  const { post } = await getPostById(id);
  return (
    <div>
      <Form post={post} />
    </div>
  );
};

export default Edit;
