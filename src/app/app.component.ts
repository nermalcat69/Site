import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { BlogService, BlogPost } from './services/blog.service';
import { ToastService } from './services/toast.service';
import { trigger, transition, style, animate, state, group, query, sequence } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ]),
    trigger('drawerAnimation', [
      transition(':enter', [
        // Initial state
        style({
          transform: 'translateY(100%)'
        }),
        // First animate the drawer up
        animate('800ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({
            transform: 'translateY(0)'
          })
        )
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({
            transform: 'translateY(100%)'
          })
        )
      ])
    ]),
    trigger('backdropAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('400ms ease-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('contentAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms 800ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Arjun Aditya';
  isDrawerOpen = false;
  selectedArticle: BlogPost | null = null;
  private isBrowser: boolean;
  private initialScrollPosition = 0;
  
  constructor(
    private blogService: BlogService,
    private toastService: ToastService,
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.blogService.articleSelected$.subscribe(post => {
        if (post) {
          this.selectedArticle = post;
          this.isDrawerOpen = true;
          this.disableScroll();
          // Fetch the full article content
          this.blogService.getPost(post.slug).subscribe(fullPost => {
            if (fullPost) {
              this.selectedArticle = fullPost;
            }
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.isBrowser) {
      this.enableScroll();
    }
  }

  private disableScroll(): void {
    if (this.isBrowser) {
      this.initialScrollPosition = window.scrollY;
      this.renderer.setStyle(this.document.body, 'position', 'fixed');
      this.renderer.setStyle(this.document.body, 'top', `-${this.initialScrollPosition}px`);
      this.renderer.setStyle(this.document.body, 'width', '100%');
    }
  }

  private enableScroll(): void {
    if (this.isBrowser) {
      this.renderer.removeStyle(this.document.body, 'position');
      this.renderer.removeStyle(this.document.body, 'top');
      this.renderer.removeStyle(this.document.body, 'width');
      window.scrollTo(0, this.initialScrollPosition);
    }
  }

  closeArticle() {
    this.isDrawerOpen = false;
    this.enableScroll();
    // Clear the selected article after animation completes
    if (this.isBrowser) {
      setTimeout(() => {
        this.selectedArticle = null;
      }, 10); // Match the leave animation duration
    } else {
      this.selectedArticle = null;
    }
  }

  copyArticleLink() {
    if (this.isBrowser && this.selectedArticle) {
      const url = `${window.location.origin}/blog/${this.selectedArticle.slug}`;
      navigator.clipboard.writeText(url).then(() => {
        this.toastService.show('Link copied to clipboard');
      }).catch(() => {
        this.toastService.show('Failed to copy link', 3000);
      });
    }
  }
}
