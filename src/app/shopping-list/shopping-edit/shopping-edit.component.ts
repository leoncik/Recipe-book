import { Component } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent {
    constructor(private shoppingListService: ShoppingListService) {}

    onAddIngredient(form: NgForm) {
        const formValue = form.value;
        const newIngredient = new Ingredient(formValue.name, formValue.amount);
        this.shoppingListService.addIngredient(newIngredient);
    }
}
