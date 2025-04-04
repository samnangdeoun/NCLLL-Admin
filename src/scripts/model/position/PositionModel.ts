export const createPosition = (data: Partial<PositionModel> = {}): PositionModel => ({
    id: data._id || '',
    en: data.en || {} as PositionLevel,
    kh: data.kh || {} as PositionLevel
})


export default interface PositionModel {
    id?: string;
    _id?: string;
    en: PositionLevel;
    kh: PositionLevel;
}

export interface PositionLevel {
    title: string;
    level: number;
}

