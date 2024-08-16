"use client";
import { Button } from "@/components/ui/button";
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
import { useToast } from "@/components/ui/use-toast";
import {
  IssueCreationSchema,
  IssueType,
} from "@/lib/schema/issueCreationSchema";
import { postIssue } from "@/lib/ServerActions/postNewIssue";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

export default function Page() {
  const { toast } = useToast();
  const form = useForm<IssueType>({
    resolver: zodResolver(IssueCreationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "all",
  });
  const { control, handleSubmit } = form;

  function onSubmit(values: IssueType) {
    const postTheIssue = async () => {
      const response = await postIssue(values);
      if (response === 201) {
        toast({
          title: "Issue Created",
          description: "Your issue has been created successfully",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    };
    postTheIssue();
  }
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
