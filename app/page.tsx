import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FESTIVAL_INFO } from "@/lib/constants";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-700 tracking-tight">
          Christmas
          <br />
          Praise Festival
        </h1>
        <p className="text-lg text-gray-600 font-light">
          {FESTIVAL_INFO.invitationMessage}
        </p>
      </div>

      <Card className="w-full max-w-sm border-none shadow-lg bg-white/90 backdrop-blur">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center space-x-3 text-gray-700">
            <Calendar className="w-5 h-5 text-red-600" />
            <span className="font-medium">
              {FESTIVAL_INFO.date} {FESTIVAL_INFO.time}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-gray-700">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="font-medium">{FESTIVAL_INFO.location}</span>
          </div>
        </CardContent>
      </Card>

      <div className="w-full max-w-sm">
        <Link href="/intro">
          <Button className="w-full bg-red-700 hover:bg-red-800 text-white text-lg py-6 rounded-xl shadow-md transition-all">
            자세히 보기
          </Button>
        </Link>
      </div>

      {/* Decorative elements could go here */}
      <div className="text-sm text-gray-400 mt-10">
        4개 교회 청년 연합 찬양대 주최
      </div>
    </div>
  );
}
