'use client';

import { BGM_PLAYLIST } from "@/lib/constants";
import { Disc, Music, Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const currentTrack = BGM_PLAYLIST[currentTrackIndex];

    useEffect(() => {
        // 첫 로드 시 자동 재생 시도
        const attemptPlay = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5; // 초기 볼륨 50%
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch {
                    // Auto-play blocked by browser policy - expected behavior
                    // We wait for user interaction
                    setIsPlaying(false);
                }
            }
        };

        attemptPlay();

        // 사용자 인터랙션 감지 (첫 클릭 시 재생 시도)
        const handleInteraction = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                if (audioRef.current && audioRef.current.paused) {
                    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
                }
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [hasInteracted]);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(() => setIsPlaying(false));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrackIndex]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % BGM_PLAYLIST.length);
        setIsPlaying(true);
    };

    const handleEnded = () => {
        nextTrack();
    };

    return (
        <div className="fixed bottom-20 right-4 z-50 flex flex-col items-end gap-2">
            {/* Expanded Controls */}
            {showControls && (
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-gray-200 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center animate-spin-slow">
                            <Disc className="w-6 h-6 text-red-600" />
                        </div>
                        <div className="text-sm">
                            <p className="font-bold text-gray-900 line-clamp-1 w-32">{currentTrack.title}</p>
                            <p className="text-xs text-gray-500 line-clamp-1 w-32">{currentTrack.artist}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={togglePlay}>
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextTrack}>
                            <SkipForward className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <Button
                onClick={() => setShowControls(!showControls)}
                className={cn(
                    "rounded-full w-12 h-12 shadow-lg transition-all duration-300",
                    isPlaying ? "bg-red-600 hover:bg-red-700 text-white animate-pulse-slow" : "bg-white hover:bg-gray-50 text-gray-600 border border-gray-200"
                )}
            >
                {isPlaying ? (
                    <Music className="w-5 h-5 animate-bounce-slow" />
                ) : (
                    <Disc className="w-5 h-5" />
                )}
            </Button>

            <audio
                ref={audioRef}
                src={currentTrack.src}
                onEnded={handleEnded}
                preload="auto"
            />
        </div>
    );
}
