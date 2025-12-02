'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex items-center justify-center px-4 bg-white">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              문제가 발생했습니다
            </h2>
            <p className="text-sm text-gray-600">
              페이지를 불러오는 중 오류가 발생했습니다.
            </p>
            <Button
              onClick={reset}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              다시 시도
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
