import { NextRequest, NextResponse } from 'next/server';
import { withAuth, AuthenticatedRequest } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const profileUpdateSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  profileImage: z.string().optional(),
  bio: z.string().optional(),
  // Lawyer-specific fields
  barNumber: z.string().optional(),
  district: z.string().optional(),
  experience: z.string().optional(),
  specializations: z.array(z.string()).optional(),
  education: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  consultationFee: z.number().optional(),
  availability: z.string().optional(),
});

async function handler(req: AuthenticatedRequest) {
  try {
    if (!req.user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (req.method === 'GET') {
      // Get user profile
      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          address: true,
          city: true,
          country: true,
          profileImage: true,
          bio: true,
          barNumber: true,
          district: true,
          experience: true,
          specializations: true,
          education: true,
          certifications: true,
          languages: true,
          consultationFee: true,
          availability: true,
          profileCompleted: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ user });
    }

    if (req.method === 'PUT') {
      // Update user profile
      const body = await req.json();
      const validatedData = profileUpdateSchema.parse(body);

      // Check if profile is being completed
      const isProfileComplete = checkProfileCompletion(validatedData, req.user.role);

      const updatedUser = await prisma.user.update({
        where: { id: req.user.userId },
        data: {
          ...validatedData,
          profileCompleted: isProfileComplete,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          address: true,
          city: true,
          country: true,
          profileImage: true,
          bio: true,
          barNumber: true,
          district: true,
          experience: true,
          specializations: true,
          education: true,
          certifications: true,
          languages: true,
          consultationFee: true,
          availability: true,
          profileCompleted: true,
          updatedAt: true,
        },
      });

      return NextResponse.json({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    }

    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error: any) {
    console.error('Profile API error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Profile operation failed' },
      { status: 500 }
    );
  }
}

function checkProfileCompletion(data: any, role: string): boolean {
  const requiredFields = ['name', 'phone', 'address', 'city'];
  
  if (role === 'LAWYER') {
    requiredFields.push('barNumber', 'district', 'experience', 'specializations', 'education');
  }

  return requiredFields.every(field => {
    const value = data[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value && value.trim().length > 0;
  });
}

export const GET = withAuth(handler);
export const PUT = withAuth(handler);