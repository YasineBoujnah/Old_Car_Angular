import { Routes } from '@angular/router';
import { GestionProduitsComponent } from './gestion-produits/gestion-produits.component';
import { ErreurComponent } from './erreur/erreur.component';
import { AjoutProduitComponent } from './ajout-produit/ajout-produit.component';
import { AproposComponent } from './apropos/apropos.component';

export const routes: Routes = [
    { path: 'gestion-produits', component: GestionProduitsComponent },
    { path: 'ajouter-produit', component: AjoutProduitComponent },
    { path: 'apropos', component: AproposComponent },
    { path: '', component: GestionProduitsComponent },
    { path: '**', component: ErreurComponent },
];
