import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectLabelComponent } from './select-label.component';

describe('SelectLabelComponent', () => {
  let component: SelectLabelComponent;
  let fixture: ComponentFixture<SelectLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
