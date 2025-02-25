import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BlogPost } from '../../services/blog.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './bottom-drawer.component.html',
  styleUrls: ['./bottom-drawer.component.css'],
  animations: [
    trigger('drawerAnimation', [
      state('closed', style({
        transform: 'translateY(100%)'
      })),
      state('open', style({
        transform: 'translateY(0)'
      })),
      transition('closed => open', [
        animate('300ms ease-out')
      ]),
      transition('open => closed', [
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class BottomDrawerComponent {
  @Input() isOpen = false;
  @Input() blogPosts: BlogPost[] = [];
  @Output() closeDrawer = new EventEmitter<void>();

  close() {
    this.closeDrawer.emit();
  }
}
