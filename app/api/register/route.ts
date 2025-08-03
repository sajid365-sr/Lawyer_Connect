import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { clientSignupSchema } from "@/lib/validations/client";
import { lawyerSignupSchema } from "@/lib/validations/lawyer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, ...userData } = body;

    // Validate input based on role
    let validatedData;
    if (role === "LAWYER") {
      validatedData = lawyerSignupSchema.parse(userData);
    } else {
      validatedData = clientSignupSchema.parse(userData);
    }

    const { name, email, password } = validatedData;

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Prepare user data
    const createUserData: any = {
      name,
      email,
      password: hashedPassword,
      role: role || "CLIENT",
    };

    // Add lawyer-specific fields if role is LAWYER
    if (role === "LAWYER" && "barRegistration" in validatedData) {
      createUserData.barNumber = (validatedData as any).barRegistration;
      createUserData.district = (validatedData as any).district;
      createUserData.experience = (validatedData as any).experience;
    }

    // Create user
    const user = await prisma.user.create({
      data: createUserData,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { 
        message: "User created successfully",
        user: userWithoutPassword
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    
    // Handle validation errors
    if (error.name === "ZodError") {
      return NextResponse.json(
        { 
          message: "Validation error",
          errors: error.errors
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}