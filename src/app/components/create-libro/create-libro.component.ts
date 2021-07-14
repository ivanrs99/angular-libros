import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-create-libro',
  templateUrl: './create-libro.component.html',
  styleUrls: ['./create-libro.component.css']
})
export class CreateLibroComponent implements OnInit {
  createLibro: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo = 'Agregar libro';

  constructor(private fb: FormBuilder, private _libroService: LibroService, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) { 
    this.createLibro = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      fecha: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarEditarLibro() {
    this.submitted = true;
    if(this.createLibro.invalid){
      return;
    }
    if(this.id === null){
      this.agregarLibro()
    }else{
      this.editarLibro(this.id)
    }
  }

  agregarLibro() {    
    const libro: any = {
      titulo: this.createLibro.value.titulo,
      autor: this.createLibro.value.autor,
      fecha: this.createLibro.value.fecha
    }
    this.loading = true;
    this._libroService.agregarLibro(libro).then(() => {
      this.toastr.success("Libro registrado con éxito.","", {positionClass:'toast-bottom-right'})
      this.loading = false;
      this.router.navigate(['/list-libros']);
    }).catch(error => {
      console.log(error);
      this.loading = false;
    })
  }

  editarLibro(id: string) {
    const libro: any = {
      titulo: this.createLibro.value.titulo,
      autor: this.createLibro.value.autor,
      fecha: this.createLibro.value.fecha
    }
    this.loading = true;
    this._libroService.actualizarLibro(id, libro).then(() => {
      this.loading = false;
      this.toastr.info("Libro actualizado con éxito.","", {positionClass:'toast-bottom-right'});
      this.router.navigate(['/list-libros']);
    })
  }

  esEditar() {
    if(this.id !== null){
      this.titulo = 'Editar libro'
      this._libroService.getLibro(this.id).subscribe(data => {
        this.createLibro.setValue({
          titulo: data.payload.data()['titulo'],
          autor: data.payload.data()['autor'],
          fecha: data.payload.data()['fecha']
        })
      })
    }else {
      this.titulo = 'Agregar libro'
    }
  }
}
