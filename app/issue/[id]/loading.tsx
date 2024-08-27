import { Badge } from "@/components/ui/badge";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
export default function IssueDetailsPageLoading() {
  return (
    <div>
      <Heading>
        <Skeleton width={200} />
      </Heading>
      <Flex gap={"2"} my={"2"}>
        <Badge variant="default">
          <Skeleton />
        </Badge>
        <Text>
          <Skeleton />
        </Text>
      </Flex>
      <Card className="prose">
        <Skeleton />
      </Card>
    </div>
  );
}
