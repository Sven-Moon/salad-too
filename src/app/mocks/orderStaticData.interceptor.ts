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
          "itemType": "sandwich",
          "img": "./assets/images/specialties/ham_sourdough.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": ''
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
          "itemType": "sandwich",
          "img": "./assets/images/specialties/turkey_sandwich.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": ''
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
          "itemType": "salad",
          "img": "./assets/images/specialties/cobb.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": ''
        },
        {
          "id": "atlanta_salad",
          "name": "Sven's Salad",
          "ingredients": [
            "red_lettuce",
            "vinaigrette",
            "almonds",
            "cranberries",
            "ham"
          ],
          "itemType": "salad",
          "img": "./assets/images/specialties/svens_salad.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": ''
        }
      ],
      "itemTypes": [
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
          "image": ".assets/images/ingredients/ham.png",
          "itemType": ["salad", "sandwich"],
          "type": "Meat"
        },
        {
          "id": "turkey",
          "name": "Turkey",
          "image": ".assets/images/ingredients/turkey.png",
          "itemType": ["salad", "sandwich"],
          "type": "Meat"
        },
        {
          "id": "roast_beef",
          "name": "Roast Beef",
          "image": ".assets/images/ingredients/roast_beef.png",
          "itemType": ["sandwich"],
          "type": "Meat"
        },
        {
          "id": "red_lettuce",
          "name": "Red Lettuce",
          "image": ".assets/images/ingredients/red_lettuce.png",
          "itemType": ["salad", "sandwich"],
          "type": "Greens"
        },
        {
          "id": "green_lettuce",
          "name": "Green Lettuce",
          "image": ".assets/images/ingredients/green_lettuce.png",
          "itemType": ["salad", "sandwich"],
          "type": "Greens"
        },
        {
          "id": "mixed_greens",
          "name": "Mixed Greens",
          "image": ".assets/images/ingredients/mixed_greens.png",
          "itemType": ["salad"],
          "type": "Greens"
        },
        {
          "id": "lettuce",
          "name": "Lettuce",
          "image": ".assets/images/ingredients/lettuce.png",
          "itemType": ["sandwich"],
          "type": "Veggies"
        },
        {
          "id": "tomatoes",
          "name": "Tomatoes",
          "image": ".assets/images/ingredients/tomatoes.png",
          "itemType": ["salad", "sandwich"],
          "type": "Veggies"
        },
        {
          "id": "pickles",
          "name": "Pickles",
          "image": ".assets/images/ingredients/Pickles.png",
          "itemType": ["sandwich"],
          "type": "Veggies"
        },
        {
          "id": "onions",
          "name": "Onions",
          "image": ".assets/images/ingredients/onions.png",
          "itemType": ["salad", "sandwich"],
          "type": "Veggies"
        },
        {
          "id": "cucumbers",
          "name": "Cucumbers",
          "image": ".assets/images/ingredients/cucumbers.png",
          "itemType": ["salad"],
          "type": "Veggies"
        },
        {
          "id": "cheddar",
          "name": "Cheddar",
          "image": ".assets/images/ingredients/cheddar.png",
          "itemType": ["salad", "sandwich"],
          "type": "Cheese"
        },
        {
          "id": "provolone",
          "name": "Provolone",
          "image": ".assets/images/ingredients/provolone.png",
          "itemType": ["sandwich"],
          "type": "Cheese"
        },
        {
          "id": "blue_cheese",
          "name": "Blue Cheese",
          "image": ".assets/images/ingredients/blue_cheese.png",
          "itemType": ["sandwich"],
          "type": "Cheese"
        },
        {
          "id": "sourdough",
          "name": "Sourdough",
          "image": ".assets/images/ingredients/sourdough.png",
          "itemType": ["sandwich"],
          "type": "Bread"
        },
        {
          "id": "kaiser_roll",
          "name": "Kaiser Roll",
          "image": ".assets/images/ingredients/kaiser_roll.png",
          "itemType": ["sandwich"],
          "type": "Bread"
        },
        {
          "id": "mustard",
          "name": "Mustard",
          "image": ".assets/images/ingredients/mustard.png",
          "itemType": ["sandwich"],
          "type": "Condiments"
        },
        {
          "id": "mayo",
          "name": "Mayo",
          "image": ".assets/images/ingredients/mayo.png",
          "itemType": ["sandwich"],
          "type": "Condiments"
        },
        {
          "id": "ranch",
          "name": "Ranch",
          "image": ".assets/images/ingredients/ranch.png",
          "itemType": ["salad"],
          "type": "Dressings"
        },
        {
          "id": "almonds",
          "name": "Almonds",
          "image": ".assets/images/ingredients/almonds.png",
          "itemType": ["salad"],
          "type": "Nuts/Fruit"
        },
        {
          "id": "cranberries",
          "name": "Cranberries",
          "image": ".assets/images/ingredients/cranberries.png",
          "itemType": ["salad"],
          "type": "Nuts/Fruit"
        },
        {
          "id": "vinaigrette",
          "name": "Vinaigrette",
          "image": ".assets/images/ingredients/vinaigrette.png",
          "itemType": ["salad"],
          "type": "Dressings"
        }
      ],
      "ingredientTypes": [
        {
          "id": "Condiments",
          "selectType": "multiple",
          "price": "0.25"
        },
        {
          "id": "Bread",
          "selectType": "single",
          "price": "3.00"
        },
        {
          "id": "Cheese",
          "selectType": "multiple",
          "price": "2.00"
        },
        {
          "id": "Meat",
          "selectType": "multiple",
          "price": "3.20"
        },
        {
          "id": "Veggies",
          "selectType": "multiple",
          "price": "1.70"
        },
        {
          "id": "Greens",
          "selectType": "single",
          "price": "2.80"
        },
        {
          "id": "Dressings",
          "selectType": "multiple",
          "price": "1.50"
        },
        {
          "id": "Nuts/Fruit",
          "selectType": "multiple",
          "price": "2.20"
        }
      ],
      "desserts": [
        {
          "id": "chocolateCake",
          "name": "Chocolate Cake",
          "image": "./assets/images/desserts/chocolateCake",
          "price": "4.75"
        },
        {
          "id": "bananaPudding",
          "name": "Banana Pudding",
          "image": "./assets/images/desserts/bananaPudding",
          "price": "3.85"
        },
        {
          "id": "cremeBrulee",
          "name": "Creme Brulee",
          "image": "./assets/images/desserts/cremeBrulee",
          "price": "5.45"
        },
      ],
      "drinks": [
        {
          "id": "sprite",
          "name": "Sprite",
          "type": "soda",
          "image": "./assets/images/drinks.sprite.png"
        },
        {
          "id": "coke",
          "name": "Coke",
          "type": "soda",
          "image": "./assets/images/drinks.coke.png"
        },
        {
          "id": "diet-coke",
          "name": "Diet Coke",
          "type": "soda",
          "image": "./assets/images/drinks.diet-coke.png"
        },
        {
          "id": "orange-juice",
          "name": "Orange Juice",
          "type": "juice",
          "image": "./assets/images/drinks.orange-juice.png"
        },
        {
          "id": "cranberry-juice",
          "name": "Cranberry Juice",
          "type": "juice",
          "image": "./assets/images/drinks.cranberry-juice.png"
        },
        {
          "id": "latte",
          "name": "Latte",
          "type": "espresso",
          "image": "./assets/images/drinks.latte.png"
        },
        {
          "id": "cappuccino",
          "name": "Cappuccino",
          "type": "espresso",
          "image": "./assets/images/drinks.cappuccino.png"
        },
        {
          "id": "sparkling",
          "name": "Sparkling Water",
          "type": "water",
          "image": "./assets/images/drinks.sparkling.png"
        },
        {
          "id": "bottled",
          "name": "Bottled Water",
          "type": "water",
          "image": "./assets/images/drinks.bottled.png"
        },
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
      ],
      "sides": [
        {
          "id": "mac-cheese",
          "name": "Mac & Cheese",
          "price": "3.95",
          "image": "./assets/images/sides.mac-cheese.png"
        },
        {
          "id": "fries",
          "name": "French Fries",
          "price": "2.75",
          "image": "./assets/images/sides.fries.png"
        },
        {
          "id": "fruit",
          "name": "Mixed Fruit",
          "price": "3.95",
          "image": "./assets/images/sides.fruit.png"
        }
      ]
    }
    return data
  } // get data

}
