import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingIconsComponent } from './missing-icons.component';

describe('MissingIconsComponent', () => {
  let component: MissingIconsComponent;
  let fixture: ComponentFixture<MissingIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
