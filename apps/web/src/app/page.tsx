"use client";

import { DsButton, DsTypography,DsBox } from "@crypto/ui";

import { useHealth } from "~/features/health/hooks";

export default function Home() {
  const { health, isLoading, isError, refetch } = useHealth();

  return (
    <DsBox className="flex flex-1 flex-col items-center justify-center gap-4 px-6 font-sans">
      <DsTypography as="h1" color="info">
        Crypto Vision
      </DsTypography>
      <DsTypography color="black" variant="body">
        {isLoading && "در حال دریافت وضعیت API…"}
        {!isLoading && isError && "خطا در ارتباط با API"}
        {!isLoading && !isError && health
          ? `API: ${health.service} — ${health.status}`
          : null}
      </DsTypography>
      <DsButton color="blue" onClick={() => void refetch()}>
        تازه‌سازی
      </DsButton>
    </DsBox>
  );
}
