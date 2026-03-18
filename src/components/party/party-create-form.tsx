"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

import { createPartySchema, type CreatePartyInput } from "@/lib/validations/party";
import { createParty } from "@/lib/actions";
import {
  GAME_MODES,
  TIERS,
  MIN_PARTY_SIZE,
  MAX_PARTY_SIZE,
  DEFAULT_PARTY_SIZE,
} from "@/constants/game";

type TemplateField = {
  id: string;
  label: string;
  fieldType: string;
  placeholder: string | null;
  isRequired: boolean;
  options: unknown;
};

type Template = {
  id: string;
  name: string;
  description: string | null;
  fields: TemplateField[];
};

export function PartyCreateForm({ templates }: { templates: Template[] }) {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePartyInput>({
    resolver: zodResolver(createPartySchema),
    defaultValues: {
      title: "",
      description: "",
      mode: "FREE_FORM",
      gameMode: "",
      tier: "",
      maxMembers: DEFAULT_PARTY_SIZE,
      templateId: "",
      templateData: {},
    },
  });

  const mode = watch("mode");
  const selectedTemplateId = watch("templateId");
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  function onSubmit(data: CreatePartyInput) {
    setServerError(null);
    startTransition(async () => {
      const result = await createParty(data);
      if (result && !result.success) {
        setServerError(result.error ?? "알 수 없는 오류가 발생했습니다");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-lg border border-gaming-red/30 bg-gaming-red/10 p-3 text-sm text-gaming-red">
          {serverError}
        </div>
      )}

      {/* 모드 선택 */}
      <div className="space-y-2">
        <Label>파티 모드</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setValue("mode", "FREE_FORM")}
            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
              mode === "FREE_FORM"
                ? "border-gaming-purple bg-gaming-purple/20 text-gaming-purple-light"
                : "border-border bg-input/30 text-muted-foreground hover:border-gaming-purple/50"
            }`}
          >
            <div className="text-base">자유양식</div>
            <div className="mt-1 text-xs opacity-70">자유롭게 파티를 구성합니다</div>
          </button>
          <button
            type="button"
            onClick={() => setValue("mode", "TEMPLATE")}
            className={`flex-1 rounded-lg border px-4 py-3 text-sm font-medium transition-all ${
              mode === "TEMPLATE"
                ? "border-gaming-purple bg-gaming-purple/20 text-gaming-purple-light"
                : "border-border bg-input/30 text-muted-foreground hover:border-gaming-purple/50"
            }`}
          >
            <div className="text-base">템플릿</div>
            <div className="mt-1 text-xs opacity-70">정해진 양식으로 모집합니다</div>
          </button>
        </div>
      </div>

      {/* 템플릿 선택 (TEMPLATE 모드) */}
      {mode === "TEMPLATE" && (
        <div className="space-y-2">
          <Label htmlFor="templateId">템플릿 선택</Label>
          {templates.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              사용 가능한 템플릿이 없습니다. 관리자에게 문의하세요.
            </p>
          ) : (
            <Select
              id="templateId"
              {...register("templateId")}
              aria-invalid={!!errors.templateId}
            >
              <option value="">템플릿을 선택하세요</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </Select>
          )}
          {errors.templateId && (
            <p className="text-xs text-gaming-red">{errors.templateId.message}</p>
          )}
          {selectedTemplate?.description && (
            <p className="text-xs text-muted-foreground">{selectedTemplate.description}</p>
          )}
        </div>
      )}

      {/* 제목 */}
      <div className="space-y-2">
        <Label htmlFor="title">파티 제목 *</Label>
        <Input
          id="title"
          placeholder="파티 제목을 입력하세요"
          {...register("title")}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-xs text-gaming-red">{errors.title.message}</p>
        )}
      </div>

      {/* 설명 */}
      <div className="space-y-2">
        <Label htmlFor="description">설명</Label>
        <Textarea
          id="description"
          placeholder="파티에 대한 설명을 입력하세요 (선택)"
          rows={3}
          {...register("description")}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-xs text-gaming-red">{errors.description.message}</p>
        )}
      </div>

      {/* 게임모드 / 티어 / 인원 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="gameMode">게임 모드</Label>
          <Select id="gameMode" {...register("gameMode")}>
            <option value="">선택 안함</option>
            {GAME_MODES.map((gm) => (
              <option key={gm} value={gm}>
                {gm}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tier">티어</Label>
          <Select id="tier" {...register("tier")}>
            <option value="">선택 안함</option>
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxMembers">최대 인원</Label>
          <Input
            id="maxMembers"
            type="number"
            min={MIN_PARTY_SIZE}
            max={MAX_PARTY_SIZE}
            {...register("maxMembers")}
            aria-invalid={!!errors.maxMembers}
          />
          {errors.maxMembers && (
            <p className="text-xs text-gaming-red">{errors.maxMembers.message}</p>
          )}
        </div>
      </div>

      {/* 템플릿 동적 필드 */}
      {mode === "TEMPLATE" && selectedTemplate && selectedTemplate.fields.length > 0 && (
        <div className="space-y-4 rounded-lg border border-border p-4">
          <h3 className="text-sm font-semibold text-muted-foreground">
            템플릿 필드
          </h3>
          {selectedTemplate.fields.map((field) => (
            <TemplateFieldInput
              key={field.id}
              field={field}
              register={register}
            />
          ))}
        </div>
      )}

      {/* 제출 */}
      <div className="flex gap-3">
        <Button
          type="submit"
          size="lg"
          disabled={isPending}
          className="flex-1"
        >
          {isPending ? "생성 중..." : "파티 생성"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={() => router.back()}
        >
          취소
        </Button>
      </div>
    </form>
  );
}

function TemplateFieldInput({
  field,
  register,
}: {
  field: TemplateField;
  register: ReturnType<typeof useForm<CreatePartyInput>>["register"];
}) {
  const fieldName = `templateData.${field.id}` as const;
  const options = (field.options as string[] | null) ?? [];

  return (
    <div className="space-y-1">
      <Label>
        {field.label}
        {field.isRequired && <span className="ml-1 text-gaming-red">*</span>}
      </Label>
      {field.fieldType === "TEXT" && (
        <Input
          placeholder={field.placeholder ?? ""}
          {...register(fieldName)}
        />
      )}
      {field.fieldType === "TEXTAREA" && (
        <Textarea
          placeholder={field.placeholder ?? ""}
          rows={3}
          {...register(fieldName)}
        />
      )}
      {field.fieldType === "NUMBER" && (
        <Input
          type="number"
          placeholder={field.placeholder ?? ""}
          {...register(fieldName)}
        />
      )}
      {field.fieldType === "SELECT" && (
        <Select {...register(fieldName)}>
          <option value="">{field.placeholder ?? "선택하세요"}</option>
          {options.map((opt) => (
            <option key={String(opt)} value={String(opt)}>
              {String(opt)}
            </option>
          ))}
        </Select>
      )}
      {field.fieldType === "RADIO" && (
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => (
            <label key={String(opt)} className="flex items-center gap-1.5 text-sm">
              <input
                type="radio"
                value={String(opt)}
                {...register(fieldName)}
                className="accent-gaming-purple"
              />
              {String(opt)}
            </label>
          ))}
        </div>
      )}
      {field.fieldType === "CHECKBOX" && (
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            {...register(fieldName)}
            className="accent-gaming-purple"
          />
          {field.placeholder ?? field.label}
        </label>
      )}
      {field.fieldType === "DATE" && (
        <Input type="date" {...register(fieldName)} />
      )}
    </div>
  );
}
