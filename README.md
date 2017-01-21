# LivermoreWines

This project builds a single page responsive web application 
to showcase wineries of Livermore CA. Build using KnockoutJS, 
Google map, Bootstrap and foursquare.com venue rating.

## Code structure
LivermoreWines - base directory
LivermoreWines/js - all javascript code goes here.
LivermoreWines/css - all style sheets goes here
LivermoreWines/fonts - fonts from bootstarap goes here

## Installation
1. Clone the repository
2. View Livermore wineries in browser by opening: LivermoreWines/index.html
3. Project is also set to run using Google App Engine Launcher

## App usage instructions
1. When index.html is opend all wineries will be displayed on the map
2. Left had side list view can be filtered by typing text and pressing 
   enter key. Search is case insensitive.
3. To display all wineries, clear filer and press enter
4. Click item on the list view to show details of that item.
5. Details can be shown by clicking the item marker on map.

## Error conditions
1. If failed to read data frm foursquare.com, rating will be 'N/A'
2. Google map failed to load - message will be displayed