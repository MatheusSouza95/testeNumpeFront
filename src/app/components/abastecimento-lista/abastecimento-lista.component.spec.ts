import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimentoListaComponent } from './abastecimento-lista.component';

describe('AbastecimentoListaComponent', () => {
  let component: AbastecimentoListaComponent;
  let fixture: ComponentFixture<AbastecimentoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbastecimentoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimentoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
