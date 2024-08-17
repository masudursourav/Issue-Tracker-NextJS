"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loadingButton";
import { useToast } from "@/components/ui/use-toast";
import {
  IssueCreationSchema,
  IssueType,
} from "@/lib/schema/issueCreationSchema";
import { postIssue } from "@/lib/ServerActions/postNewIssue";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

export default function Page() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<IssueType>({
    resolver: zodResolver(IssueCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "all",
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = form;

  function onSubmit(values: IssueType) {
    const postTheIssue = async () => {
      setIsSubmitting(true);
      const response = await postIssue(values);
      if (response === 201) {
        reset();
        toast({
          title: "Issue Created",
          description: "Your issue has been created successfully",
        });
        setIsSubmitting(false);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
        setIsSubmitting(false);
      }
    };
    postTheIssue();
  }
  const title = watch("title");
  const description = watch("description");
  return (
    <div className="flex flex-col justify-center items-center">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[800px]">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter Issue Title"
                    className="w-full"
                  />
                </FormControl>
                <FormDescription>This is your public title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMDE
                    {...field}
                    placeholder="Enter Issue Description"
                    className="w-full"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <LoadingButton
            type="submit"
            variant="default"
            size="default"
            loading={isSubmitting}
            disabled={
              Object.keys(errors || {}).length > 0 ||
              isSubmitting ||
              title === "" ||
              description === ""
            }
          >
            Submit New Issue
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
