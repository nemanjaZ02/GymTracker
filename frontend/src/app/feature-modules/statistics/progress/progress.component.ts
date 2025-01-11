import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatisticsService } from '../statistics.service';
import { Progress } from '../../../infrastructure/models/progress.model';

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

  constructor(private statisticsService: StatisticsService) {}

  getProgress(): void {
    if (this.progressForm.valid) {
      const { month, year } = this.progressForm.value;
      const monthNumber = Number(month);
      const yearNumber = Number(year);

      this.statisticsService.getProgress(monthNumber, yearNumber).subscribe({
        next: (data) => {
          this.progress = data;
        },
        error: (err) => {
          console.error('Error fetching progress:', err);
        },
      });
    }
  }

  getMonthLabel(month: number): string {
    return this.months.find((m) => m.value === month)?.label || '';
  }
}
