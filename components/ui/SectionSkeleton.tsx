'use client';

export function SectionSkeleton() {
  return (
    <div className="h-full flex items-center justify-center bg-background">
      <div className="animate-pulse space-y-4 w-full max-w-sm px-6">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
        <div className="h-32 bg-gray-200 rounded w-full mt-6" />
      </div>
    </div>
  );
}
