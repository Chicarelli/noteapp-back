export class Note {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly note: string;

  constructor(title: string, description: string, note: string) {
    this.id = new Date().getTime().toString();
    this.title = title;
    this.description = description;
    this.note = note;
  }
}
