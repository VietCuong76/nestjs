export class ResponseItem<T> {
  constructor(data: T, message: string) {
    this.data = data;
    this.message = message;
  }

  readonly data: T;
  readonly message: string;
}
