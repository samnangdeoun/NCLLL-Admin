export default interface PositionModel {
    _id?: string;
    en: PositionLevel;
    kh: PositionLevel;
}

export interface PositionLevel {
    title: string;
    level: number;
}
