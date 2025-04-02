import React from "react";
import Link from "next/link";
import { Card, Button, Heading, Flex } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6 flex flex-col items-center">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-500">TrackSphere Dashboard</h1>
        <p className="text-gray-300 mt-2 text-lg">Manage your project issues, track progress, and collaborate seamlessly.</p>
        <p className="text-red-400 font-semibold mt-2">Currently in Alpha - Expect frequent updates</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-green-400 text-2xl">📊</div>
            <Heading size="4" className="text-blue-950">Issue Management</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Create, update, and track issues seamlessly. Assign statuses, add descriptions, and keep your workflow organized.</p>
          </div>
        </Card>

        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-blue-400 text-2xl">📝</div>
            <Heading size="4" className="text-blue-950">Markdown Support</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Use a built-in Markdown editor for detailed issue descriptions, documentation, and formatting flexibility.</p>
          </div>
        </Card>

        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-purple-400 text-2xl">👥</div>
            <Heading size="4" className="text-blue-950">Team Collaboration</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Assign issues to team members, track contributions, and improve collaboration across projects.</p>
          </div>
        </Card>

        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-yellow-400 text-2xl">✅</div>
            <Heading size="4" className="text-blue-950">Status Tracking</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Track issue statuses in real-time with categories like Open, In Progress, and Closed.</p>
          </div>
        </Card>

        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-red-400 text-2xl">⏰</div>
            <Heading size="4" className="text-blue-950">Deadline Management</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Stay on top of deadlines with automated reminders and progress tracking.</p>
          </div>
        </Card>

        <Card>
          <Flex gap="4" align="center" className="p-4">
            <div className="text-gray-400 text-2xl">🔒</div>
            <Heading size="4" className="text-blue-950">Security & Permissions</Heading>
          </Flex>
          <div className="p-4 text-blue-700">
            <p>Control access to issues and project data with role-based permissions.</p>
          </div>
        </Card>
      </div>
      
      <div className="mt-12 flex gap-4">
        <Button asChild>
          <Link href="/issues">View Issues</Link>
        </Button>
      </div>
    </div>
  );
}