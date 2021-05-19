import { Injectable } from '@angular/core';
import { SimpleParserService } from './simple-parser.service';

@Injectable({
  providedIn: 'root'
})
export class UrlParserService {

  constructor() { }

  static parse(str: string): string {
    return SimpleParserService.parse(str).split(' ').join('-');
  }

  static unparse(str: string): string {
    return str.split('-').join(' ');
  }
}
