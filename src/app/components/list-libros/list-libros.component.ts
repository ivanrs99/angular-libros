import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LibroService } from 'src/app/services/libro.service';

@Component({
  selector: 'app-list-libros',
  templateUrl: './list-libros.component.html',
  styleUrls: ['./list-libros.component.css']
})
export class ListLibrosComponent implements OnInit {
  libros:any[] = [];
  constructor(private _libroService: LibroService, private toastr: ToastrService  ) { }

  ngOnInit(): void {
    this.getLibros();
  }

  getLibros() {
    this._libroService.getLibros().subscribe(data => {
      this.libros = [];
      data.forEach((elem:any) => {
        this.libros.push({
          id: elem.payload.doc.id,
          ...elem.payload.doc.data()
        })
      });
    })
  }

  eliminarLibro(id: string) {
    this._libroService.eliminarLibro(id).then(() => {
      this.toastr.error('Libro eliminado con éxito', '', {positionClass: 'toast-bottom-right'})
    }).catch(error => {
      console.log(error)
    })
  }
}
