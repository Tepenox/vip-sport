import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleParserService {

  constructor() { }

  parse(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  }

  unparse(str: string): string {
    return str;
  }
}
