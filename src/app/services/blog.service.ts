import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { marked } from 'marked';
import { map } from 'rxjs/operators';

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  content: string;
  slug: string;
}

/**
 * Service responsible for managing and rendering blog posts.
 * Uses marked for Markdown rendering.
 */
@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private readonly blogPosts: Map<string, BlogPost>;
  private articleSelectedSubject = new Subject<BlogPost>();
  articleSelected$ = this.articleSelectedSubject.asObservable();

  constructor() {
    // Initialize blog posts
    this.blogPosts = new Map([
      ['modern-web-app', {
        title: 'Building a Modern Web Application with Angular',
        description: 'Exploring the latest features in Angular and building responsive web applications.',
        date: '2024-03-15',
        content: `# Building a Modern Web Application with Angular

Angular has evolved significantly since its inception, and with version 17, it brings even more powerful features to the table. In this post, we'll explore how to build a modern web application using Angular's latest features.

## Key Features We'll Cover

- Standalone Components
- Server-Side Rendering
- Signals for State Management
- Control Flow Syntax

## Why Standalone Components?

Standalone components represent a shift in how we structure Angular applications. They offer:

1. Better tree-shaking
2. Simpler configuration
3. More intuitive dependency management

## Server-Side Rendering

With Angular's built-in SSR support, we can:

- Improve initial page load times
- Enhance SEO capabilities
- Provide better user experience

## Conclusion

Modern web development with Angular has never been more exciting. The framework continues to evolve while maintaining its core principles of scalability and maintainability.`,
        slug: 'modern-web-app'
      }]
    ]);

    // Initialize marked options
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true // Convert line breaks to <br>
    });
  }

  /**
   * Retrieves a blog post by its slug and renders its markdown content
   * @param slug - The unique identifier for the blog post
   * @returns Observable of the blog post with rendered content, or undefined if not found
   */
  getPost(slug: string): Observable<BlogPost | undefined> {
    const post = this.blogPosts.get(slug);
    if (!post) {
      return of(undefined);
    }

    try {
      // Remove the first h1 title from the content
      const contentWithoutTitle = post.content.replace(/^#\s+[^\n]+\n/, '');
      const renderedContent = marked.parse(contentWithoutTitle);
      return of({
        ...post,
        content: typeof renderedContent === 'string' ? renderedContent : ''
      });
    } catch (error) {
      console.error('Error rendering markdown:', error);
      return of(undefined);
    }
  }

  /**
   * Retrieves all blog posts
   * @returns Observable of all blog posts
   */
  getAllPosts(): Observable<BlogPost[]> {
    return of(Array.from(this.blogPosts.values()));
  }

  selectArticle(post: BlogPost) {
    this.articleSelectedSubject.next(post);
  }
}
