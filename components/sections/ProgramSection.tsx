import { PROGRAM } from "@/lib/constants";

export function ProgramSection() {
    return (
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-red-800 mb-2">프로그램</h2>

            <div className="pb-24">
                {PROGRAM.map((item, index) => (
                    <div
                        key={item.id}
                        className={`py-4 ${index !== PROGRAM.length - 1 ? 'border-b border-red-100/60' : ''}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-red-900/80 font-serif italic text-lg font-bold shrink-0 mt-0.5 w-6 text-center">
                                {item.id}
                            </span>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5">
                                    <h3 className="font-bold text-gray-900 text-base leading-tight">
                                        {item.title}
                                    </h3>
                                    <span className="text-xs text-gray-500 font-medium">
                                        -{item.composer}
                                    </span>
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm text-gray-800 font-medium">
                                        {item.performer}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.details}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
