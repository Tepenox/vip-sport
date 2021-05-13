import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadCreationFormComponent } from './thread-creation-form.component';

describe('ThreadCreationFormComponent', () => {
  let component: ThreadCreationFormComponent;
  let fixture: ComponentFixture<ThreadCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreadCreationFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
