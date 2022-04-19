import {Publication} from './publication';

export class PaginatedPublication {
  private _total: number;
  private _previous: string;
  private _next: string;
  private _data: Publication[];

  constructor(total: number, previous: string, next: string, data: Publication[]) {
    this._total = total;
    this._previous = previous;
    this._next = next;
    this._data = data;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get previous(): string {
    return this._previous;
  }

  set previous(value: string) {
    this._previous = value;
  }

  get next(): string {
    return this._next;
  }

  set next(value: string) {
    this._next = value;
  }

  get data(): Publication[] {
    return this._data;
  }

  set data(value: Publication[]) {
    this._data = value;
  }
}
