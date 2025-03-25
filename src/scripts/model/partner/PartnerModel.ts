export const createPartner = (data: Partial<PartnerModel> = {}): PartnerModel => ({
  _id: data._id || '',
  name: data.name || '',
  name_kh: data.name_kh || '',
  description: data.description || '',
  image: data.image || '',
})

export default interface PartnerModel {
  id?: string;
  _id?: string;
  name: string;
  name_kh: string;
  description: string;
  image: string;
}
