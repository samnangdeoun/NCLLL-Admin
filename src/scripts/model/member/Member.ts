import type Position from '../position/Position.ts';

export const createMember = (data: Partial<Member> = {}): Member => ({
    en: {
        imageUrl: data.en?.imageUrl || '',
        birthDate: data.en?.birthDate ?? null,
        email: data.en?.email || '',
        nationality: data.en?.nationality || '',
        name: data.en?.name || '',
        placeOfBirth: {
            houseNumber: data.en?.placeOfBirth?.houseNumber || '',
            street: data.en?.placeOfBirth?.street || '',
            district: data.en?.placeOfBirth?.district || '',
            city: data.en?.placeOfBirth?.city || '',
            country: data.en?.placeOfBirth?.country || '',
        },
        currentAddress: {
            houseNumber: data.en?.currentAddress?.houseNumber || '',
            street: data.en?.currentAddress?.street || '',
            district: data.en?.currentAddress?.district || '',
            city: data.en?.currentAddress?.city || '',
            country: data.en?.currentAddress?.country || '',
        },
        careerStatus: data.en?.careerStatus || [],
        experience: data.en?.experience || [],
    },
    kh: {
        imageUrl: data.kh?.imageUrl || '',
        birthDate: data.kh?.birthDate ?? null,
        email: data.kh?.email || '',
        nationality: data.kh?.nationality || '',
        name: data.kh?.name || '',
        placeOfBirth: {
            houseNumber: data.kh?.placeOfBirth?.houseNumber || '',
            street: data.kh?.placeOfBirth?.street || '',
            district: data.kh?.placeOfBirth?.district || '',
            city: data.kh?.placeOfBirth?.city || '',
            country: data.kh?.placeOfBirth?.country || '',
        },
        currentAddress: {
            houseNumber: data.kh?.currentAddress?.houseNumber || '',
            street: data.kh?.currentAddress?.street || '',
            district: data.kh?.currentAddress?.district || '',
            city: data.kh?.currentAddress?.city || '',
            country: data.kh?.currentAddress?.country || '',
        },
        careerStatus: data.kh?.careerStatus || [],
        experience: data.kh?.experience || [],
    },
    position: {
        en: {
            title: data.position?.en?.title || '',
            level: data.position?.en?.level ?? 1,
        },
        kh: {
            title: data.position?.kh?.title || '',
            level: data.position?.kh?.level ?? 1,
        },
    },
    _id: data._id,
});

export default interface Member {
    _id?: string;
    en: PersonalInfo;
    kh: PersonalInfo;
    position: Position;
}

export interface PersonalInfo {
    imageUrl: string;
    birthDate: Date | null;
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
