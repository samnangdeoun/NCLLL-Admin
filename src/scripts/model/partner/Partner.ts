export default class Partner {
  _id?: string;
  name: string;
  name_kh: string;
  description: string;
  image: string;

  constructor(data: any) {
    this._id = data.id || "";
    this.name = data.name || "";
    this.name_kh = data.name_kh || "";
    this.description = data.description || "";
    this.image = data.image || "";
  }
}