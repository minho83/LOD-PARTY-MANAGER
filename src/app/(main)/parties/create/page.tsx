import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getActiveTemplates } from "@/lib/actions";
import { ROUTES } from "@/constants/routes";
import { PartyCreateForm } from "@/components/party/party-create-form";

export default async function PartyCreatePage() {
  const session = await auth();
  if (!session?.user) {
    redirect(ROUTES.LOGIN);
  }

  const templates = await getActiveTemplates();

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">파티 생성</h1>
        <p className="mt-1 text-muted-foreground">
          새로운 파티를 만들어 멤버를 모집하세요.
        </p>
      </div>

      <div className="glass-card rounded-xl p-6">
        <PartyCreateForm templates={templates} />
      </div>
    </div>
  );
}
