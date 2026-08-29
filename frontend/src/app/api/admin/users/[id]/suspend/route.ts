import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  return NextResponse.json({
    success: true,
    message: `User ${userId} status updated successfully`,
    userId
  });
}
