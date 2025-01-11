import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressComponent } from './progress/progress.component';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
	declarations: [
		ProgressComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		BaseChartDirective
	]
})
export class StatisticsModule { }