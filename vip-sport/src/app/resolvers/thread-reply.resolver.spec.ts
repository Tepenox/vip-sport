import { TestBed } from '@angular/core/testing';

import { ThreadReplyResolver } from './thread-reply.resolver';

describe('ThreadResolver', () => {
  let resolver: ThreadReplyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ThreadReplyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
