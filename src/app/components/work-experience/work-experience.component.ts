import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface WorkExperience {
  company: string;
  position: string;
  period: string;
}

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent {
  experiences: WorkExperience[] = [
    {
      company: 'Currently at Zerops',
      position: 'Software Engineer',
      period: 'July 2024 - Present',
    },
  ];
}
