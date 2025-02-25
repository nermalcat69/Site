import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="max-w-3xl mx-auto px-4 py-8">
      <article class="prose" *ngIf="post">
        <h1 class="text-4xl font-medium mb-4">{{ post.title }}</h1>
        <div class="text-gray-500 mb-8">{{ post.date }}</div>
        <div [innerHTML]="renderedContent"></div>
      </article>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .prose {
      max-width: 65ch;
      margin: 0 auto;
    }
  `]
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;
  renderedContent: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.blogService.getPost(slug).subscribe(post => {
        if (post) {
          this.post = post;
          this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(post.content);
        } else {
          // If post not found, redirect to home
          this.router.navigate(['/']);
        }
      });
    }
  }
}
