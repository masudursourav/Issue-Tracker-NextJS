import { z } from "zod";

export const IssueCreationSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title must be at most 255 characters long" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type IssueType = z.infer<typeof IssueCreationSchema>;
