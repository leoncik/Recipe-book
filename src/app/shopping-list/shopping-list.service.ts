import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditingIngredient = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 4),
        new Ingredient('Potatoes', 6),
    ];

    getIngredients() {
        // We could remove "slice" in order to make the addIngredient method works.
        // However the issue can be resolved with an eventEmitter to preserve the original array.
        return this.ingredients.slice();
    }

    getIngredient(ingredientIndex: number) {
        return this.ingredients[ingredientIndex];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(ingredientIndex: number) {
        this.ingredients.splice(ingredientIndex, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    constructor() {}
}
