import { FunctionComponent } from "react";
import Author from "@/components/Author";
import { getUserById } from "@/lib/prisma/user";
import { notFound } from "next/navigation";

interface AuthorPageProps {
  params: {
    id: string;
  };
}

const AuthorPage: FunctionComponent<AuthorPageProps> = async ({
  params: { id },
}) => {
  const { user, error } = await getUserById(id);

  if (error) {
    throw new Error("Хэрэглэгчийн мэдээллийг дуудах үед алдаа гарлаа");
  }

  if (!user) {
    notFound();
  }

  return <Author author={user} isEditable={false} />;
};

export default AuthorPage;
