import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../infrastructure/mat/material';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressComponent } from './progress/progress.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';
import { BaseChartDirective } from 'ng2-charts';

@NgModule({
	declarations: [
		ProgressComponent,
		ProgressChartComponent
	],
	imports: [
		CommonModule,
		MaterialModule,
		ReactiveFormsModule,
		BaseChartDirective
	],
	exports: [
		ProgressChartComponent
	]
})
export class StatisticsModule { }