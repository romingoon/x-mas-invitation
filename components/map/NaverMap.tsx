"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import type { NaverMap as NaverMapType } from "@/types/naver-maps";

interface NaverMapProps {
    latitude: number;
    longitude: number;
    height?: string;
}

export function NaverMap({ latitude, longitude, height = "400px" }: NaverMapProps) {
    const mapElement = useRef<HTMLDivElement>(null);
    const mapRef = useRef<NaverMapType | null>(null);

    useEffect(() => {
        const initMap = () => {
            if (!mapElement.current || !window.naver) return;

            const location = new window.naver.maps.LatLng(latitude, longitude);
            const mapOptions = {
                center: location,
                zoom: 16,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT,
                },
            };

            const map = new window.naver.maps.Map(mapElement.current, mapOptions);
            mapRef.current = map;

            new window.naver.maps.Marker({
                position: location,
                map: map,
            });
        };

        if (window.naver && window.naver.maps) {
            initMap();
        } else {
            const mapScript = document.getElementById("naver-map-script");
            if (mapScript) {
                mapScript.addEventListener("load", initMap);
            }
        }

        return () => {
            const mapScript = document.getElementById("naver-map-script");
            if (mapScript) {
                mapScript.removeEventListener("load", initMap);
            }
        };
    }, [latitude, longitude]);

    return (
        <>
            <Script
                id="naver-map-script"
                src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
                strategy="afterInteractive"
                onLoad={() => {
                    // Trigger a re-render or check if map needs initialization
                    if (window.naver && window.naver.maps && !mapRef.current && mapElement.current) {
                        const location = new window.naver.maps.LatLng(latitude, longitude);
                        const mapOptions = {
                            center: location,
                            zoom: 16,
                            zoomControl: true,
                            zoomControlOptions: {
                                position: window.naver.maps.Position.TOP_RIGHT,
                            },
                        };
                        const map = new window.naver.maps.Map(mapElement.current, mapOptions);
                        mapRef.current = map;

                        new window.naver.maps.Marker({
                            position: location,
                            map: map,
                        });
                    }
                }}
            />
            <div ref={mapElement} style={{ width: "100%", height }} />
        </>
    );
}

