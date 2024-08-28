import { getIssueByID } from "@/lib/ServerActions/getIssue";
import { notFound } from "next/navigation";
import IssueForm from "../../_components/IssueForm";

interface Props {
  params: { id: string };
}
export default async function EditIssue({ params }: Props) {
  const id = Number(params.id);
  const issue = await getIssueByID(id);
  if (!issue) {
    notFound();
  }
  return <IssueForm issue={issue} />;
}
