// (server component)
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import IssueDetail from './edit/IssueDetail'

interface Props {
  params: { id: string }
}

export default async function IssueDetailPage({ params }: Props) {
  const issueId = Number(params.id);

  if (isNaN(issueId)) return notFound(); // Handle invalid IDs

  const issue = await prisma.issue.findUnique({
    where: { id: issueId },
  });

  if (!issue) return notFound();

  return <IssueDetail issue={issue} />;
}
