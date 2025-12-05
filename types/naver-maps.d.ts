export interface NaverMap {
    setCenter(center: LatLng | LatLngLiteral): void;
    setZoom(zoom: number, useEffect?: boolean): void;
    getCenter(): LatLng;
    getZoom(): number;
    setSize(size: Size | SizeLiteral): void;
    getSize(): Size;
    setOptions(options: MapOptions): void;
    getOptions(): MapOptions;
    panTo(coord: LatLng | LatLngLiteral, transitionOptions?: TransitionOptions): void;
    panToBounds(bounds: Bounds | BoundsLiteral, transitionOptions?: TransitionOptions, margin?: Margin): void;
    fitBounds(bounds: Bounds | BoundsLiteral, margin?: Margin): void;
    morph(coord: LatLng | LatLngLiteral, zoom?: number, transitionOptions?: TransitionOptions): void;
    destroy(): void;
}

export interface LatLng {
    lat(): number;
    lng(): number;
}

export interface LatLngLiteral {
    lat: number;
    lng: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface SizeLiteral {
    width: number;
    height: number;
}

export interface Bounds {
    south: number;
    west: number;
    north: number;
    east: number;
}

export interface BoundsLiteral {
    south: number;
    west: number;
    north: number;
    east: number;
}

export interface ControlOptions {
    position?: ControlPosition;
    style?: ControlStyle;
}

export interface MapOptions {
    background?: string;
    baseTileOpacity?: number;
    bounds?: Bounds | BoundsLiteral;
    center?: LatLng | LatLngLiteral;
    disableDoubleClickZoom?: boolean;
    disableDoubleTapZoom?: boolean;
    disableKineticPan?: boolean;
    disableTwoFingerTapZoom?: boolean;
    draggable?: boolean;
    keyboardShortcuts?: boolean;
    logoControl?: boolean;
    logoControlOptions?: ControlOptions;
    mapDataControl?: boolean;
    mapDataControlOptions?: ControlOptions;
    mapTypeControl?: boolean;
    mapTypeControlOptions?: ControlOptions;
    mapTypeId?: string;
    maxBounds?: Bounds | BoundsLiteral;
    maxZoom?: number;
    minZoom?: number;
    padding?: Margin;
    pinchZoom?: boolean;
    resizeEnable?: boolean;
    scaleControl?: boolean;
    scaleControlOptions?: ControlOptions;
    scrollWheel?: boolean;
    overlayZoomEffect?: string;
    tileSpare?: number;
    tileTransition?: boolean;
    zoom?: number;
    zoomControl?: boolean;
    zoomControlOptions?: ControlOptions;
    zoomOrigin?: LatLng | LatLngLiteral;
}

export interface Margin {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface TransitionOptions {
    duration?: number;
    easing?: string;
}

export interface MarkerIcon {
    content?: string;
    size?: Size;
    anchor?: Point;
    url?: string;
    scaledSize?: Size;
    origin?: Point;
}

export interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: NaverMap;
    title?: string;
    icon?: MarkerIcon;
    clickable?: boolean;
    draggable?: boolean;
    visible?: boolean;
    zIndex?: number;
}

export interface Marker {
    setPosition(position: LatLng | LatLngLiteral): void;
    getPosition(): LatLng;
    setMap(map: NaverMap | null): void;
    getMap(): NaverMap | null;
    setIcon(icon: MarkerIcon): void;
    setVisible(visible: boolean): void;
}

type ControlPosition = symbol;
type ControlStyle = symbol;

declare global {
    interface Window {
        naver: {
            maps: {
                Map: new (element: HTMLElement | string, options?: MapOptions) => NaverMap;
                LatLng: new (lat: number, lng: number) => LatLng;
                Point: new (x: number, y: number) => Point;
                Size: new (width: number, height: number) => Size;
                Marker: new (options: MarkerOptions) => Marker;
                Position: {
                    TOP_RIGHT: ControlPosition;
                    TOP_LEFT: ControlPosition;
                    BOTTOM_RIGHT: ControlPosition;
                    BOTTOM_LEFT: ControlPosition;
                };
                ZoomControlStyle: {
                    SMALL: ControlStyle;
                    LARGE: ControlStyle;
                };
            };
        };
    }
}
