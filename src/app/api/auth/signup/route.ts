import { NextRequest } from "next/server";
import connect from "@/lib/mongo/client";
import { UserWithPassword } from "@/lib/types";
import { encrypt } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { name, surname, email, password } = await req.json();

  const db = await connect();
  await db?.collection<UserWithPassword>("users").insertOne({
    name,
    surname,
    email,
    password: encrypt(password),
  });

  revalidatePath("/login");

  return new Response(
    JSON.stringify({
      result: true,
    }),
    {
      headers: {
        "Content-Type": "application-json",
      },
    }
  );
}
