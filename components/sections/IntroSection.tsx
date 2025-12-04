import { FESTIVAL_INFO } from "@/lib/constants";

export function IntroSection() {
    return (
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">소개</h2>

            <div className="prose prose-red max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap break-keep">
                    {FESTIVAL_INFO.introText}
                </p>


            </div>

            <div className="bg-red-50 p-6 rounded-2xl mt-8 mb-20">
                <p className="text-center text-red-800 font-medium italic break-keep">
                    "지극히 높은 곳에서는 하나님께 영광이요 땅에서는 하나님이 기뻐하신 사람들 중에 평화로다 하니라"
                    <br />
                    - 누가복음 2장 14절
                </p>
            </div>
        </div>
    );
}
