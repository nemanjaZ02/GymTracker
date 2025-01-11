import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Workout } from '../../../infrastructure/models/workout.model';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../../infrastructure/models/user.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	standalone: false,
	selector: 'workouts-list',
	templateUrl: './workouts-list.component.html',
	styleUrls: ['./workouts-list.component.css', '../../../../styles.css'],
	animations: [
    trigger('slideInOut', [
      state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
      state('*', style({ transform: 'translateY(0)', opacity: 1 })),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [animate('300ms ease-in')]),
    ]),
  ]
})
export class WorkoutsListComponent implements OnInit {
	workouts: Workout[] = [];
	user: User | undefined;
	selectedWorkout: Workout | null = null;

	constructor( private router: Router, private workoutService: WorkoutService, private authService: AuthService ) {}

	ngOnInit(): void {
		this.authService.user$.subscribe(user => {
			this.user = user;
		})

		this.getAllWorkouts();
	}

	getAllWorkouts(): void {
    this.workoutService.getAll().subscribe({
      next: (workouts) => {
        this.workouts = workouts;
      },
      error: () => {
        console.error('There was an error getting the workouts.');
      }
    });
  }

	navigateToAddWorkout(): void {
		this.router.navigateByUrl('/workouts/add');
	}

	selectWorkout(workout: Workout): void {
    this.selectedWorkout = workout;
  }

  clearSelectedWorkout(): void {
    this.selectedWorkout = null;
  }
}
