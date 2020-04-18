import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chocolate cake',
  //     'delicious',
  //     'https://dokanonlineshopping.com/backend/images/products/1548317695easy_chocolate_cake_31070_16x9.jpg',
  //     [
  //       new Ingredient('chocolate',2),
  //       new Ingredient('milk',1)
  //     ]),

  //     new Recipe(
  //     'Another chocolate cake',
  //     'delicious',
  //     'https://dokanonlineshopping.com/backend/images/products/1548317695easy_chocolate_cake_31070_16x9.jpg',
  //     [
  //        new Ingredient('chocolate',4),
  //        new Ingredient('eggs',3),
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecicpe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
