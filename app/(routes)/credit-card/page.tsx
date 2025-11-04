import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import DataTableItems from "@/components/Shared/DataTableItems/DataTableItems";

export default async function CreditCardPage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      elements: {
        where: {
          typeElement: "Tarjeta",
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user || !user.elements) {
    redirect("/");
  }

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-semibold">
        Lista de Tarjetas de Credito
      </h1>
      <DataTableItems elements={user.elements} />
    </div>
  );
}
