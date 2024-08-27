import prisma from "@/prisma/client";

export const getIssueByID = async (id: number) => {
  if (Number.isNaN(id)) {
    return null;
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });
  if (!issue) {
    return null;
  }
  return issue;
};

export const getIssues = async () => {
  const issues = await prisma.issue.findMany();
  return issues;
};
