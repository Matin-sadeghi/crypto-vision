import { DsBox } from '../Box';
import { DsSkeleton } from '../Skeleton';

function SidebarSectionSkeleton({ items = 3 }: { items?: number }) {
  return (
    <DsBox className="space-y-3">
      <DsSkeleton variant="text" width="40%" />
      <DsBox className="space-y-2">
        {Array.from({ length: items }).map((_, index) => (
          <DsBox key={index} className="flex items-center gap-3 p-2">
            <DsSkeleton variant="circle" className="size-5 shrink-0" />
            <DsSkeleton variant="text" width="70%" />
          </DsBox>
        ))}
      </DsBox>
    </DsBox>
  );
}

function SidebarSkeleton() {
  return (
    <DsBox className="flex grow flex-col gap-y-6 overflow-y-auto px-6 pb-4">
      <DsBox
        borderColor="border"
        className="-mx-6 flex h-16 shrink-0 items-center gap-x-2 border-b px-6"
      >
        <DsSkeleton width={40} height={40} className="rounded-lg" />
        <DsSkeleton variant="text" width={120} />
      </DsBox>

      <SidebarSectionSkeleton items={3} />
      <SidebarSectionSkeleton items={3} />
      <SidebarSectionSkeleton items={3} />
    </DsBox>
  );
}

function HeaderSkeleton() {
  return (
    <DsBox
      borderColor="border"
      className="flex h-16 shrink-0 items-center justify-end border-b px-8"
    >
      <DsBox className="flex items-center gap-3">
        <DsSkeleton variant="circle" className="size-8" />
        <DsBox className="space-y-2">
          <DsSkeleton variant="text" width={110} />
          <DsSkeleton variant="text" width={70} />
        </DsBox>
      </DsBox>
    </DsBox>
  );
}

function ContentSkeleton() {
  return (
    <DsBox className="space-y-6">
      <DsBox className="space-y-2">
        <DsSkeleton width={220} height={28} />
        <DsSkeleton variant="text" width={320} />
      </DsBox>

      <DsBox className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <DsSkeleton key={index} height={110} className="rounded-2xl" />
        ))}
      </DsBox>

      <DsSkeleton height={360} className="rounded-2xl" />
    </DsBox>
  );
}

type DsAppLayoutSkeletonProps = {
  showContent?: boolean;
};

export const DsAppLayoutSkeleton = ({ showContent = true }: DsAppLayoutSkeletonProps) => {
  return (
    <DsBox>
      <DsBox
        bg="background"
        borderColor="border"
        className="fixed inset-y-0 z-50 flex w-72 flex-col border-r"
      >
        <SidebarSkeleton />
      </DsBox>

      <DsBox bg="background" className="flex min-h-screen flex-col pl-72">
        <HeaderSkeleton />

        <DsBox className="flex-1 py-10">
          <DsBox className="h-full px-8">{showContent ? <ContentSkeleton /> : null}</DsBox>
        </DsBox>
      </DsBox>
    </DsBox>
  );
};
