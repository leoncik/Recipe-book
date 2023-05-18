import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    @ViewChild('formRef') shoppingListForm!: NgForm;

    subscription!: Subscription;
    editMode = false;
    editedIngredientIndex!: number;
    editedIngredient!: Ingredient;

    constructor(private shoppingListService: ShoppingListService) {}

    ngOnInit(): void {
        this.subscription =
            this.shoppingListService.startedEditingIngredient.subscribe(
                (ingredientIndex: number) => {
                    this.editedIngredientIndex = ingredientIndex;
                    this.editMode = true;
                    this.editedIngredient =
                        this.shoppingListService.getIngredient(ingredientIndex);
                    this.shoppingListForm.setValue({
                        name: this.editedIngredient.name,
                        amount: this.editedIngredient.amount,
                    });
                }
            );
    }

    onSubmit(form: NgForm) {
        const formValue = form.value;
        const newIngredient = new Ingredient(formValue.name, formValue.amount);
        if (this.editMode) {
            this.shoppingListService.updateIngredient(
                this.editedIngredientIndex,
                newIngredient
            );
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.reset();
    }

    onClear() {
        this.shoppingListForm.reset();
        this.editMode = false;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
