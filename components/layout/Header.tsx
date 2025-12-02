import { ShareModal } from "@/components/share/ShareModal";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 h-14 flex items-center justify-between px-4 shadow-sm">
            <div className="font-bold text-xl text-red-700 tracking-tight">성탄 연합 찬양제</div>
            <ShareModal />
        </header>
    );
}
