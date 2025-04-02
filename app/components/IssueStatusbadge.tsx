import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

const IssueStatusBadge = ({ status }: { status: Status }) => {
  let badgeColor: "red" | "yellow" | "green" | "gray" = "gray"; // Default

  if (status === "OPEN") badgeColor = "green";
  else if (status === "IN_PROGRESS") badgeColor = "yellow";
  else if (status === "CLOSED") badgeColor = "red";

  return (
    <div className="inline-block">
      <Badge color={badgeColor} className="px-3 py-1 rounded-md text-sm font-semibold">
        {status.replace("_", " ")}
      </Badge>
    </div>
  );
}

export default IssueStatusBadge;
