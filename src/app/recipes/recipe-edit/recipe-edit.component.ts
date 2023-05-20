import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
    id!: number;
    editMode = false;
    recipeForm!: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            // If there is no id in the params we are not in edit mode.
            this.editMode = params['id'] != null;
            this.initForm();
        });
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        // Todo: check type of the FormArray.
        let recipeIngredients = new FormArray<FormGroup>([]);

        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe.ingredients) {
                for (const ingredient of recipe.ingredients) {
                    recipeIngredients.push(
                        new FormGroup({
                            name: new FormControl(ingredient.name),
                            amount: new FormControl(ingredient.amount),
                        })
                    );
                }
            }
        }
        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName),
            imagePath: new FormControl(recipeImagePath),
            description: new FormControl(recipeDescription),
            ingredients: recipeIngredients,
        });
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                name: new FormControl(),
                amount: new FormControl(),
            })
        );
    }

    onSubmit() {
        console.log(this.recipeForm);
    }
}
