import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import FormProfile from "./components/FormProfile/FormProfile";

export default async function page() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/");
  }

  const userDb = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!userDb) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-2xl mb-2">Detalles de la cuenta</h1>

      <FormProfile user={userDb} />
    </div>
  );
}
