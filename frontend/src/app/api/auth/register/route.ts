import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'staynest-secret-key-2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `user-${Date.now()}`;
    const userRole = role === 'Host' ? 'Host' : 'Guest';

    // Sign JWT token
    const token = jwt.sign(
      { userId, email, role: userRole },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: userId,
        name,
        email,
        role: userRole
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
