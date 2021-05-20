import { TestBed } from '@angular/core/testing';

import { CurrentSubcategoryResolver } from './current-subcategory.resolver';

describe('CurrentCategoryResolver', () => {
  let resolver: CurrentSubcategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CurrentSubcategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
