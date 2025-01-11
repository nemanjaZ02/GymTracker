import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { AddWorkoutComponent } from './add-workout/add-workout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AddWorkoutComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule
	]
})
export class WorkoutModule { }
