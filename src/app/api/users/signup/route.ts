import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { error } from "console";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password, username } = reqBody;

    console.log(reqBody);

    //Check if user already exists

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        status: 400,
        message: "User Already exists",
      });
    }

    // hash salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      success: true,
      status: 201,
      message: "User Created Successfully",
      data: savedUser,
    });
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      error: err.message,
    });
  }
}
