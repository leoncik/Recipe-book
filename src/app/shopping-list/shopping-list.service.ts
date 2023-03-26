import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 4),
        new Ingredient('Potatoes', 6),
    ];

    getIngredients() {
        // We could remove "slice" in order to make the addIngredient method works.
        // However the issue can be resolved with an eventEmitter to preserve the original array.
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    constructor() {}
}
