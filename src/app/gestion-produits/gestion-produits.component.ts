import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Produit } from '../shared/produit.modal';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './gestion-produits.component.html',
  styleUrl: './gestion-produits.component.css',
  providers: [ApiService]
})
export class GestionProduitsComponent implements OnInit {
  formValue !: FormGroup;
  produitModelObj: Produit = new Produit();
  currentMaxId: number = 0;
  filteredProduitData: Produit[] = [];
  searchTerm: string = '';
  produitData: Produit[] = [];


  // Pagination properties


  constructor(private formbuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      description: [''],
      stock: [''],
      category: [''],
      images: ['']
    })
    this.getAllProduit();
  }
  currentPage: number = 1;
  pageSize: number = 6;
  totalProduits: number = 0;
  totalPages: number = 0;
  getAllProduit() {
    this.api.getALLProduit()
      .subscribe(res => {
        this.produitData = res;
        if (this.produitData && this.produitData.length > 0) {
          this.currentMaxId = Number(this.produitData[this.produitData.length - 1].id);
          this.filteredProduitData = [...this.produitData];
          this.totalProduits = this.filteredProduitData.length;
          this.totalPages = Math.ceil(this.totalProduits / this.pageSize);
        }
      },
        err => {
          console.error("Error :", err);
        }
      );
  }





  changePage(page: number) {
    this.currentPage = page;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  get pagesArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.filteredProduitData.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }





  filterProduit() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProduitData = this.produitData.filter((produit: any) => {
      return (
        produit.name.toLowerCase().includes(term) ||
        produit.description.toLowerCase().includes(term) ||
        String(produit.stock).toLowerCase().includes(term) ||
        produit.category.toLowerCase().includes(term)
      );
    });
    this.totalProduits = this.filteredProduitData.length;
    this.currentPage = 1;
    this.searchTerm = '';
  }

  deleteProduit(row: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteProduit(row.id)
          .subscribe(res => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.getAllProduit();
          },
            err => {
              Swal.fire(
                'Error!',
                'Failed to delete product.',
                'error'
              );
            }
          )
      }
    });
  }

  onEdit(row: any) {
    this.produitModelObj.id = row.id;

    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['description'].setValue(row.description);
    this.formValue.controls['stock'].setValue(row.stock);
    this.formValue.controls['category'].setValue(row.category);
    this.formValue.controls['images'].setValue(row.images);
  }

  updateProduitDetails() {
    this.produitModelObj.name = this.formValue.value.name;
    this.produitModelObj.description = this.formValue.value.description;
    this.produitModelObj.stock = this.formValue.value.stock;
    this.produitModelObj.category = this.formValue.value.category;
    // Save as array
    this.produitModelObj.images = [this.formValue.value.images];

    this.api.updateProduit(this.produitModelObj, this.produitModelObj.id)
      .subscribe({
        next: (res) => {
          Swal.fire({
            title: 'Updated!',
            text: 'Product details updated successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.getAllProduit();
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to update product.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })
  }
}
