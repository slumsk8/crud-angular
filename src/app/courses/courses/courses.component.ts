import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { CoursesService } from '../services/courses.service';
import { Course } from './model/Course';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category']
  courses$: Observable<Course[]>

  constructor(private coursesService: CoursesService, public dialog: MatDialog) {
    this.courses$ = this.coursesService.findAll().pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos', '/assets/erro.png', 'Occorreu um erro!')
        return of([])
      })
    )
  }

  onInformation(info: string, uri: string, title: string){
    //passo como parametro o nome do curso selecionado e a imagem referente a ele
    this.onError(info, uri, title )
  }

  onError(errorMessage: string, url: string, title: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        title,
        message: errorMessage,
        url
      }
    });
  }

  ngOnInit(): void {
  }
}
