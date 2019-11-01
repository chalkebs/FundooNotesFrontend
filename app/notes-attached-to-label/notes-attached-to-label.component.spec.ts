import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesAttachedToLabelComponent } from './notes-attached-to-label.component';

describe('NotesAttachedToLabelComponent', () => {
  let component: NotesAttachedToLabelComponent;
  let fixture: ComponentFixture<NotesAttachedToLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesAttachedToLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesAttachedToLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
