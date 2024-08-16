import { IssueType } from "../schema/issueCreationSchema";

export async function postIssue(values: IssueType) {
  const response = await fetch("/api/issues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: values.title,
      description: values.description,
    }),
  });
  return response.status;
}
