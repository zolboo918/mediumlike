import Pagination from "@/components/common/Pagination";
import Post from "@/components/post/Post";
import SearchForm from "@/components/post/SearchForm";
import { getPosts } from "@/lib/prisma/posts";
import React from "react";

const POST_PER_PAGE = 20;

type Props = {
  searchParams: {
    page?: string;
    searchValue?: string;
  };
};

const Posts = async ({ searchParams }: Props) => {
  const page = parseInt(searchParams.page || "1");
  const skip =
    parseInt(searchParams.page || "1") * POST_PER_PAGE - POST_PER_PAGE;

  const searchValue = searchParams.searchValue;

  const {
    posts = [],
    error,
    count,
  } = await getPosts({
    take: POST_PER_PAGE,
    skip,
    where: {
      published: true,
      OR: [
        { title: { contains: searchValue, mode: "insensitive" } },
        { description: { contains: searchValue, mode: "insensitive" } },
      ],
    },
  });
  const total = count || 0;
  const totalPage = Math.floor(total / POST_PER_PAGE);

  if (error) {
    throw error;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-600 dark:text-gray-600 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Бүх постууд
        </h1>
        <SearchForm searchValue={searchValue} />
      </div>
      <ul>
        {!posts.length && <div className="py-4">Пост олдсонгүй.</div>}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
      <Pagination totalPages={totalPage} currentPage={page} />
    </div>
  );
};

export default Posts;
