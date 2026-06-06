import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    code: "<div class='p-10 text-center'><h1 class='text-4xl text-green-500 font-bold'>API CONNECTION SUCCESSFUL. THE ENGINE IS ALIVE.</h1></div>"
  });
}
