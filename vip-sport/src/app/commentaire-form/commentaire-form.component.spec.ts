import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaireFormComponent } from './commentaire-form.component';

describe('CommentaireFormComponent', () => {
  let component: CommentaireFormComponent;
  let fixture: ComponentFixture<CommentaireFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentaireFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
