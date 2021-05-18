import { TestBed } from '@angular/core/testing';

import { ThreadResolver } from './thread.resolver';

describe('ThreadResolver', () => {
  let resolver: ThreadResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThreadResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
