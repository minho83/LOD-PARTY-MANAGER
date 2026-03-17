export default function PartyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">파티 상세</h1>
      <p className="text-muted-foreground">파티 상세 정보가 여기에 표시됩니다.</p>
    </div>
  );
}
