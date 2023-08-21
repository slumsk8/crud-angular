import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../courses/model/Course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {

  private readonly API = '../../../assets/courses.json'

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get<Course[]>(this.API)
      .pipe(
        first(), //retorna somente o primeiro resultado do servidor
        delay(1000),
        tap(courses => console.log(courses))
      )
  }
}
