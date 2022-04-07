import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickersComponent } from './time-pickers.component';

describe('TimePickersComponent', () => {
  let component: TimePickersComponent;
  let fixture: ComponentFixture<TimePickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePickersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
