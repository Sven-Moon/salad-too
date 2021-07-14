import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { StaticData } from "../models/StaticData";

@Injectable({ providedIn: 'root' })
export class MockStaticDataInterceptor implements HttpInterceptor {
  constructor(private store: Store<{}>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    if (req.method === 'GET' && req.url == 'https://localhost:3000/static-data/') {
      const orderStaticData = this.getStaticData()
      const response = new HttpResponse({
        body: orderStaticData
      })
      return of(response)
    }
    return next.handle(req)
  }


  public getStaticData(): StaticData {
    let data: StaticData = {
      "items": [
        {
          "id": "ham_sourdough",
          "name": "Ham on Sourdough",
          "ingredients": ["ham", "sourdough", "cheddar"],
          "itemGroup": "sandwich",
          "img": "./assets/images/recipes/ham_sourdough.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
        },
        {
          "id": "turkey_sandwich",
          "name": "Turkey on White",
          "ingredients": [
            "turkey",
            "kaiser_roll",
            "provolone",
            "mustard",
            "lettuce"
          ],
          "itemGroup": "sandwich",
          "img": "./assets/images/recipes/turkey_sandwich.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
        },
        {
          "id": "cobb",
          "name": "Cobb Salad",
          "ingredients": [
            "ham",
            "turkey",
            "mixed_greens",
            "tomatoes",
            "cheddar",
            "cucumbers",
            "ranch"
          ],
          "itemGroup": "salad",
          "img": "./assets/images/recipes/cobb.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
        },
        {
          "id": "atlanta_salad",
          "name": "Atlanta Salad",
          "ingredients": [
            "red_lettuce",
            "vinaigrette",
            "almonds",
            "cranberries",
            "ham"
          ],
          "itemGroup": "salad",
          "img": "./assets/images/recipes/atlanta_salad.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't."
        },
        {
          "id": "mac-cheese",
          "name": "Mac & cheese",
          "price": "3.95",
          "img": "./assets/images/sides/mac-cheese.png",
          "itemGroup": "side"
        },
        {
          "id": "fries",
          "name": "French Fries",
          "price": "2.75",
          "img": "./assets/images/sides/fries.png",
          "itemGroup": "side"
        },
        {
          "id": "fruit",
          "name": "Mixed Fruit",
          "price": "3.95",
          "img": "./assets/images/sides/fruit.png",
          "itemGroup": "side"
        },
        {
          "id": "sprite",
          "name": "Sprite",
          "type": "soda",
          "img": "./assets/images/drinks/sprite.png",
          "itemGroup": "drink"
        },
        {
          "id": "coke",
          "name": "Coke",
          "type": "soda",
          "img": "./assets/images/drinks/coke.png",
          "itemGroup": "drink"
        },
        {
          "id": "diet-coke",
          "name": "Diet Coke",
          "type": "soda",
          "img": "./assets/images/drinks/diet-coke.png",
          "itemGroup": "drink"
        },
        {
          "id": "orange-juice",
          "name": "Orange Juice",
          "type": "juice",
          "img": "./assets/images/drinks/orange-juice.png",
          "itemGroup": "drink"
        },
        {
          "id": "cranberry-juice",
          "name": "Cranberry Juice",
          "type": "juice",
          "img": "./assets/images/drinks/cranberry-juice.png",
          "itemGroup": "drink"
        },
        {
          "id": "latte",
          "name": "Latte",
          "type": "espresso",
          "img": "./assets/images/drinks/latte.png",
          "itemGroup": "drink"
        },
        {
          "id": "cappuccino",
          "name": "Cappuccino",
          "type": "espresso",
          "img": "./assets/images/drinks/cappuccino.png",
          "itemGroup": "drink"
        },
        {
          "id": "sparkling",
          "name": "Sparkling Water",
          "type": "water",
          "img": "./assets/images/drinks/sparkling.png",
          "itemGroup": "drink"
        },
        {
          "id": "bottled",
          "name": "Bottled Water",
          "type": "water",
          "img": "./assets/images/drinks/bottled.png",
          "itemGroup": "drink"
        },
        {
          "id": "chocolateCake",
          "name": "Chocolate Cake",
          "img": "./assets/images/desserts/chocolateCake",
          "price": "4.75",
          "itemGroup": "dessert"
        },
        {
          "id": "bananaPudding",
          "name": "Banana Pudding",
          "img": "./assets/images/desserts/bananaPudding",
          "price": "3.85",
          "itemGroup": "dessert"

        },
        {
          "id": "cremeBrulee",
          "name": "Creme Brulee",
          "img": "./assets/images/desserts/cremeBrulee",
          "price": "5.45",
          "itemGroup": "dessert"
        }
      ],
      "itemGroups": [
        {
          "id": "salad",
          "name": "Salads",
          "img": "./assets/images/salads_type.png"
        },
        {
          "id": "sandwich",
          "name": "Sandwiches",
          "img": "./assets/images/sandwiches_type.png"
        },
        {
          "id": "side",
          "name": "Sides",
          "img": "./assets/images/sides_type.png"
        },
        {
          "id": "drink",
          "name": "Drinks",
          "img": "./assets/images/drinks_type.png"
        },
        {
          "id": "dessert",
          "name": "Desserts",
          "img": "./assets/images/desserts_type.png"
        },

      ],
      "ingredients": [
        {
          "id": "ham",
          "name": "Ham",
          "img": "./assets/images/ingredients/ham.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "meats"
        },
        {
          "id": "turkey",
          "name": "Turkey",
          "img": "./assets/images/ingredients/turkey.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "meats"
        },
        {
          "id": "roast_beef",
          "name": "Roast Beef",
          "img": "./assets/images/ingredients/roast_beef.png",
          "itemGroup": ["sandwich"],
          "type": "meats"
        },
        {
          "id": "red_lettuce",
          "name": "Red Lettuce",
          "img": "./assets/images/ingredients/red_lettuce.png",
          "itemGroup": ["salad"],
          "type": "greens"
        },
        {
          "id": "green_lettuce",
          "name": "Green Lettuce",
          "img": "./assets/images/ingredients/green_lettuce.png",
          "itemGroup": ["salad"],
          "type": "greens"
        },
        {
          "id": "mixed_greens",
          "name": "Mixed greens",
          "img": "./assets/images/ingredients/mixed_greens.png",
          "itemGroup": ["salad"],
          "type": "greens"
        },
        {
          "id": "lettuce",
          "name": "Lettuce",
          "img": "./assets/images/ingredients/lettuce.png",
          "itemGroup": ["sandwich"],
          "type": "veggies"
        },
        {
          "id": "tomatoes",
          "name": "Tomatoes",
          "img": "./assets/images/ingredients/tomatoes.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "veggies"
        },
        {
          "id": "pickles",
          "name": "Pickles",
          "img": "./assets/images/ingredients/pickles.png",
          "itemGroup": ["sandwich"],
          "type": "veggies"
        },
        {
          "id": "onions",
          "name": "Onions",
          "img": "./assets/images/ingredients/onions.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "veggies"
        },
        {
          "id": "cucumbers",
          "name": "Cucumbers",
          "img": "./assets/images/ingredients/cucumbers.png",
          "itemGroup": ["salad"],
          "type": "veggies"
        },
        {
          "id": "cheddar",
          "name": "Cheddar",
          "img": "./assets/images/ingredients/cheddar.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "cheeses"
        },
        {
          "id": "provolone",
          "name": "Provolone",
          "img": "./assets/images/ingredients/provolone.png",
          "itemGroup": ["sandwich"],
          "type": "cheeses"
        },
        {
          "id": "blue_cheese",
          "name": "Blue cheese",
          "img": "./assets/images/ingredients/blue_cheese.png",
          "itemGroup": ["sandwich"],
          "type": "cheeses"
        },
        {
          "id": "sourdough",
          "name": "Sourdough",
          "img": "./assets/images/ingredients/sourdough.png",
          "itemGroup": ["sandwich"],
          "type": "breads"
        },
        {
          "id": "kaiser_roll",
          "name": "Kaiser Roll",
          "img": "./assets/images/ingredients/kaiser_roll.png",
          "itemGroup": ["sandwich"],
          "type": "breads"
        },
        {
          "id": "mustard",
          "name": "Mustard",
          "img": "./assets/images/ingredients/mustard.png",
          "itemGroup": ["sandwich"],
          "type": "condiments"
        },
        {
          "id": "mayo",
          "name": "Mayo",
          "img": "./assets/images/ingredients/mayo.png",
          "itemGroup": ["sandwich"],
          "type": "condiments"
        },
        {
          "id": "ranch",
          "name": "Ranch",
          "img": "./assets/images/ingredients/ranch.png",
          "itemGroup": ["salad"],
          "type": "dressings"
        },
        {
          "id": "almonds",
          "name": "Almonds",
          "img": "./assets/images/ingredients/almonds.png",
          "itemGroup": ["salad"],
          "type": "nuts_fruit"
        },
        {
          "id": "cranberries",
          "name": "Cranberries",
          "img": "./assets/images/ingredients/cranberries.png",
          "itemGroup": ["salad"],
          "type": "nuts_fruit"
        },
        {
          "id": "vinaigrette",
          "name": "Vinaigrette",
          "img": "./assets/images/ingredients/vinaigrette.png",
          "itemGroup": ["salad"],
          "type": "dressings"
        }
      ],
      "ingredientTypes": [
        {
          "id": "condiments",
          "name": "Condiments",
          "selectType": "multiple",
          "price": "0.25",
          "img": "./assets/images/ingredients/types/condiments.png"
        },
        {
          "id": "breads",
          "name": "Breads",
          "selectType": "single",
          "price": "3.00",
          "img": "./assets/images/ingredients/types/breads.png"
        },
        {
          "id": "cheeses",
          "name": "Cheeses",
          "selectType": "multiple",
          "price": "2.00",
          "img": "./assets/images/ingredients/types/cheeses.png"
        },
        {
          "id": "meats",
          "name": "Meats",
          "selectType": "multiple",
          "price": "3.20",
          "img": "./assets/images/ingredients/types/meats.png"
        },
        {
          "id": "veggies",
          "name": "Veggies",
          "selectType": "multiple",
          "price": "0.75",
          "img": "./assets/images/ingredients/types/veggies.png"
        },
        {
          "id": "greens",
          "name": "Greens",
          "selectType": "single",
          "price": "2.80",
          "img": "./assets/images/ingredients/types/greens.png"
        },
        {
          "id": "dressings",
          "name": "Dressings",
          "selectType": "multiple",
          "price": "1.50",
          "img": "./assets/images/ingredients/types/dressings.png"
        },
        {
          "id": "nuts_fruit",
          "name": "Nuts/Fruit",
          "selectType": "multiple",
          "price": "2.20",
          "img": "./assets/images/ingredients/types/nuts_fruit.png"
        }
      ],
      "drinkTypes": [
        {
          "id": "soda",
          "price": "2.25"
        },
        {
          "id": "espresso",
          "price": "4.25"
        }, {
          "id": "juice",
          "price": "4.00"
        }, {
          "id": "water",
          "price": "0.95"
        }
      ]
    }
    return data
  } // get data

}
