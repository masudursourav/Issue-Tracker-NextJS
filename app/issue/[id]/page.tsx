import { Badge } from "@/components/ui/badge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
interface Props {
  params: { id: string };
}
export default async function IssueDetailsPage({ params }: Props) {
  if (Number.isNaN(Number(params.id))) {
    notFound();
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!issue) {
    notFound();
  }
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap={"2"} my={"2"}>
        <Badge
          variant={
            issue.status === "OPEN"
              ? "destructive"
              : issue.status === "IN_PROGRESS"
              ? "secondary"
              : "default"
          }
        >
          {issue.status}
        </Badge>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
}
