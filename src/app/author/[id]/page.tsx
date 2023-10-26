import { FunctionComponent } from "react";
import Author from "@/components/Author";

interface AuthorPageProps {
  params: {
    id: string;
  };
}

const AuthorPage: FunctionComponent<AuthorPageProps> = ({ params: { id } }) => {
  return <Author authorId={parseInt(id)} />;
};

export default AuthorPage;
