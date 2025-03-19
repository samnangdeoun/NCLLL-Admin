export default interface Sponsor {
    id?: string;
    en: SponsorInfo;
    kh: SponsorInfo;
}

export interface SponsorInfo {
    name: string;
    description: string;
    imageUrl: string;
}
