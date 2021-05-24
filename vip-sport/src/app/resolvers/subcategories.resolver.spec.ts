import { TestBed } from '@angular/core/testing';

import { SubcategoriesResolver } from './subcategories.resolver';

describe('SubcategoriesResolver', () => {
  let resolver: SubcategoriesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SubcategoriesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
