import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    // Because of the "slice" used to get recipes, using a Subject is needed here
    // to reflect changes on page
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Pierogi',
            'Delicious Polish dumplings.',
            'https://upload.wikimedia.org/wikipedia/commons/b/ba/04565_Christmas_dumplings_with_dried_plums.JPG',
            [
                new Ingredient('Eggs', 2),
                new Ingredient('Water', 150),
                new Ingredient('Flour', 500),
                new Ingredient('Potatoes', 8),
            ]
        ),
        new Recipe(
            'Tomato soup',
            'Tomato soup is a soup with tomatoes. What a suprise.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tomato_soup.jpg/800px-Tomato_soup.jpg',
            [new Ingredient('Tomatoes', 4), new Ingredient('Oil', 1)]
        ),
    ];

    getRecipes() {
        // Note : the "slice" method here allows to return a copy of the original array.
        // This prevents editing the original array of the service from outside.
        return this.recipes.slice();
    }

    // The id retrieved as params acts as index
    getRecipe(id: number) {
        return this.recipes[id];
    }

    constructor(private shoppingListService: ShoppingListService) {}

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(recipeIndex: number, newRecipe: Recipe) {
        this.recipes[recipeIndex] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
}
