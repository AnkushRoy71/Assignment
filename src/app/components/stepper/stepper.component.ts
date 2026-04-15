import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Step {
  label: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.scss',
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() activeIndex: number = 0;
}
