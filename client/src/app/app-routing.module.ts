import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [

    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'post/:id', loadChildren: './tabs/topics/topic-page/topic-page.module#TopicPagePageModule'},
    {path: 'search', loadChildren: './tabs/topics/topic-search/topic-search.module#TopicSearchPageModule'},
  { path: 'login', loadChildren: './tabs/profile/login/login.module#LoginPageModule' }

];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
