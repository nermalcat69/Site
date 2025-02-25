import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkExperienceComponent } from '../../components/work-experience/work-experience.component';
import { BlogService, BlogPost } from '../../services/blog.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, WorkExperienceComponent],
  template: `
    <main class="min-h-screen" [@fadeIn]>
      <div class="content pt-10 md:pt-20 lg:pt-30 xl:pt-40">
        <div class="left-side">
          <img src="/kid.avif" width="150px" height="150px" alt="Childhood Pic" class="rounded-full grayscale" draggable="false">
          <h1 class="text-4xl sm:text-5xl md:text-8xl 2xl:text-8xl font-medium pt-4">Arjun Aditya.</h1>
          <p class="text-lg md:text-xl font-medium pt-10 md:pt-20 lg:pt-30">
            A Mix of Design, Programming, Financial Markets, Economics, and Philosophy.
            Started my journey with Computers in 2015 at age 9 with a Computer with no Internet.
            Currently working at Zerops.
          </p>
          <p class="text-lg md:text-xl font-medium pb-10 pt-4">
            > Checkout <a href="/work">nermalcat69.dev</a>.
          </p>
          
          <!-- Articles Section -->
          <div class="mt-12">
            <h2 class="text-2xl font-medium mb-8">Articles</h2>
            <div class="space-y-6">
              @for (post of blogService.getAllPosts() | async; track post.slug) {
                <article class="cursor-pointer" (click)="openArticle(post)">
                  <div class="flex justify-between items-baseline">
                    <h3 class="text-lg font-medium hover:text-gray-600 transition-colors">{{ post.title }}</h3>
                    <span class="text-sm text-gray-500">{{ post.date }}</span>
                  </div>
                  <p class="text-gray-600 mt-2">{{ post.description }}</p>
                </article>
              }
            </div>
          </div>

          <!-- Work Experience Section -->
          <app-work-experience></app-work-experience>
        </div>
        <div class="right-side">
          <div class="social-links">
            <a href="https://github.com/nermalcat69" aria-label="Github" target="_blank" rel="noopener">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3047 0C5.50634 0 0 5.50942 0 12.3047C0 17.7423 3.52529 22.3535 8.41332 23.9787C9.02856 24.0946 9.25414 23.7142 9.25414 23.3871C9.25414 23.0949 9.24389 22.3207 9.23876 21.2953C5.81601 22.0377 5.09414 19.6444 5.09414 19.6444C4.53427 18.2243 3.72524 17.8449 3.72524 17.8449C2.61064 17.082 3.81137 17.0973 3.81137 17.0973C5.04697 17.1835 5.69604 18.3647 5.69604 18.3647C6.79321 20.2463 8.57636 19.7029 9.27978 19.3881C9.39052 18.5924 9.70736 18.0499 10.0591 17.7423C7.32641 17.4347 4.45429 16.3765 4.45429 11.6618C4.45429 10.3185 4.9311 9.22133 5.72065 8.36C5.58222 8.04931 5.16694 6.79833 5.82831 5.10337C5.82831 5.10337 6.85883 4.77319 9.2121 6.36459C10.1965 6.09082 11.2424 5.95546 12.2883 5.94931C13.3342 5.95546 14.3801 6.09082 15.3644 6.36459C17.7023 4.77319 18.7328 5.10337 18.7328 5.10337C19.3942 6.79833 18.9789 8.04931 18.8559 8.36C19.6403 9.22133 20.1171 10.3185 20.1171 11.6618C20.1171 16.3888 17.2409 17.4296 14.5031 17.7321C14.9338 18.1012 15.3337 18.8559 15.3337 20.0084C15.3337 21.6552 15.3183 22.978 15.3183 23.3779C15.3183 23.7009 15.5336 24.0854 16.1642 23.9623C21.0871 22.3484 24.6094 17.7341 24.6094 12.3047C24.6094 5.50942 19.0999 0 12.3047 0Z"/>
              </svg>
            </a>
            <a href="https://x.com/arjvnz" aria-label="Twitter" target="_blank" rel="noopener">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.zerops.io/" aria-label="Zerops" target="_blank" rel="noopener">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 520 621" fill="none">
                <path fill="#737373" d="M242.657 3.198 31.239 84A49.196 49.196 0 0 0 0 129.876V333.3l97.161-55.837v-114.38L260 100.605V0a49.2 49.2 0 0 0-17.342 3.198ZM98.883 458.751 260 365.894V253.729L11.069 397.257A22.383 22.383 0 0 0 0 416.443v75.146a49.195 49.195 0 0 0 31.24 45.383l211.417 80.804a49.197 49.197 0 0 0 17.342 3.198V520.369L98.883 458.751ZM509.668 221.749a20.537 20.537 0 0 0 10.331-18.079v-73.794a49.19 49.19 0 0 0-31.239-45.875L277.218 3.198A49.191 49.191 0 0 0 260 0v100.605l159.886 61.494L260 254.218v112.166l249.668-144.635ZM277.218 617.776l211.542-80.804a49.19 49.19 0 0 0 31.239-45.383V286.074l-97.161 56.083v115.979L260 520.369v100.605a49.205 49.205 0 0 0 17.218-3.198Z"/>
              </svg>
            </a>
            <a href="https://instagram.com/nermalcat69" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#737373" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      --bright-blue: oklch(51.01% 0.274 263.83);
      --electric-violet: oklch(53.18% 0.28 296.97);
      --french-violet: oklch(47.66% 0.246 305.88);
      --vivid-pink: oklch(69.02% 0.277 332.77);
      --hot-red: oklch(61.42% 0.238 15.34);
      --orange-red: oklch(63.32% 0.24 31.68);

      --gray-900: oklch(19.37% 0.006 300.98);
      --gray-700: oklch(36.98% 0.014 302.71);
      --gray-400: oklch(70.9% 0.015 304.04);
    }

    main {
      width: 100%;
      min-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      box-sizing: inherit;
      position: relative;
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 1050px;
      margin-bottom: 3rem;
    }

    .social-links {
      display: flex;
      align-items: center;
      gap: 0.73rem;
      margin-top: 1.5rem;
    }

    .social-links path {
      transition: fill 0.3s ease;
      fill: var(--gray-400);
    }

    .social-links a:hover svg path {
      fill: var(--gray-900);
    }

    @media screen and (max-width: 650px) {
      .content {
        flex-direction: column;
        width: max-content;
      }
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent {
  constructor(public blogService: BlogService) {}

  openArticle(post: BlogPost) {
    this.blogService.selectArticle(post);
  }
} 