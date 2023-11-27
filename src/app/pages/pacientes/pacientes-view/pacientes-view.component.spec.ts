import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesViewComponent } from './pacientes-view.component';

describe('PacientesViewComponent', () => {
  let component: PacientesViewComponent;
  let fixture: ComponentFixture<PacientesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PacientesViewComponent]
    });
    fixture = TestBed.createComponent(PacientesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
