import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please signup first",
        },
        { status: 400 },
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password incorrect",
        },
        { status: 400 },
      );
    }

    // Create token payload
    const payload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    // Generate JWT
    const token = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    // Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 },
    );

    // Store JWT in an HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60,
    });

    return response;
  } catch (err: unknown) {
    return NextResponse.json(
      {
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 },
    );
  }
}
