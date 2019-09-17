import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [

    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'profile', loadChildren: './components/profile/profile.module#ProfilePageModule'},
    {path: 'thread/:id', loadChildren: './tabs/explore/thread-page/thread-page.module#ThreadPageModule'},
    {path: 'search', loadChildren: './tabs/explore/thread-search/thread-search.module#ThreadSearchPageModule'},
  { path: 'agencies', loadChildren: './tabs/agencies/agencies.module#AgenciesPageModule' }

];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
