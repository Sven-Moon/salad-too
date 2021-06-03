import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { staticData } from "../models/staticData";

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


  public getStaticData(): staticData {
    let data: staticData = {
      "items": {
        "ham_sourdough": {
          "name": "Ham on Sourdough",
          "ingredients": ["ham", "sourdough", "cheddar"],
          "itemGroup": "sandwich",
          "img": "./assets/images/specialties/ham_sourdough.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": '',
          "custom": false
        },
        "turkey_sandwich": {
          "name": "Turkey on White",
          "ingredients": [
            "turkey",
            "kaiser_roll",
            "provolone",
            "mustard",
            "lettuce"
          ],
          "itemGroup": "sandwich",
          "img": "./assets/images/specialties/turkey_sandwich.png",
          "description": "This is some sample text describing a sandwich. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": '',
          "custom": false
        },
        "cobb": {
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
          "img": "./assets/images/specialties/cobb.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": '',
          "custom": false
        },
        "atlanta_salad": {
          "name": "Sven's Salad",
          "ingredients": [
            "red_lettuce",
            "vinaigrette",
            "almonds",
            "cranberries",
            "ham"
          ],
          "itemGroup": "salad",
          "img": "./assets/images/specialties/svens_salad.png",
          "description": "This is some sample text describing a salad. You should think about this sandwich when you're hungry. But if you have no way of getting this sandwich, maybe don't.",
          "price": '',
          "custom": false
        }
      },
      "ingredients": {
        "ham":
        {
          "name": "Ham",
          "image": ".assets/images/ingredients/ham.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Meat"
        },
        "turkey":
        {
          "name": "Turkey",
          "image": ".assets/images/ingredients/turkey.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Meat"
        },
        "roast_beef":
        {
          "name": "Roast Beef",
          "image": ".assets/images/ingredients/roast_beef.png",
          "itemGroup": ["sandwich"],
          "type": "Meat"
        },
        "red_lettuce":
        {
          "name": "Red Lettuce",
          "image": ".assets/images/ingredients/red_lettuce.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Greens"
        },
        "green_lettuce":
        {
          "name": "Green Lettuce",
          "image": ".assets/images/ingredients/green_lettuce.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Greens"
        },
        "mixed_greens":
        {
          "name": "Mixed Greens",
          "image": ".assets/images/ingredients/mixed_greens.png",
          "itemGroup": ["salad"],
          "type": "Greens"
        },
        "lettuce":
        {
          "name": "Lettuce",
          "image": ".assets/images/ingredients/lettuce.png",
          "itemGroup": ["sandwich"],
          "type": "Veggies"
        },
        "tomatoes":
        {
          "name": "Tomatoes",
          "image": ".assets/images/ingredients/tomatoes.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Veggies"
        },
        "pickles":
        {
          "name": "Pickles",
          "image": ".assets/images/ingredients/Pickles.png",
          "itemGroup": ["sandwich"],
          "type": "Veggies"
        },
        "onions":
        {
          "name": "Onions",
          "image": ".assets/images/ingredients/onions.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Veggies"
        },
        "cucumbers":
        {
          "name": "Cucumbers",
          "image": ".assets/images/ingredients/cucumbers.png",
          "itemGroup": ["salad"],
          "type": "Veggies"
        },
        "cheddar":
        {
          "name": "Cheddar",
          "image": ".assets/images/ingredients/cheddar.png",
          "itemGroup": ["salad", "sandwich"],
          "type": "Cheese"
        },
        "provolone":
        {
          "name": "Provolone",
          "image": ".assets/images/ingredients/provolone.png",
          "itemGroup": ["sandwich"],
          "type": "Cheese"
        },
        "blue_cheese":
        {
          "name": "Blue Cheese",
          "image": ".assets/images/ingredients/blue_cheese.png",
          "itemGroup": ["sandwich"],
          "type": "Cheese"
        },
        "sourdough":
        {
          "name": "Sourdough",
          "image": ".assets/images/ingredients/sourdough.png",
          "itemGroup": ["sandwich"],
          "type": "Bread"
        },
        "kaiser_roll":
        {
          "name": "Kaiser Roll",
          "image": ".assets/images/ingredients/kaiser_roll.png",
          "itemGroup": ["sandwich"],
          "type": "Bread"
        },
        "mustard":
        {
          "name": "Mustard",
          "image": ".assets/images/ingredients/mustard.png",
          "itemGroup": ["sandwich"],
          "type": "Condiments"
        },
        "mayo":
        {
          "name": "Mayo",
          "image": ".assets/images/ingredients/mayo.png",
          "itemGroup": ["sandwich"],
          "type": "Condiments"
        },
        "ranch":
        {
          "name": "Ranch",
          "image": ".assets/images/ingredients/ranch.png",
          "itemGroup": ["salad"],
          "type": "Dressings"
        },
        "almonds":
        {
          "name": "Almonds",
          "image": ".assets/images/ingredients/almonds.png",
          "itemGroup": ["salad"],
          "type": "Nuts/Fruit"
        },
        "cranberries":
        {
          "name": "Cranberries",
          "image": ".assets/images/ingredients/cranberries.png",
          "itemGroup": ["salad"],
          "type": "Nuts/Fruit"
        },
        "vinaigrette":
        {
          "name": "Vinaigrette",
          "image": ".assets/images/ingredients/vinaigrette.png",
          "itemGroup": ["salad"],
          "type": "Dressings"
        }
      },
      "ingredientTypes": {
        "Condiments": {
          "selectType": "multiple",
          "price": "0.25"
        },
        "Bread": {
          "selectType": "single",
          "price": "3.00"
        },
        "Cheese": {
          "selectType": "multiple",
          "price": "2.00"
        },
        "Meat": {
          "selectType": "multiple",
          "price": "3.20"
        },
        "Veggies": {
          "selectType": "multiple",
          "price": "1.70"
        },
        "Greens": {
          "selectType": "single",
          "price": "2.80"
        },
        "Dressings": {
          "selectType": "multiple",
          "price": "1.50"
        },
        "Nuts/Fruit": {
          "selectType": "multiple",
          "price": "2.20"
        }
      },
      "desserts": {
        "chocolateCake": {
          "name": "Chocolate Cake",
          "image": "./assets/images/desserts/chocolateCake",
          "price": "4.75"
        },
        "bananaPudding": {
          "name": "Banana Pudding",
          "image": "./assets/images/desserts/bananaPudding",
          "price": "3.85"
        },
        "cremeBrulee": {
          "name": "Creme Brulee",
          "image": "./assets/images/desserts/cremeBrulee",
          "price": "5.45"
        },
      },
      "drinks": {
        "sprite": {
          "name": "Sprite",
          "type": "soda",
          "image": "./assets/images/drinks.sprite.png"
        },
        "coke": {
          "name": "Coke",
          "type": "soda",
          "image": "./assets/images/drinks.coke.png"
        },
        "diet-coke": {
          "name": "Diet Coke",
          "type": "soda",
          "image": "./assets/images/drinks.diet-coke.png"
        },
        "orange-juice": {
          "name": "Orange Juice",
          "type": "juice",
          "image": "./assets/images/drinks.orange-juice.png"
        },
        "cranberry-juice": {
          "name": "Cranberry Juice",
          "type": "juice",
          "image": "./assets/images/drinks.cranberry-juice.png"
        },
        "latte": {
          "name": "Latte",
          "type": "espresso",
          "image": "./assets/images/drinks.latte.png"
        },
        "cappuccino": {
          "name": "Cappuccino",
          "type": "espresso",
          "image": "./assets/images/drinks.cappuccino.png"
        },
        "sparkling": {
          "name": "Sparkling Water",
          "type": "water",
          "image": "./assets/images/drinks.sparkling.png"
        },
        "bottled": {
          "name": "Bottled Water",
          "type": "water",
          "image": "./assets/images/drinks.bottled.png"
        },
      },
      "drinkTypes": {
        "soda": {
          "price": "2.25"
        },
        "espresso": {
          "price": "4.25"
        },
        "juice": {
          "price": "4.00"
        },
        "water": {
          "price": "0.95"
        }
      },
      "sides": {
        "mac-cheese": {
          "name": "Mac & Cheese",
          "price": "3.95",
          "image": "./assets/images/sides.mac-cheese.png"
        },
        "fries": {
          "name": "French Fries",
          "price": "2.75",
          "image": "./assets/images/sides.fries.png"
        },
        "fruit": {
          "name": "Mixed Fruit",
          "price": "3.95",
          "image": "./assets/images/sides.fruit.png"
        }
      }
    }
    return data
  } // get data

}
