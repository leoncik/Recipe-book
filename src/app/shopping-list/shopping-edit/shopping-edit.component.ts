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

    unitOptions = [
        {
            label: 'Volume',
            options: ['mL', 'L', 'dL', 'tsp'],
        },
        {
            label: 'Weight',
            options: ['g', 'kg', 'mg'],
        },
        {
            label: 'Length',
            options: ['mm', 'cm', 'm'],
        },
        {
            label: 'Quantity',
            options: ['pcs'],
        },
    ];

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
                        unit: this.editedIngredient.unit,
                    });
                }
            );
    }

    onSubmit(form: NgForm) {
        const formValue = form.value;
        const newIngredient = new Ingredient(
            formValue.name,
            formValue.amount,
            formValue.unit
        );
        if (this.editMode) {
            this.shoppingListService.updateIngredient(
                this.editedIngredientIndex,
                newIngredient
            );
        } else {
            this.shoppingListService.addIngredient(newIngredient);
        }
        this.editMode = false;
        form.resetForm();
    }

    onClear() {
        this.shoppingListForm.resetForm();
        this.editMode = false;
    }

    onDelete() {
        this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
        this.onClear();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
