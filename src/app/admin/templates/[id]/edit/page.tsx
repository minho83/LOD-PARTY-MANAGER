export default function AdminTemplateEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">템플릿 수정</h1>
      <p className="text-muted-foreground">양식 템플릿을 수정합니다.</p>
    </div>
  );
}
