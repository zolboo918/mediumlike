import Post from "@/components/post/Post";
import { getPosts } from "@/lib/prisma/posts";
import { DefaultUser } from "next-auth";
import { Button } from "./ui/button";

type Props = {
  author: DefaultUser;
  isEditable?: boolean;
};

const Author = async ({
  author: { name, email, id, image },
  isEditable,
}: Props) => {
  const { posts = [] } = await getPosts({
    where: { userId: parseInt(id) },
    take: 10,
  });

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {name}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {email}
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && "No posts found."}
        {posts.map((post) => (
          <Post key={post.id} post={post} isEditable={isEditable} />
        ))}
      </ul>
    </div>
  );
};

export default Author;
