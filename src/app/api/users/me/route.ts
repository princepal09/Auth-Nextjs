import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model";

await connect();
export async function GET(req: NextRequest) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findById({
      _id: userId,
    }).select("-password");

    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 400 },
    );
  }
}
