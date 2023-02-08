import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canLoad:[ UserGuard ],
  },
  {
    path: 'detail-movie',
    loadChildren: () => import('./pages/detail-movie/detail-movie.module').then( m => m.DetailMoviePageModule)
  },
  {
    path: 'edit-movie',
    loadChildren: () => import('./modals/edit-movie/edit-movie.module').then( m => m.EditMoviePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'prefix'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
