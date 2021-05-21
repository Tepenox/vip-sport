import { TestBed } from '@angular/core/testing';

import { ThreadListResolver } from './thread-list.resolver';

describe('ThreadListResolver', () => {
  let resolver: ThreadListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThreadListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
