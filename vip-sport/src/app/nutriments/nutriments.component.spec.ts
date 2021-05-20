import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrimentsComponent } from './nutriments.component';

describe('NutrimentsComponent', () => {
  let component: NutrimentsComponent;
  let fixture: ComponentFixture<NutrimentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutrimentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NutrimentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
