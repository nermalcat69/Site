import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="show"
      [@toastAnimation]="animationState"
      class="fixed bottom-24 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm z-[100] flex items-center gap-2 min-w-[200px] justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      {{ message }}
    </div>
  `,
  animations: [
    trigger('toastAnimation', [
      state('visible', style({
        opacity: 1,
        bottom: '6rem'
      })),
      state('hidden', style({
        opacity: 0,
        bottom: '5rem'
      })),
      transition('void => *', [
        style({ 
          opacity: 0,
          bottom: '5rem'
        }),
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({ 
            opacity: 1,
            bottom: '6rem'
          })
        )
      ]),
      transition('visible => hidden', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ])
  ]
})
export class ToastComponent implements OnInit {
  @Input() message = '';
  @Input() duration = 2000;
  show = false;
  animationState = 'visible';

  ngOnInit() {
    this.show = true;
    this.animationState = 'visible';

    // Start fade out animation before hiding
    setTimeout(() => {
      this.animationState = 'hidden';
    }, this.duration - 300); // Start animation 300ms before duration ends

    // Hide the toast after animation completes
    setTimeout(() => {
      this.show = false;
    }, this.duration);
  }
} 