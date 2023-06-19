import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    {
        path: '',
        component: RecipesComponent,
        children: [
            {
                path: '',
                component: RecipeStartComponent,
            },
            {
                path: 'new',
                component: RecipeEditComponent,
            },
            // Route order matters, if "new were placed after ':id', this would not work
            // because 'new' would be interpreted as a dynamic argument.
            {
                path: ':id',
                component: RecipeDetailComponent,
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RecipesRoutingModule {}
