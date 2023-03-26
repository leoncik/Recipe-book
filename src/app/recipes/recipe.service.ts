import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private recipes: Recipe[] = [
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

    getRecipes() {
        // Note : the "slice" method here allows to return a copy of the original array.
        // This prevents editing the original array of the service from outside.
        return this.recipes.slice();
    }

    constructor() {}
}
