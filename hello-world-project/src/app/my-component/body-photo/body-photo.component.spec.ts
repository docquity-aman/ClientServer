import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyPhotoComponent } from './body-photo.component';

describe('BodyPhotoComponent', () => {
  let component: BodyPhotoComponent;
  let fixture: ComponentFixture<BodyPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
