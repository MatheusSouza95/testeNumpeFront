import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbastecimentoListaComponent } from './components/abastecimento-lista/abastecimento-lista.component';
import { AbastecimentoFormComponent } from './components/abastecimento-form/abastecimento-form.component';

const routes: Routes = [
  { path: 'abastecimento-lista', component: AbastecimentoListaComponent },
  { path: 'abastecimento-form', component: AbastecimentoFormComponent },
  { path: '', redirectTo: '/abastecimento-lista', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
