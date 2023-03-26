import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
    @Output() selectedRecipeAgain = new EventEmitter<Recipe>();

    recipes!: Recipe[];

    onSelectRecipeAgain(recipe: Recipe) {
        this.selectedRecipeAgain.emit(recipe);
    }

    constructor(private recipeService: RecipeService) {}

    ngOnInit(): void {
        this.recipes = this.recipeService.getRecipes();
    }
}
