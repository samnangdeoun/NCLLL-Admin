import type Position from '../position/Position.ts'

export default interface Member {
    _id?: string;
    en: PersonalInfo;
    kh: PersonalInfo;
    position: Position;
}

export interface PersonalInfo {
    imageUrl: string;
    birthDate: Date;
    email: string;
    nationality: string;
    name: string;
    placeOfBirth: CurrentAddress;
    currentAddress: CurrentAddress;
    careerStatus: CareerStatus[];
    experience: CareerStatus[];
}

export interface CareerStatus {
    value: string;
    detail: string;
}

export interface CurrentAddress {
    houseNumber: string;
    street: string;
    district: string;
    city: string;
    country: string;
}
