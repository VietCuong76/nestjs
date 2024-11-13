import { PageMetaDto } from './pageMeta.dto';

export class ResponsePaginate<T> {
  data: T[] | T;
  page: PageMetaDto;
  message: string;

  constructor(data: T[], page: PageMetaDto, message: string) {
    this.data = data;
    this.page = page;
    this.message = message;
  }
}
