import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const body = await request.json();

    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ errors: validation.error.errors }, { status: 400 });
    }

    if (body.assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: body.assignedToUserId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    }

    const issueId = Number(params.id);
    if (isNaN(issueId)) {
        return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: { id: issueId },
        data: {
            ...(body.title !== undefined && { title: body.title }),
            ...(body.description !== undefined && { description: body.description }),
            ...(body.assignedToUserId !== undefined && { assignedToUserId: body.assignedToUserId ?? null }),
        },
    });

    return NextResponse.json(updatedIssue);
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const issueId = Number(params.id);
    if (isNaN(issueId)) {
        return NextResponse.json({ error: "Invalid issue ID" }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: issueId },
    });

    if (!issue) {
        return NextResponse.json({ error: "Issue not found" }, { status: 404 });
    }

    await prisma.issue.delete({
        where: { id: issueId },
    });

    return NextResponse.json({ message: "Issue deleted successfully" });
}
