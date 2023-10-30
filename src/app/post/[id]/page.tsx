import { getPostById, getPosts } from "@/lib/prisma/posts";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: Props) {
  const { post } = await getPostById(id);
  return {
    title: post?.title,
    description: post?.body,
  };
}

export async function generateStaticParams() {
  const { posts } = await getPosts({ take: 100 });
  return posts
    ? posts.map((item: any) => {
        id: item.id.toString();
      })
    : [];
}

async function Page({ params: { id } }: Props) {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const { post } = await getPostById(id);

  return (
    <div>
      <h1 className="text-2xl uppercase pb-2">{post?.title}</h1>
      <h2 className="">{post?.description}</h2>
      {/* <article>{post?.body}</article> */}
      <Markdown>{post?.body}</Markdown>
    </div>
  );
}

export default Page;
