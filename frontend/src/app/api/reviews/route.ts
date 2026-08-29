import { NextResponse } from 'next/server';

const reviewsStore = [
  {
    id: 'rev-01',
    propertyId: 'stay-001',
    guestName: 'Amit Sharma',
    rating: 5,
    comment: 'The villa was absolutely stunning! Clean infinity pool and sunset ocean views.',
    createdAt: '2026-08-15T10:00:00.000Z'
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, rating, comment, guestName } = body;

    if (!propertyId || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: 'Property ID, rating, and comment are required' },
        { status: 400 }
      );
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      propertyId,
      guestName: guestName || 'Guest User',
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };

    reviewsStore.unshift(newReview);

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully',
      review: newReview
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Review submission failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');

  const filtered = propertyId
    ? reviewsStore.filter(r => r.propertyId === propertyId)
    : reviewsStore;

  return NextResponse.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
}
