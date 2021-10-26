import { trigger, style, state, animate, transition } from '@angular/animations';


export const expandContract = [
    trigger('toggleIngredientView', [
      state('closed', style({
        height: '0px',
        'padding-top': '0px',
        'padding-bottom': '0px'
      })),
      state('open', style({

      })),
      transition('closed => open, open => closed', [
        animate('.3s')
      ])
    ])
]
