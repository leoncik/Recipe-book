import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private router: Router
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
                            name: new FormControl(
                                ingredient.name,
                                Validators.required
                            ),
                            amount: new FormControl(ingredient.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0_9]*$/),
                            ]),
                            unit: new FormControl(
                                ingredient.unit,
                                Validators.required
                            ),
                        })
                    );
                }
            }
        }
        this.recipeForm = new FormGroup({
            name: new FormControl(recipeName, Validators.required),
            imagePath: new FormControl(recipeImagePath, Validators.required),
            description: new FormControl(
                recipeDescription,
                Validators.required
            ),
            ingredients: recipeIngredients,
        });
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                name: new FormControl(null, Validators.required),
                amount: new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0_9]*$/),
                ]),
                unit: new FormControl(null, Validators.required),
            })
        );
    }
    onDeleteIngredient(ingredientIndex: number) {
        // * Note: removeAt is a method provided by FormArray which is an
        // * object provided by Angular, so It's not a JavaScript method.
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(
            ingredientIndex
        );
    }

    onCancel() {
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    onSubmit() {
        // * Not needed since the form values perfectly matches the expected format for the
        // * new recipe.
        // const newRecipe = new Recipe(
        //     this.recipeForm.value['name'],
        //     this.recipeForm.value['description'],
        //     this.recipeForm.value['imagePath'],
        //     this.recipeForm.value['ingredients'],
        // )
        if (this.editMode) {
            this.recipeService.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);
        }
        this.onCancel();
    }
}
