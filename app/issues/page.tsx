import React from 'react'
import { Table } from '@radix-ui/themes'
import prisma from '@/prisma/client'
import IssueStatusBadge from '../components/IssueStatusbadge'
import IssueActions from './IssueActions'
import Link from 'next/link'
import { Status } from '@prisma/client'

const IssuesPage = async ({ searchParams }: { searchParams: { status: Status } }) => {
  console.log("searchParams", searchParams.status); // i am getting undefined here
  
  const issues = await prisma.issue.findMany({
    where: 
    {status: searchParams.status }
  });

  return (
    <div className="p-4 md:p-6 bg-gray-700 min-h-screen text-white flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="overflow-x-auto">
          <IssueActions />
          <Table.Root variant="surface" className="w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md mb-6 md:mt-11">
            <Table.Header className="bg-purple-800 text-white">
              <Table.Row>
                <Table.ColumnHeaderCell className="p-2 md:p-3">Issues</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="p-2 md:p-3">Status</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell className="p-2 md:p-3">Created</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {issues.map((issue) => (
                <Table.Row key={issue.id} className="border-b border-gray-700">
                  <Table.Cell className="p-2 md:p-3 truncate max-w-[150px] md:max-w-none">
                    <Link 
                      href={`/issues/${issue.id}`} 
                      className="text-purple-950 hover:text-purple-500 font-semibold transition duration-200 underline underline-offset-2">
                      {issue.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3">
                    <IssueStatusBadge status={issue.status} />
                  </Table.Cell>
                  <Table.Cell className="p-2 md:p-3 whitespace-nowrap">
                    {issue.createdAt.toLocaleDateString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default IssuesPage;
