import { Table } from '@radix-ui/themes'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IssueActions from './IssueActions'

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5]

  return (
    <div>
        <IssueActions/>
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
            <Table.Row key={issue} className="border-b border-gray-700">
              <Table.Cell className="p-2 md:p-3 truncate max-w-[200px]">
                <Skeleton height={20} />
              </Table.Cell>
              <Table.Cell className="p-2 md:p-3">
                <Skeleton width={80} height={24} />
              </Table.Cell>
              <Table.Cell className="p-2 md:p-3 whitespace-nowrap">
                <Skeleton width={100} height={20} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default LoadingIssuePage
