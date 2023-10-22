"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  content: z.string().min(1),
});

interface ChatItemEditProps {
  content: string;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  socketUrl: string;
  id: string;
  socketQuery: Record<string, string>;
}

export const ChatItemEdit = ({
  content,
  setIsEditing,
  socketUrl,
  id,
  socketQuery,
}: ChatItemEditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content, form]);

  return (
    <Form {...form}>
      <form
        className="flex items-center w-full gap-x-2 pt-2"
        onSubmit={form.handleSubmit(onFormSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    disabled={isLoading}
                    placeholder="Edited message"
                    className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="sm" variant="primary" disabled={isLoading}>
          Save
        </Button>
      </form>
      <span className="text-[10px] mt-1 text-zinc-400">
        Press escape to cancel, enter to save
      </span>
    </Form>
  );
};
