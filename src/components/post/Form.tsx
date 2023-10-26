"use client";
import React from "react";
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

type Props = {
  id?: string;
};

const formSchema = z.object({
  title: z
    .string({ required_error: "Гарчиг оруулна уу" })
    .max(50, "Гарчигийн урт 50 тэмдэгтээс хэтрэхгүй"),
  content: z.string({ required_error: "Агуулга оруулна уу" }),
});

const BlogForm = ({ id }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("values", values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold leading-9 tracking-tight text-gray-500 dark:text-gray-500 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 mb-5">
        {id ? "Блог засах" : "Блог бичих"}
      </h1>
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
            name="content"
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
          <Button type="submit" className="float-right">
            Хадгалах
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
