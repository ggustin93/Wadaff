import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { SecureInnerPagesGuard } from './services/secure-inner-pages.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-event-modal',
    loadChildren: './add-event-modal/add-event-modal.module#AddEventModalPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'test-geolocation',
    loadChildren: './test-geolocation/test-geolocation.module#TestGeolocationPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-in',
    loadChildren: './sign-in/sign-in.module#SignInPageModule',
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'sign-up',
    loadChildren: './sign-up/sign-up.module#SignUpPageModule',
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'forgot-password',
    loadChildren: './forgot-password/forgot-password.module#ForgotPasswordPageModule',
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'verify-email',
    loadChildren: './verify-email/verify-email.module#VerifyEmailPageModule',
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
