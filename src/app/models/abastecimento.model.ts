//Faz o mapeamento da entidade bem como sua inicialização
export class Abastecimento {
    id?: number;
    dhAbastecimento?: string;
    placa?: string;
    quilometragem?: number;
    vlTotal?: number;
  
    mapper(entity: Abastecimento): Abastecimento {
      let abastecimento = new Abastecimento();
      abastecimento.id = entity.id;
      abastecimento.dhAbastecimento = entity.dhAbastecimento;
      abastecimento.placa = entity.placa;
      abastecimento.quilometragem = entity.quilometragem;
      abastecimento.vlTotal = entity.vlTotal;
      return abastecimento;
    }
  }
  