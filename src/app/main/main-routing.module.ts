import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
                    { path: 'category/:Id', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
                    { path: 'event-management', loadChildren: () => import('./event-management/event-management.module').then(m => m.EventManagementModule) },
                    { path: 'voucher', loadChildren: () => import('./voucher/voucher.module').then(m => m.VoucherModule) },
                    { path: 'venue', loadChildren: () => import('./venue/venue.module').then(m => m.VenueModule) },
                    { path: 'box-office', loadChildren: () => import('./box-office/box-office.module').then(m => m.BoxOfficeModule) },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },

        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule {}
