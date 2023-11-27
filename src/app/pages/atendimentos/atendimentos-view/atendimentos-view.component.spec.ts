import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosViewComponent } from './atendimentos-view.component';

describe('AtendimentosViewComponent', () => {
  let component: AtendimentosViewComponent;
  let fixture: ComponentFixture<AtendimentosViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosViewComponent]
    });
    fixture = TestBed.createComponent(AtendimentosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
