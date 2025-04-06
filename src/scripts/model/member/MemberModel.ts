export const createMember = (data: Partial<MemberModel> = {}): MemberModel => ({
    en: {
        imageUrl: data.en?.imageUrl || '',
        birthDate: data.kh?.birthDate ?? '',
        email: data.kh?.email || '',
        nationality: data.en?.nationality || '',
        name: data.en?.name || '',
        currentAddress: {
            "houseNumber": "",
            "street": "",
            "district": "",
            "city": "",
            "country": ""
        },
        placeOfBirth: {
            houseNumber: data.en?.placeOfBirth?.houseNumber || '',
            street: data.en?.placeOfBirth?.street || '',
            district: data.en?.placeOfBirth?.district || '',
            city: data.en?.placeOfBirth?.city || '',
            country: data.en?.placeOfBirth?.country || '',
        },
        careerStatus: data.en?.careerStatus || [],
        experience: data.en?.experience || [],
    },
    kh: {
        imageUrl: data.kh?.imageUrl || '',
        birthDate: data.kh?.birthDate ?? '',
        email: data.en?.email || '',
        nationality: data.kh?.nationality || '',
        name: data.kh?.name || '',
        currentAddress: {
            "houseNumber": "",
            "street": "",
            "district": "",
            "city": "",
            "country": ""
        },
        placeOfBirth: {
            houseNumber: data.kh?.placeOfBirth?.houseNumber || '',
            street: data.kh?.placeOfBirth?.street || '',
            district: data.kh?.placeOfBirth?.district || '',
            city: data.kh?.placeOfBirth?.city || '',
            country: data.kh?.placeOfBirth?.country || '',
        },
        careerStatus: data.kh?.careerStatus || [],
        experience: data.kh?.experience || [],
    },
    parent: data?.parent || '',
    position: data.position || '',
    id: data._id || undefined,
});

export default interface MemberModel {
    id?: string;
    _id?: string;
    en: PersonalInfo;
    kh: PersonalInfo;
    parent: string;
    position: string;
}

export interface PersonalInfo {
    imageUrl: string;
    birthDate: string;
    email: string;
    nationality: string;
    name: string;
    currentAddress: CurrentAddress;
    placeOfBirth: CurrentAddress;
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
