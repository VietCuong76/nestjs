export class ResponseItem<T> {
  constructor(data: T[] | T, message: string) {
    this.data = data;
    this.message = message;
  }

  readonly data: T[] | T;
  readonly message: string;
}
