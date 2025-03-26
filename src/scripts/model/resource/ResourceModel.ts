export const createResource = (data: Partial<ResourceModel> = {}): ResourceModel => ({
    id: data._id || '',
    title: data.title || '',
    lang: data.lang || '',
    cover: data.cover || '',
    file: data.file || '',
    type: data.type || '',
    publishedAt: data.publishedAt || new Date(),
    source: data.source || '',
});

export default interface ResourceModel {
    _id?: string,
    id?: string,
    title: string,
    lang: string,
    cover: string,
    file: string,
    type: string,
    publishedAt: Date,
    created_at?: Date,
    updated_at? : Date,
    source: string
}