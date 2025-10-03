import { NextRequest } from "next/server";
import connect from "@/lib/mongo/client";
import { User } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await (await connect()).collection<User>("users").findOne({
    email,
    password,
  });

  return new Response(
    JSON.stringify({
      result: !!user,
    }),
    {
      headers: {
        "Content-Type": "application-json",
      },
    }
  );
}
