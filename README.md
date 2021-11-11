# SaladToo

Status: Deployed -- See it Here [See it Here: Salad Too](https://salad-too.web.app/)

In Progress: My work on a backend .NET WebAPI is 75% finished, so I should be able to replace the interceptor backend with a functioning API pretty soon here, enabling persistent state. 

This project was is actually a re-hash of the salad-plus project. I wanted to see how much I could improve the project starting from scratch & also to see how much more efficiently I could complete the project. Overall I'm pleasantly surprised by the results. Things were much easier, and consequently faster, this time around, and I was able to implement massive improvements and greater functionality in only a portion of the same time. 

## Features
- authorization allowing for order history
- selection of customizable & non-customizable items with clear as-you-go pricing
- select one or many ingredients of type
- good looking modals
- spinner to let the user know "we're working on it"
- payment with mask-formatted fields
- responsive design

### Backend Features
- NGRX store, routing
- template & reactive forms
- interceptors for data

## What I Learned
### Styling
- how to effectively turn a site plan into an html page
- use of box-sizing: border-box! (ugh, things were hard before that)
- animations: smooth open/close, moving menu highlight

### Backend / State
- I really upped the game on NGRX selector use, making the code more clearly speak for itself
- intermediate routing (use of parameters, snapshots, routing config)
- sass variables & import of style sheets
- use of GET, POST, & PUT operations on a server
- effects to handle async operations (alerts, spinner, routes)
- use of RXJS became less confusing: it's clearer when to use mergeMap vs concatMap vs tap, especially when used with NgRx effects

### Project Structure & Working Meta
- basic elements of authorization
- consistent & meaningful commit structure
- Jira epic/task project structure improvements

### IDE 
- use of custom snippets in VS Code! This is really helpful when wiring up NGRX actions.
- custom folder images
- removing the collapse/expand arrows
