import { TestBed } from '@angular/core/testing';

import { SimpleParserService } from './simple-parser.service';

describe('SimpleParserService', () => {
  let service: SimpleParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
