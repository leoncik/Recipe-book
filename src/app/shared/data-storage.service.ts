import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataStorageService {
    baseUrl =
        'https://github-recipe-book-default-rtdb.europe-west1.firebasedatabase.app';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService
    ) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        // We subscribe here instead of the component because there is no logic added
        // in the header component (eg: loading spinner).
        this.http
            .put(`${this.baseUrl}/recipes.json`, recipes)
            .subscribe((response) => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
            .get<Recipe[]>(`${this.baseUrl}/recipes.json`)
            .pipe(
                map((recipes) => {
                    return recipes.map((recipe) => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients
                                ? recipe.ingredients
                                : [],
                        };
                    });
                })
            )
            .subscribe((recipes) => {
                this.recipeService.setRecipes(recipes);
            });
    }
}
