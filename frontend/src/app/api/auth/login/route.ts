import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'staynest-secret-key-2026';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Demo Accounts Login Verification
    let userRole = 'Guest';
    let userName = 'Rahul';
    let userId = 'user-guest-01';

    if (email.toLowerCase().includes('host') || email.toLowerCase().includes('rahul')) {
      userRole = 'Host';
      userName = 'Rahul';
      userId = 'user-host-01';
    } else if (email.toLowerCase().includes('admin')) {
      userRole = 'Admin';
      userName = 'Admin User';
      userId = 'user-admin-01';
    }

    // Sign JWT token
    const token = jwt.sign(
      { userId, email, role: userRole },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: userId,
        name: userName,
        email,
        role: userRole
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Authentication failed' },
      { status: 500 }
    );
  }
}
