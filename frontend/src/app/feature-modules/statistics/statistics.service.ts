import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Progress } from '../../infrastructure/models/progress.model';
import { environment } from '../../../env/environment';

@Injectable({
	providedIn: 'root'
})
export class StatisticsService {
	constructor(private http: HttpClient, private router: Router) { }

	getProgress(month: number, year: number): Observable<Progress> {
		return this.http
			.get<Progress>(`${environment.apiHost}statistics/progress?month=${month}&year=${year}`)
			.pipe(
				tap((progressResponse) => {
					console.log(progressResponse)
				})
			);
	}
}
