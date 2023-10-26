import React from "react";
import { User as TUser } from "@/types";
import Post from "@/components/post/Post";
import { Post as TPost } from "@prisma/client";
import { getPosts } from "@/lib/prisma/posts";

type Props = {
  authorId: number;
};

const Author = async ({ authorId }: Props) => {
  const user: TUser = await fetch(
    `https://jsonplaceholder.typicode.com/users/${authorId}`
  ).then((res) => res.json());

  const { posts = [] } = await getPosts({
    where: { userId: authorId },
    take: 10,
  });

  // const posts: TPost[] = await fetch(
  //   `https://jsonplaceholder.typicode.com/posts/?userId=${authorId}`
  // ).then((res) => res.json());

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {user.name}
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {user.username}
        </p>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {!posts.length && "No posts found."}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default Author;
