export const createMinistry = (data: Partial<MinistryModel> = {}): MinistryModel => ({
    id: data._id || '',
    imageUrl: data.imageUrl || '',
    en: data.en || { name: '', lang: 'en' },
    kh: data.kh || { name: '', lang: 'kh' },
});


export default interface MinistryModel {
    id?: string;
    _id?: string;
    imageUrl: string;
    en: { name: string, lang: string };
    kh: { name: string, lang: string };
}

