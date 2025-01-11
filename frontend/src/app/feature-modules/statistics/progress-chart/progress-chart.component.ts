import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { Progress } from '../../../infrastructure/models/progress.model';

@Component({
  standalone: false,
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css'],
})
export class ProgressChartComponent implements OnChanges {
  @Input() progress: Progress | null = null;

  chartData: ChartData<'bar'> | undefined;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {},
      y: { beginAtZero: true },
    },
  };
  chartType: ChartConfiguration['type'] = 'bar';

  ngOnChanges(): void {
    if (this.progress) {
      this.prepareChartData();
    } else {
      this.chartData = undefined; 
    }
  }

  prepareChartData(): void {
    const labels = this.progress!.weeklyProgress.map((week) => `Week ${week.week}`);
    const durations = this.progress!.weeklyProgress.map((week) => week.statistics.totalDuration);
    const workouts = this.progress!.weeklyProgress.map((week) => week.statistics.totalWorkouts);

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Total Duration (mins)',
          data: durations,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Total Workouts',
          data: workouts,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  }
}
