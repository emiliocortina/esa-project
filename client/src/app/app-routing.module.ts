import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'post/:id', loadChildren: './topic-page/topic-page.module#TopicPagePageModule' },
  { path: 'search', loadChildren: './post-search/post-search.module#PostSearchPageModule' },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}