import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getIssueByID } from "@/lib/ServerActions/getIssue";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Edit } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
interface Props {
  params: { id: string };
}
export default async function IssueDetailsPage({ params }: Props) {
  const id = Number(params.id);
  const issue = await getIssueByID(id);
  if (!issue) {
    return notFound();
  }
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"2"}>
      <Box>
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
      </Box>
      <Box>
        <Button variant="default">
          <Edit className="mr-1" /> Edit Issue
        </Button>
      </Box>
    </Grid>
  );
}
