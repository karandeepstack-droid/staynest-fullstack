import { NextResponse } from 'next/server';

const userWishlists: Record<string, string[]> = {
  'user-guest-01': ['stay-001']
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { propertyId, userId = 'user-guest-01' } = body;

    if (!propertyId) {
      return NextResponse.json(
        { success: false, message: 'Property ID is required' },
        { status: 400 }
      );
    }

    if (!userWishlists[userId]) userWishlists[userId] = [];

    const isSaved = userWishlists[userId].includes(propertyId);
    if (isSaved) {
      userWishlists[userId] = userWishlists[userId].filter(id => id !== propertyId);
    } else {
      userWishlists[userId].push(propertyId);
    }

    const nowSaved = userWishlists[userId].includes(propertyId);

    return NextResponse.json({
      success: true,
      message: nowSaved ? 'Saved to wishlist ❤️' : 'Removed from wishlist',
      isSaved: nowSaved,
      wishlist: userWishlists[userId]
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Wishlist update failed' },
      { status: 500 }
    );
  }
}
