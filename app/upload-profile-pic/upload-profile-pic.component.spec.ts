import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadProfilePicComponent } from './upload-profile-pic.component';

describe('UploadProfilePicComponent', () => {
  let component: UploadProfilePicComponent;
  let fixture: ComponentFixture<UploadProfilePicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadProfilePicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadProfilePicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
