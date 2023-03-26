import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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

    constructor(private shoppingListService: ShoppingListService) {}

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
