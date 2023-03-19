import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent {
    @Output() selectedRecipeAgain = new EventEmitter<Recipe>();

    recipes: Recipe[] = [
        new Recipe(
            'Pierogi',
            'Delicious Polish dumplings.',
            'https://upload.wikimedia.org/wikipedia/commons/b/ba/04565_Christmas_dumplings_with_dried_plums.JPG'
        ),
        new Recipe(
            'Tomato soup',
            'Tomato soup is a soup with tomatoes. What a suprise.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tomato_soup.jpg/800px-Tomato_soup.jpg'
        ),
    ];

    onSelectRecipeAgain(recipe: Recipe) {
        this.selectedRecipeAgain.emit(recipe);
    }
}
