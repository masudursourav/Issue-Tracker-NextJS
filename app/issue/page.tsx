import { Badge } from "@/components/ui/badge";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueActions from "./IssueActions";

export default async function IssuePage() {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <IssueActions />
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell className="hidden md:table-cell">
                Created At
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((issue) => (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Link href={`/issue/${issue.id}`}>{issue.title}</Link>
                  <div className="block mt-2 md:hidden">
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
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
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
                </Table.Cell>
                <Table.Cell className="hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
}
