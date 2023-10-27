import { Post as TPost } from "@prisma/client";
import Link from "next/link";
import { FunctionComponent } from "react";
import Tag from "@/components/Tag";
import { Button } from "@/components/ui/button";

interface ItemProps {
  post: TPost;
  isEditable?: boolean;
}

const Item: FunctionComponent<ItemProps> = ({ post, isEditable }) => {
  const { id, title, body } = post;

  return (
    <li key={id} className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={"2000-01-01"}>2000-01-01</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link
                    href={`/post/${id}`}
                    className="text-gray-900 dark:text-gray-500"
                  >
                    {title}
                  </Link>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {body}
              </div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/post/${id}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Read more &rarr;
              </Link>
            </div>
            <div>
              {isEditable && (
                <Button>
                  <Link href={`/post/edit/${post.id}`}>Засах</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};

export default Item;
