export const createBanner = (data: Partial<BannerModel> = {}): BannerModel => ({
    id: data._id || '',
    title: data.title || '',
    imageUrl: data.imageUrl || '',
});

export default interface BannerModel {
    id?: string;
    _id?: string;
    title: string;
    imageUrl: string;
}
