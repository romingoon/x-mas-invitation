import { Card, CardContent } from "@/components/ui/card";
import { PROGRAM } from "@/lib/constants";

export function ProgramSection() {
    return (
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900">프로그램</h2>

            <div className="space-y-4 pb-20">
                {PROGRAM.map((item, index) => (
                    <Card key={index} className="border-l-4 border-l-red-600 shadow-sm">
                        <CardContent className="p-4 flex items-start space-x-4">
                            <div className="min-w-[3rem] font-bold text-gray-500 text-sm pt-1">
                                {item.time}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                {item.performer && (
                                    <p className="text-sm text-gray-600 mt-1">{item.performer}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
