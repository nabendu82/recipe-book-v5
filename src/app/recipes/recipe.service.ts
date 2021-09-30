import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new EventEmitter<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Chicken Biryani', 'This is simply biryani', 'https://geekrobocook.com/wp-content/uploads/2021/05/Muradabadi-chicken-biryani-1200x900.jpg',[
    //         new Ingredient('Chicken', 1),
    //         new Ingredient('Rice', 20)
    //     ]),
    //     new Recipe('Chicken noodles', 'This is simply noodles', 'https://www.licious.in/blog/wp-content/uploads/2020/12/Sesame-Chicken-Noodles.jpg',[
    //         new Ingredient('Chicken', 1),
    //         new Ingredient('Noodles', 20)
    //     ])
    // ];

    private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}
    
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.emit(this.recipes.slice());
    }
    
    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }
    
    addIngredientsToList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.emit(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.emit(this.recipes.slice());
    }
    
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.emit(this.recipes.slice());
    }


}