import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { WorkoutsListComponent } from './workouts-list/workouts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
	declarations: [
		AddWorkoutComponent,
		WorkoutsListComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		BrowserAnimationsModule
	]
})
export class WorkoutModule { }
