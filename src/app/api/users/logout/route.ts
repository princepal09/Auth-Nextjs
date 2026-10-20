import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
        message : "Logged out successfully",
        success : true
    })

    response.cookies.set("token", "",
        {
            httpOnly:true, expires : new Date(0)
        }
    )

    return response

  } catch (error:any) {
      console.log(error.message)
    return NextResponse.json({
       message : error.message,
       success : false,
       status : 500
    })
  }
}
