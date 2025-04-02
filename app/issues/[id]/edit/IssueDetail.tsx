"use client";

import { useRouter } from "next/navigation";
import {
  AlertDialog,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import axios from "axios";
import { Issue } from "@prisma/client";
import { useSession } from "next-auth/react";
import AssigneeSelect from "../AssigneeSelect";

export default function IssueDetail({ issue }: { issue: Issue }) {
  const router = useRouter();

  const { status } = useSession();

  return (
    <div className="p-4 md:p-6 bg-gray-700 min-h-screen text-white flex flex-col items-center">
      <div className="max-w-3xl space-y-6">
        {/* Title */}
        <Heading
          as="h1"
          className="text-4xl font-bold text-purple-300 mb-8 text-center"
        >
          {issue.title}
        </Heading>

        {/* Edit + Delete Buttons */}
        <div className="flex justify-between items-center w-full mt-4">
          {/* Edit Button */}
          <Button>
            <Link href={`/issues/${issue.id}/edit`}>📝 Edit Issue</Link>
          </Button>

          <AssigneeSelect issue={issue} />

          {/* Delete Button with Alert Dialog */}
          <AlertDialog.Root>
            <AlertDialog.Trigger>
              <Button
                color="red"
                disabled={status !== "authenticated"}
                className={`${
                  status !== "authenticated"
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Delete Issue
              </Button>
            </AlertDialog.Trigger>

            <AlertDialog.Content>
              <AlertDialog.Title>
                Are you sure you want to delete this issue?
              </AlertDialog.Title>
              <AlertDialog.Description>
                This action is irreversible and will permanently delete the
                item, with no option for recovery.
              </AlertDialog.Description>

              <Flex className="mt-4 flex justify-between gap-5">
                {/* Cancel */}
                <AlertDialog.Cancel>
                  <Button color="purple" className="px-4 py-2 rounded-md">
                    Cancel
                  </Button>
                </AlertDialog.Cancel>

                {/* Confirm Delete */}
                <AlertDialog.Action>
                  <Button
                    color="red"
                    className="px-4 py-2 rounded-md"
                    onClick={async () => {
                      await axios.delete(`/api/issues/${issue.id}`);
                      router.push("/issues");
                      router.refresh();
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialog.Action>
              </Flex>
            </AlertDialog.Content>
          </AlertDialog.Root>
        </div>

        {/* Description */}
        <Card className="bg-gray-600 p-6 border border-gray-600 rounded-lg prose">
          <div className="text-gray-900 whitespace-pre-line">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </div>
        </Card>

        {/* Status and Created Date */}
        <Flex gap="4" className="mt-6 items-center">
          <div className="bg-gray-800 px-5 py-3 rounded-lg border border-purple-500/30">
            <Text className="text-purple-300 font-medium">Status: </Text>
            <Text className="text-white ml-2">{issue.status}</Text>
          </div>

          <div className="bg-gray-800 px-5 py-3 rounded-lg border border-purple-500/30">
            <Text className="text-purple-300 font-medium">Created: </Text>
            <Text className="text-gray-300 ml-2">
              {issue.createdAt.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </div>
        </Flex>
      </div>
    </div>
  );
}
