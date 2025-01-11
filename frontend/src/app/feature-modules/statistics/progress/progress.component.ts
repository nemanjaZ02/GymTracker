import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatisticsService } from '../statistics.service';
import { Progress } from '../../../infrastructure/models/progress.model';
import { Chart, ChartData, ChartOptions, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

@Component({
  standalone: false,
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css', '../../../../styles.css'],
})
export class ProgressComponent {
  progress: Progress | null = null;

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  progressForm = new FormGroup({
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
  });

  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: { type: 'category' },
      y: { beginAtZero: true },
    },
  };

  totalDurationData: ChartData<'bar'> | null = null;
  totalWorkoutsData: ChartData<'bar'> | null = null;
  averageIntensityData: ChartData<'bar'> | null = null;
  averageFatigueData: ChartData<'bar'> | null = null;

  constructor(private statisticsService: StatisticsService) {}

  getProgress(): void {
    if (this.progressForm.valid) {
      const { month, year } = this.progressForm.value;
      const monthNumber = Number(month);
      const yearNumber = Number(year);

      this.statisticsService.getProgress(monthNumber, yearNumber).subscribe({
        next: (data) => {
          this.progress = data;
          this.prepareChartData();
        },
        error: (err) => {
          console.error('Error fetching progress:', err);
        },
      });
    }
  }

  prepareChartData(): void {
    if (this.progress) {
      const labels = this.progress.weeklyProgress.map((week) => `Week ${week.week}`);
      const totalDurations = this.progress.weeklyProgress.map((week) => week.statistics.totalDuration);
      const totalWorkouts = this.progress.weeklyProgress.map((week) => week.statistics.totalWorkouts);
      const averageIntensities = this.progress.weeklyProgress.map((week) => week.statistics.averageIntensity);
      const averageFatigues = this.progress.weeklyProgress.map((week) => week.statistics.averageFatigue);

      this.totalDurationData = {
        labels,
        datasets: [
          {
            label: 'Total Duration (mins)',
            data: totalDurations,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      this.totalWorkoutsData = {
        labels,
        datasets: [
          {
            label: 'Total Workouts',
            data: totalWorkouts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      this.averageIntensityData = {
        labels,
        datasets: [
          {
            label: 'Average Intensity',
            data: averageIntensities,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      this.averageFatigueData = {
        labels,
        datasets: [
          {
            label: 'Average Fatigue',
            data: averageFatigues,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      };
    }
  }

  getMonthLabel(month: number): string {
    return this.months.find((m) => m.value === month)?.label || '';
  }
}
