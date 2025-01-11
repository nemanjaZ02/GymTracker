import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { Workout } from '../../infrastructure/models/workout.model';

@Injectable({
	providedIn: 'root'
})
export class WorkoutService {
	constructor( private http: HttpClient ) { }

	add(workout: Workout): Observable<Workout> {
    return this.http
    .post<Workout>(environment.apiHost + 'workout/add', workout)
    .pipe(
      tap((workoutResponse) => {
        console.log(workoutResponse);
      })
    );
  }

  getAll(): Observable<Workout[]> {
    return this.http
    .get<Workout[]>(environment.apiHost + 'workout/getAll')
    .pipe(
      tap((workoutResponse) => {
        console.log(workoutResponse);
      })
    );
  }
}
