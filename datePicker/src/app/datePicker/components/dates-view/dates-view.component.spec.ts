import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatesViewComponent } from './dates-view.component';

describe('DatesViewComponent', () => {
  let component: DatesViewComponent;
  let fixture: ComponentFixture<DatesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
