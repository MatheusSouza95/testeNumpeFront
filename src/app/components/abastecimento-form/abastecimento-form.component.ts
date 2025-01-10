import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbastecimentoService } from '../../services/abastecimento.service';
import { Abastecimento } from '../../models/abastecimento.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-abastecimento-form',
  templateUrl: './abastecimento-form.component.html',
  styleUrls: ['./abastecimento-form.component.scss']
})
export class AbastecimentoFormComponent {
  constructor(
    private abastecimentoService: AbastecimentoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private location: Location

  ) {}

  //Função que subimete para o backend os dados passados

  onSubmit(form: any): void {

    //Const com o objetivo de validar e fazer o mapeamento direto com a Entity de Abastecimento
    const novoAbastecimento: Abastecimento = {
      dhAbastecimento: form.value.dhAbastecimento,
      placa: form.value.placa,
      quilometragem: form.value.quilometragem,
      vlTotal: form.value.vlTotal,
      mapper: function (entity: Abastecimento): Abastecimento {
        throw new Error('Function not implemented.');
      }
    };

    //Chamada ao backEnd padrão
    this.abastecimentoService.addAbastecimento(novoAbastecimento).subscribe(
      (response: any) => {
        const message = response.message || 'Abastecimento adicionado com sucesso!';
        
        this.snackBar.open(message, 'Fechar', {
          duration: 3000, 
          panelClass: ['success-toast'] 
        });

        this.router.navigate(['/abastecimento-lista']);
      },
      (error) => {
        console.log(error)
        const message = error.error?.errorMessage || 'Erro ao adicionar abastecimento';
        
        this.snackBar.open(message, 'Fechar', {
          duration: 3000,
          panelClass: ['error-toast'] 
        });
      }
    );
  }

  goBack() {
    this.location.back();
  }
}
