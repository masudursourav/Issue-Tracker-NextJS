import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}
export default async function IssueDetails({ params }: Props) {
  console.log("Received params:", params);

  if (typeof params.id !== "string" && typeof params.id !== "number") {
    console.log("Invalid ID type:", typeof params.id);
    notFound();
  }

  const id = Number(params.id);

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
  if (!issue) {
    notFound();
  }

  return (
    <div>
      <h1>{issue.title}</h1>
      <p>{issue.description}</p>
    </div>
  );
}
