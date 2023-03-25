import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 4),
        new Ingredient('Potatoes', 6),
    ];

    onAddIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}
