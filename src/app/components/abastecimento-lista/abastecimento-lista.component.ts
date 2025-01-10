import { Component, OnInit } from '@angular/core';
import { Abastecimento } from '../../models/abastecimento.model';
import { AbastecimentoService } from '../../services/abastecimento.service';

@Component({
  selector: 'app-abastecimento-lista',
  templateUrl: './abastecimento-lista.component.html',
  styleUrls: ['./abastecimento-lista.component.scss']
})
export class AbastecimentoListaComponent implements OnInit {
  abastecimentos: Abastecimento[] = [];
  filteredAbastecimentos: Abastecimento[] = [];
  placaFilter: string = '';
  displayedColumns: string[] = ['id', 'dhAbastecimento', 'placa', 'quilometragem', 'vlTotal', 'delete'];
  
  // Variáveis de controle da paginação com 5 no valor default
  totalRecords: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;

  constructor(private abastecimentoService: AbastecimentoService) { }

  ngOnInit(): void {
    this.loadAbastecimentos();
  }

  /* Função executada ao carregar a tela nela é feito uma chamada ao backend ap
     os seu retorno verificamos a quantidade de registros para a paginação */

  loadAbastecimentos(): void {
    this.abastecimentoService.getAbastecimentos().subscribe(
      (response: Abastecimento[]) => {
        this.abastecimentos = response;
        this.filteredAbastecimentos = response.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize);
        this.totalRecords = response.length;
      },
      (error) => {
        console.error('Erro ao carregar abastecimentos', error);
      }
    );
  }
 /* Função chamada a partir do onChange que verifica nos registros e 
    retorna apenas os que tiverem o caracter especifico */

  applyFilter(): void {
    if (this.placaFilter) {
      this.filteredAbastecimentos = this.abastecimentos.filter(abastecimento =>
        abastecimento.placa?.toLowerCase().includes(this.placaFilter.toLowerCase())
      );
    } else {
      this.filteredAbastecimentos = [...this.abastecimentos];
    }

    this.updatePagination();
    console.log(this.filteredAbastecimentos);
  }
  
  //Faz a atualização da paginação e da lista com apenas os registros do tamanho que o filtro permite
  updatePagination(): void {
    this.filteredAbastecimentos = this.filteredAbastecimentos.slice(
      this.pageIndex * this.pageSize, 
      (this.pageIndex + 1) * this.pageSize
    );
  }
  
  //Manipula a pagina e apos a manipulação é feito o filtro
  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter();
  }

  
  //Faz uma chamada padrão para deletar o registro e depois chama novamente a listagem da pagina.
  onDelete(id: number): void {
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      this.abastecimentoService.removeAbastecimento(id).subscribe(
        () => {
          alert('Abastecimento deletado com sucesso!');
          this.loadAbastecimentos();
        },
        (error: any) => {
          console.error('Erro ao deletar abastecimento', error);
          alert('Ocorreu um erro ao tentar deletar o registro.');
        }
      );
    }
  }
}
