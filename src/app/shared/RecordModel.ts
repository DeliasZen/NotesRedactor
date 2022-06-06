export class RecordModel {
  id: number;
  text: string;
  tags: string[];

  constructor(id: number, text: string, tags: string[]) {
    this.id = id;
    this.text = text;
    this.tags = tags;
  }
}
