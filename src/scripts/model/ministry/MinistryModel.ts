export const createMinistry = (data: Partial<MinistryModel> = {}): MinistryModel => ({
    id: data._id || '',
    en: data.en || { name: '', imageUrl: 'en' },
    kh: data.kh || { name: '', imageUrl: 'kh' },
});


export default interface MinistryModel {
    id?: string;
    _id?: string;
    en: { name: string, imageUrl: string};
    kh: { name: string, imageUrl: string };
}

