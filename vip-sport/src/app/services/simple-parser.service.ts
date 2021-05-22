import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleParserService {

  constructor() { }

  static parse(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ç]/g, "").trim();
  }

  static unparse(str: string): string {
    return str;
  }
}
