import { Routes } from '@angular/router';

export const AdminRoute: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: "full"
  },
  {
    path: '',
    loadComponent: () => import('./components/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/dashboard/dashboard.routes').then(m => m.DashboardRoutes),
      },
      {
        path: 'parking-zones',
        loadChildren: () => import('./modules/parking-zones/parking-zones.routes').then(m => m.ParkingZonesRoute),
        data: { path: '/admin/parking-zones' }
      },
      {
        path: 'parking-history',
        loadChildren: () => import('./modules/parking-history/parking-history.routes').then(m => m.ParkingHistoryRoute),
        data: { path: '/admin/parking-history' }
      },
      {
        path: 'cars',
        loadChildren: () => import('./modules/cars/cars.routes').then(m => m.CarsRoutes),
        data: { path: '/admin/cars' }
      },
    ]
  },


];
