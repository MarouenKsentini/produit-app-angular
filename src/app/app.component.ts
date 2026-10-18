import { Component } from '@angular/core';
import { ProduitListComponent } from './views/produit-list/produit-list.component';

@Component({
  selector: 'app-root',
  imports: [ProduitListComponent],
  template: `<app-produit-list />`,
})
export class AppComponent {}
