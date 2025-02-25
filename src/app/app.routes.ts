import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog/:slug',
    component: BlogPostComponent
  },
  {
    path: 'colophon',
    loadComponent: () => import('./pages/colophon/colophon.component').then(m => m.ColophonComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
