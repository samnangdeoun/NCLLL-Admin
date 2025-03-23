export default interface SponsorModel {
    _id?: string;
    en: SponsorInfo;
    kh: SponsorInfo;
}

export interface SponsorInfo {
    name: string;
    description: string;
    imageUrl: string;
}
