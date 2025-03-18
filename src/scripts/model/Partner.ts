export default class Partner {
  id: string;
  name: string;
  description: string;
  image: string;

  constructor(data: any) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.description = data.description || "";
    this.image = data.image || "";
  }
}


