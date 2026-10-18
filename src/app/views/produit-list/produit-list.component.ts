import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../../models/produit.model';
import { ProduitViewModel } from '../../viewmodels/produit.viewmodel';

@Component({
  selector: 'app-produit-list',
  imports: [FormsModule, DecimalPipe],
  providers: [ProduitViewModel],
  templateUrl: './produit-list.component.html',
  styleUrl: './produit-list.component.css',
})
export class ProduitListComponent implements OnInit {
  protected readonly vm = inject(ProduitViewModel);

  ngOnInit(): void {
    this.vm.charger();
  }

  onSupprimer(produit: Produit): void {
    if (confirm(`Supprimer « ${produit.libelle} » ?`)) {
      this.vm.supprimer(produit);
    }
  }
}
