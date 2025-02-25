import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface BlogPost {
  title: string;
  date: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  blogPosts: BlogPost[] = [
    {
      title: 'Building a Modern Web Application with Angular',
      date: '2024-03-15',
      description: 'Exploring the latest features in Angular and building responsive web applications.',
      link: '/blog/modern-web-app'
    },
    {
      title: 'The Future of Financial Markets',
      date: '2024-03-10',
      description: 'Analysis of emerging trends in global financial markets and their implications.',
      link: '/blog/financial-markets'
    },
    {
      title: 'Philosophy of Technology',
      date: '2024-03-05',
      description: 'Examining the intersection of philosophy and modern technology.',
      link: '/blog/tech-philosophy'
    }
  ];
}
