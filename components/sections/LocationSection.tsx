'use client';

import { motion } from 'framer-motion';
import {
    MapPin,
    Navigation,
    BusFront,
    CarFront,
    TramFront,
    Loader2,
} from 'lucide-react';
import { FaChurch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { NaverMap } from '@/types/naver-maps';
import { renderToStaticMarkup } from 'react-dom/server';

interface LocationSectionProps {
    venue?: string;
    venueAddress?: string;
    imageUrl?: string;
}

interface UserLocation {
    latitude: number;
    longitude: number;
}

export function LocationSection({
    venue = '새문안교회',
    venueAddress = '서울특별시 종로구 새문안로 79',
    imageUrl = ''
}: LocationSectionProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<NaverMap | null>(null); // 지도 인스턴스 저장
    const [scriptLoaded, setScriptLoaded] = useState(false); // 스크립트 로딩 상태
    const [mapLoaded, setMapLoaded] = useState(false);
    const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
    const [locationLoading, setLocationLoading] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const churchIconHtml = renderToStaticMarkup(
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: '#065f46',
                borderRadius: '50%',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            }}
        >
            <FaChurch size={24} color="#ffffff" />
        </div>
    );

    // 새문안교회 좌표
    const CHURCH_COORDS = {
        lat: 37.57066632793,
        lng: 126.9739148361,
    };

    // 사용자 현재 위치 가져오기
    const getCurrentLocation = (): Promise<UserLocation> => {
        return new Promise((resolve, reject) => {
            // Geolocation API 지원 확인
            if (!navigator.geolocation) {
                reject(new Error('이 브라우저는 위치 서비스를 지원하지 않습니다.'));
                return;
            }

            setLocationLoading(true);
            setLocationError(null);

            const options = {
                enableHighAccuracy: true, // 높은 정확도 요청
                timeout: 10000, // 10초 타임아웃
                maximumAge: 300000, // 5분간 캐시된 위치 사용
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = { latitude, longitude };
                    setUserLocation(location);
                    setLocationLoading(false);
                    resolve(location);
                },
                (error) => {
                    setLocationLoading(false);
                    let errorMessage = '';

                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage =
                                '위치 정보 접근이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = '위치 정보를 사용할 수 없습니다.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = '위치 정보를 가져오는데 시간이 초과되었습니다.';
                            break;
                        default:
                            errorMessage = '알 수 없는 오류가 발생했습니다.';
                    }

                    setLocationError(errorMessage);
                    reject(new Error(errorMessage));
                },
                options
            );
        });
    };

    // iOS용 앱 실행 함수
    const openIOSApp = (appUrl: string, fallbackUrl: string) => {
        const clickedAt = Date.now();
        window.location.href = appUrl;

        setTimeout(() => {
            if (Date.now() - clickedAt < 2000) {
                window.location.href = fallbackUrl;
            }
        }, 1500);
    };

    // 네이버 지도 앱으로 열기
    const handleOpenNaverMap = () => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isAndroid) {
            const intentUrl = `intent://place?lat=${CHURCH_COORDS.lat}&lng=${CHURCH_COORDS.lng
                }&name=${encodeURIComponent(
                    venue
                )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

            window.location.href = intentUrl;
        } else if (isIOS) {
            const naverMapUrl = `nmap://place?lat=${CHURCH_COORDS.lat}&lng=${CHURCH_COORDS.lng
                }&name=${encodeURIComponent(venue)}&appname=com.example.myapp`;

            const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
            openIOSApp(naverMapUrl, appStoreUrl);
        } else {
            window.open('https://naver.me/G657fW17', '_blank');
        }
    };

    // 현재 위치에서 길찾기 (개선된 버전)
    const handleNavigationFromCurrentLocation = async () => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        try {
            // 현재 위치 가져오기
            const currentLocation = userLocation || (await getCurrentLocation());

            if (isAndroid) {
                // Android: Intent URL로 현재 위치에서 길찾기
                const intentUrl = `intent://route/public?slat=${currentLocation.latitude
                    }&slng=${currentLocation.longitude}&sname=${encodeURIComponent(
                        '현재 위치'
                    )}&dlat=${CHURCH_COORDS.lat}&dlng=${CHURCH_COORDS.lng
                    }&dname=${encodeURIComponent(
                        venue
                    )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

                window.location.href = intentUrl;
            } else if (isIOS) {
                // iOS: 현재 위치에서 길찾기
                const naverMapUrl = `nmap://route/public?slat=${currentLocation.latitude
                    }&slng=${currentLocation.longitude}&sname=${encodeURIComponent(
                        '현재 위치'
                    )}&dlat=${CHURCH_COORDS.lat}&dlng=${CHURCH_COORDS.lng
                    }&dname=${encodeURIComponent(venue)}&appname=com.example.myapp`;

                const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
                openIOSApp(naverMapUrl, appStoreUrl);
            } else {
                // PC: 네이버 지도 웹에서 현재 위치에서 길찾기
                window.open(
                    `https://map.naver.com/v5/directions/${currentLocation.longitude},${currentLocation.latitude
                    },현재%20위치,PLACE_POI/${CHURCH_COORDS.lng},${CHURCH_COORDS.lat
                    },${encodeURIComponent(venue)},PLACE_POI/transit`,
                    '_blank'
                );
            }
        } catch (error) {
            console.error('현재 위치를 가져오는데 실패했습니다:', error);
            // 위치를 가져올 수 없을 때는 기본 길찾기 실행
            handleNavigation();
        }
    };

    // 기본 길찾기 (목적지만 지정)
    const handleNavigation = () => {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isAndroid) {
            const intentUrl = `intent://route/public?dlat=${CHURCH_COORDS.lat}&dlng=${CHURCH_COORDS.lng
                }&dname=${encodeURIComponent(
                    venue
                )}&appname=com.example.myapp#Intent;scheme=nmap;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=com.nhn.android.nmap;end`;

            window.location.href = intentUrl;
        } else if (isIOS) {
            const naverMapUrl = `nmap://route/public?dlat=${CHURCH_COORDS.lat}&dlng=${CHURCH_COORDS.lng
                }&dname=${encodeURIComponent(venue)}&appname=com.example.myapp`;

            const appStoreUrl = 'https://itunes.apple.com/app/id311867728?mt=8';
            openIOSApp(naverMapUrl, appStoreUrl);
        } else {
            window.open(
                `https://map.naver.com/v5/directions/-/-/-/transit?c=${CHURCH_COORDS.lng
                },${CHURCH_COORDS.lat},15,0,0,0,dh&destination=${encodeURIComponent(
                    venue
                )},${CHURCH_COORDS.lng},${CHURCH_COORDS.lat}`,
                '_blank'
            );
        }
    };

    // 네이버 지도 초기화
    const initializeMap = useCallback(() => {
        console.log('지도 초기화 시도...');
        console.log('mapRef.current:', mapRef.current);
        console.log('window.naver:', window.naver);

        if (!mapRef.current || !window.naver || !window.naver.maps) {
            console.error('지도 초기화 실패: 필수 조건 미충족');
            return;
        }

        // 이미 지도가 생성되어 있으면 재생성하지 않음
        if (mapInstanceRef.current) {
            console.log('지도가 이미 생성되어 있습니다.');
            return;
        }
        try {
            const location = new window.naver.maps.LatLng(
                CHURCH_COORDS.lat,
                CHURCH_COORDS.lng
            );

            const mapOptions = {
                center: location,
                zoom: 17,
                minZoom: 11, // 최소 줌 (너무 축소 방지)
                maxZoom: 18,
                zoomControl: true,
                zoomControlOptions: {
                    position: window.naver.maps.Position.TOP_RIGHT,
                    style: window.naver.maps.ZoomControlStyle.SMALL,
                },
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
            };

            const map = new window.naver.maps.Map(mapRef.current, mapOptions);
            mapInstanceRef.current = map;
            // 교회 마커 추가
            new window.naver.maps.Marker({
                position: location,
                map: map,
                title: venue,
                icon: {
                    content: churchIconHtml,
                    size: new window.naver.maps.Size(100, 40),
                    anchor: new window.naver.maps.Point(50, 45),
                },
            });

            // 사용자 위치가 있으면 사용자 위치 마커도 추가
            if (userLocation) {
                const userLocationLatLng = new window.naver.maps.LatLng(
                    userLocation.latitude,
                    userLocation.longitude
                );

                new window.naver.maps.Marker({
                    position: userLocationLatLng,
                    map: map,
                    title: '현재 위치',
                    icon: {
                        content: `
            <div style="
              width: 20px;
              height: 20px;
              background: #3b82f6;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.2);
            "></div>
          `,
                        size: new window.naver.maps.Size(20, 20),
                        anchor: new window.naver.maps.Point(10, 10),
                    },
                });
            }

            setMapLoaded(true);
            console.log('지도 초기화 완료');
        } catch (error) {
            console.error('지도 생성 중 오류 발생:', error);
        }
    }, [CHURCH_COORDS.lat, CHURCH_COORDS.lng, userLocation, venue]);
    // 수동으로 스크립트 로드하기 (더 안정적인 방법)
    useEffect(() => {
        // 이미 스크립트가 로드되었는지 확인
        if (window.naver && window.naver.maps) {
            console.log('네이버 지도 API가 이미 로드됨');
            setScriptLoaded(true);
            return;
        }

        // 스크립트 요소 생성
        const script = document.createElement('script');
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;
        script.async = true;

        script.onload = () => {
            console.log('네이버 지도 스크립트 로드 완료');
            setScriptLoaded(true);
        };

        script.onerror = () => {
            console.error('네이버 지도 스크립트 로드 실패');
        };

        document.head.appendChild(script);

        // 컴포넌트 언마운트 시 스크립트 제거
        return () => {
            const existingScript = document.querySelector(`script[src*="maps.js"]`);
            if (existingScript) {
                document.head.removeChild(existingScript);
            }
        };
    }, []);

    // 스크립트 로드 후 지도 초기화
    useEffect(() => {
        if (scriptLoaded && mapRef.current) {
            // 약간의 딜레이를 주어 DOM과 스크립트가 완전히 준비되도록 함
            const timer = setTimeout(() => {
                initializeMap();
            }, 500); // 딜레이를 늘림

            return () => clearTimeout(timer);
        }
    }, [scriptLoaded, initializeMap]);

    // 컴포넌트 마운트 시 현재 위치 가져오기 (한 번만 실행)
    useEffect(() => {
        if ('geolocation' in navigator) {
            getCurrentLocation().catch(() => {
                console.log('현재 위치를 가져올 수 없습니다.');
            });
        }
    }, []); // 빈 배열로 한 번만 실행

    // 스크립트 로드 후 지도 초기화
    useEffect(() => {
        if (scriptLoaded && mapRef.current) {
            // 약간의 딜레이를 주어 DOM이 완전히 준비되도록 함
            const timer = setTimeout(() => {
                initializeMap();
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [scriptLoaded, initializeMap]);

    // 컴포넌트 마운트 시 현재 위치 가져오기
    useEffect(() => {
        if ('geolocation' in navigator) {
            getCurrentLocation().catch(() => {
                console.log('현재 위치를 가져올 수 없습니다.');
            });
        }
    }, []);
    // 사용자 위치가 업데이트되면 지도도 다시 초기화
    useEffect(() => {
        if (mapLoaded && userLocation) {
            initializeMap();
        }
    }, [userLocation, initializeMap, mapLoaded]);

    return (
        <div className="h-full overflow-y-auto pb-24">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="pt-8 pb-6 px-6 text-center"
                >
                    <h2 className="text-2xl text-gray-900 mb-1">오시는 길</h2>
                    <p className="text-sm text-gray-600">Location</p>
                </motion.div>

                <div className="px-6 space-y-5">
                    {/* Venue Info */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white"
                    >
                        <div className="flex items-start gap-3">
                            <MapPin className="w-6 h-6 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-xl mb-2 font-semibold">{venue}</h3>
                                <p className="text-sm text-white/90 leading-relaxed">
                                    {venueAddress}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Naver Map */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-2xl p-4 shadow-sm"
                    >
                        {' '}
                        {/* 지도 영역 */}
                        <div
                            ref={mapRef}
                            className="w-full h-64 rounded-xl overflow-hidden bg-gray-100 relative"
                        >
                            {' '}
                            {/* 로딩 인디케이터 */}
                            {!mapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                    <div className="text-center">
                                        <Loader2 className="w-8 h-8 animate-spin text-emerald-700 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">지도 로딩 중...</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            스크립트 로드: {scriptLoaded ? '완료' : '진행 중'}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* 버튼 영역 */}
                        <div className="grid grid-cols-2 gap-2 mt-4">
                            <Button
                                onClick={handleOpenNaverMap}
                                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl"
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                지도 열기
                            </Button>
                            <Button
                                onClick={handleNavigationFromCurrentLocation}
                                disabled={locationLoading}
                                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl disabled:opacity-50"
                            >
                                {locationLoading ? (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                ) : (
                                    <Navigation className="w-4 h-4 mr-2" />
                                )}
                                길찾기
                            </Button>
                        </div>
                        {/* 기본 길찾기 버튼 (위치 권한이 없을 때를 위한 대안) */}
                        {locationError && (
                            <div className="mt-2">
                                <Button
                                    onClick={handleNavigation}
                                    variant="outline"
                                    className="w-full rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                >
                                    <Navigation className="w-4 h-4 mr-2" />
                                    기본 길찾기
                                </Button>
                            </div>
                        )}
                    </motion.div>

                    {/* Getting There */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                    >
                        <h3 className="text-base text-gray-900 px-1">교통편</h3>

                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-emerald-50 rounded-lg flex-shrink-0">
                                    <TramFront className="w-5 h-5 text-emerald-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-xl text-gray-900 mb-2 font-semibold">
                                        지하철 노선 안내
                                    </h1>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        5호선 광화문역 1번 출구 : 도보 약 270m (정문)
                                        <br />
                                        5호선 광화문역 8번 출구 : 도보 약 150m (후문)
                                        <br />
                                        3호선 경복궁역 : 도보 약 500m (후문)
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-2.5 bg-blue-50 rounded-lg flex-shrink-0">
                                        <BusFront className="w-5 h-5 text-blue-700" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h1 className="text-xl text-gray-900 mb-2 font-semibold">
                                            버스 노선 안내
                                        </h1>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            간선버스 : 101 160 260 270 271 273 370 470 600 601 602
                                            603 704 705 706 720 721 741
                                        </p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            지선버스 : 7011 7019
                                        </p>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            광역버스 : 1004 8600 8601 G6005 9701 9709 9710
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-purple-50 rounded-lg flex-shrink-0">
                                    <CarFront className="w-5 h-5 text-purple-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm text-gray-900 mb-1 font-semibold">
                                        자가용
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        새문안교회 지하주차장 이용 가능
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        교회 지하주차장 만차시, 콘코디언 빌딩 지하주차장 주차 후
                                        로비 안내데스크에서 주차할인 요청
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="bg-emerald-50 rounded-xl p-4 border border-emerald-100"
                    >
                        <p className="text-xs text-emerald-900 text-center">
                            장애인 편의시설이 완비되어 있습니다
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
