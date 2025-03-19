export default interface Position {
    id?: string;
    en: PositionLevel;
    kh: PositionLevel;
}

export interface PositionLevel {
    title: string;
    level: number;
}
