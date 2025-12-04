import { Card, CardContent } from "@/components/ui/card";
import { PROGRAM } from "@/lib/constants";

export function ProgramSection() {
    return (
        <div className="space-y-6 py-6 px-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold text-red-800">프로그램</h2>

            <div className="space-y-4 pb-20">
                {PROGRAM.map((item) => (
                    <Card key={item.id} className="border-l-4 border-l-red-600 shadow-sm">
                        <CardContent className="p-4">
                            <h3 className="font-semibold text-gray-900 text-base">
                                <span className="mr-2 text-red-700">{item.id}.</span>
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 pl-6">{item.performer}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
