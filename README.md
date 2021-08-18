# SaladToo

** In Progress **

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
- both template & reactive forms
- json-server & interceptors for data

## What I Learned
### Styling
- how to effectively turn a site plan into an html page
- use of box-sizing: border-box! (ugh, things were hard before that)
- (in progress: animations)
- animations: smooth open/close, moving menu highlight

### Backend / State
- I really upped the game on NGRX selector use, making the code more clearly speak for itself
- intermediate routing (use of parameters, snapshots, routing config)
- sass variables & import of style sheets
- use of post, patch operations on a server
- effects to handle async operations (alerts, spinner, routes)
- use of RXJS became a little less confusing: it's clearer when to use mergeMap vs concatMap vs tap... etc.

### IDE 
- use of snippets in VS Code!
- custom folder images
- removing the collapse/expand arrows

### Project Structure & Working Meta
- basic elements of authorization
- consistent & meaningful commit structure
- Jira epic/task project structure improvements

### Third Party Libraries
- ngx-spinner
- ngx-alerts
- concurrently
- ngx-mask
- ngx-bootstrap
