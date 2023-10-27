"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Post, Prisma } from "@prisma/client";
import { addPost, editPost, removePost } from "@/app/actions/posts";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  post?: Post | null;
};

const formSchema = z.object({
  title: z
    .string({ required_error: "Гарчиг оруулна уу" })
    .max(50, "Гарчигийн урт 50 тэмдэгтээс хэтрэхгүй"),
  body: z.string({ required_error: "Агуулга оруулна уу" }),
});

const BlogForm = ({ post }: Props) => {
  const route = useRouter();
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post ? post.title : "",
      body: post ? post.body : "",
    },
  });

  useEffect(() => {
    if (infoMessage) {
      const timeout = setTimeout(() => {
        setInfoMessage(null);
      }, 1000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [infoMessage]);

  const { data: session } = useSession();

  if (!session) {
    return "Та нэвтэрнэ үү";
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (post) {
      editPost(post.id, values)
        .then(() => {
          setInfoMessage("Амжилттай");
        })
        .catch(() => {
          setInfoMessage("Амжилтгүй");
        });
    } else {
      addPost({ ...values, userId: parseInt(session?.user.id) })
        .then(({ post }) => {
          setInfoMessage("Амжилттай");
          route.push(`/post/edit/${post?.id}`);
        })
        .catch(() => {
          setInfoMessage("Амжилтгүй");
        });
    }
  };

  const onDelete = () => {
    if (post) {
      if (confirm("Та устгахдаа итгэлтэй байна уу?")) {
        removePost(post?.id)
          .then(() => {
            route.push("/profile");
          })
          .catch(() => setInfoMessage("Алдаа гарлаа"));
      }
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-500 dark:text-gray-500 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-5">
        {post ? "Блог засах" : "Блог бичих"}
      </h1>
      {infoMessage && (
        <div className="text-md my-4 text-sky-400">{infoMessage}</div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Гарчиг</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Гарчиг ойлгомжтой байх хэрэгтэй
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Агуулга</FormLabel>
                <FormControl>
                  <Textarea {...field} className="h-96" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {post && (
              <Button
                type="button"
                className="float-left"
                variant={"destructive"}
                onClick={onDelete}
              >
                Устгах
              </Button>
            )}
            <Button type="submit" className="float-right">
              Хадгалах
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
