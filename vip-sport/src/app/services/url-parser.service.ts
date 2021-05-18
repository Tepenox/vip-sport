import { Injectable } from '@angular/core';
import { SimpleParserService } from './simple-parser.service';

@Injectable({
  providedIn: 'root'
})
export class UrlParserService {

  constructor() { }

  parse(str: string): string {
    return new SimpleParserService().parse(str).split(' ').join('-');
  }

  unparse(str: string): string {
    return str.split('-').join(' ');
  }
}
