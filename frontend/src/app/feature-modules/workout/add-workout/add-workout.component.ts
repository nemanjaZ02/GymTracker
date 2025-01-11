import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Workout } from '../../../infrastructure/models/workout.model';
import { WorkoutService } from '../workout.service';

@Component({
	standalone: false,
	selector: 'add-workout-form',
	templateUrl: './add-workout.component.html',
	styleUrls: ['./add-workout.component.css', '../../../../styles.css']
})
export class AddWorkoutComponent {
	constructor( private router: Router, private snackBar: MatSnackBar, private workoutService: WorkoutService ) {}
	
	workoutForm = new FormGroup({
		date: new FormControl('', [Validators.required]), 
		duration: new FormControl(0, [Validators.required, Validators.min(0)]), 
		type: new FormControl(0, [Validators.required]), 
		notes: new FormControl(''), 
		caloriesBurned: new FormControl(0, [Validators.required, Validators.min(0)]),
		intensity: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]), 
		fatigue: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(10)]), 
	});

	addWorkout(): void {
			const workout: Workout = {
				id: 0,
				userId: 0,
				date: this.workoutForm.value.date ? new Date(this.workoutForm.value.date).toISOString() : '',
				duration: this.workoutForm.value.duration || 0,
				type: this.workoutForm.value.duration || 0,
				notes: this.workoutForm.value.notes || '',
				caloriesBurned: this.workoutForm.value.caloriesBurned || 0,
				intensity: this.workoutForm.value.intensity || 0,
				fatigue: this.workoutForm.value.fatigue || 0,
			};

			if (this.workoutForm.valid) {
				this.workoutService.add(workout).subscribe({
					next: () => {
						this.router.navigateByUrl('/home');
					},error: (error) => {
						console.log(error);

						this.snackBar.open("Try Again!", 'Close', {
							duration: 3000,
							panelClass: ['mat-toolbar', 'mat-warn'],
						});
					}
				});
			}
		}
}
