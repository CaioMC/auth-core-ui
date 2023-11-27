import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BgCardComponent } from './bg-card.component';

describe('BgCardComponent', () => {
  let component: BgCardComponent;
  let fixture: ComponentFixture<BgCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BgCardComponent]
    });
    fixture = TestBed.createComponent(BgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
