import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinUnpinComponent } from './pin-unpin.component';

describe('PinUnpinComponent', () => {
  let component: PinUnpinComponent;
  let fixture: ComponentFixture<PinUnpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinUnpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinUnpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
