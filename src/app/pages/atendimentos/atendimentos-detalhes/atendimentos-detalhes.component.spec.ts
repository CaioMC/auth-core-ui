import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentosDetalhesComponent } from './atendimentos-detalhes.component';

describe('AtendimentosDetalhesComponent', () => {
  let component: AtendimentosDetalhesComponent;
  let fixture: ComponentFixture<AtendimentosDetalhesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtendimentosDetalhesComponent]
    });
    fixture = TestBed.createComponent(AtendimentosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
