import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDisplayScreenComponent } from './seat-display-screen.component';

describe('SeatDisplayScreenComponent', () => {
  let component: SeatDisplayScreenComponent;
  let fixture: ComponentFixture<SeatDisplayScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatDisplayScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatDisplayScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
