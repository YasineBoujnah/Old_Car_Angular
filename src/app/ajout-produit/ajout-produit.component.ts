import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Produit } from '../shared/produit.modal';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajout-produit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ajout-produit.component.html',
  styleUrl: './ajout-produit.component.css'
})
export class AjoutProduitComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public apiService: ApiService,
    private router: Router
  ) { }
  currentMaxId: number = 0;

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      stock: [0],
      category: [''],
      images: ['']
    });
    this.apiService.getALLProduit().subscribe(res => {
      const products = res;
      if (products && products.length > 0) {
        this.currentMaxId = products[products.length - 1].id;
      } else {
        this.currentMaxId = 0;
      }
    });
  }

  addProduct(): void {

    const productData: Produit = {
      id: String(++this.currentMaxId),
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      stock: this.productForm.value.stock,
      category: this.productForm.value.category,
      images: [this.productForm.value.images]
    };

    this.apiService.postProduit(productData).subscribe(res => {

      console.log('Produit ajouté avec succes:', res);
      Swal.fire({
        title: 'Succès!',
        text: 'Produit ajouté avec succes!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.productForm.reset();
      this.router.navigate(['/gestion-produits']);
    },
      err => {
        console.error("Erreur lors de l'ajout du produit", err);
        Swal.fire({
          title: 'Erreur!',
          text: "Erreur lors de l'ajout du produit",
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
