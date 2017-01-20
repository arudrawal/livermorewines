var googleMapApiKey = "AIzaSyB7odyxqSylhrPYpmNw6xg65tHCdKghI18";


var wineriesModel = [
        {name: '3 Steves Winery',
         addr: '5700 Greenville Rd, Livermore',
         phone: '(925)997-7736',
         lat: 37.648543,
         lng: -121.694541,
         vid:'51f41fc4498e28c865434cb5',
         venue:{id:''},
         clickcount: 0},
        
        {name: 'Bent Creek Winery',
         addr: '5455 Greenville Rd, Livermore',
         phone: '(925)449-0458',
         lat: 37.652584900, 
         lng: -121.696612800,
         vid:'4bcb5bab511f9521f34cb1c7',
         venue: {id:''},
         clickcount: 0},

        {name: 'Concannon Vineyard',
         addr: '4590 Tesla road, Livermore',
         phone: '(800)258-9866',
         lat: 37.666217,
         lng: -121.739736,
         vid:'4a627a03f964a52027c41fe3',
         venue:{id:''},
         clickcount: 0},
        
        {name: 'Crooked Vine Winery',
         addr: '4948 Tesla Rd, Livermore',
         phone: '(925)449-0458',
         lat: 37.666327,
         lng: -121.733695,
         vid:'4ad0d54cf964a5203fda20e3',
         venue:{id:''},
         clickcount: 0},
         
        {name: 'Garre Vineyard & Winery',
         addr: '7986 Tesla road, Livermore',
         phone: '(925)371-8200',
         lat: 37.636250,
         lng: -121.557990,
         vid:'4ba55302f964a520cefa38e3',
         venue:{id:''},
         clickcount: 0},

        {name: 'Las Positas Vineyards',
         addr: '1828 Wetmore road, Livermore',
         phone: '(925)449-9463',
         lat: 37.645922,
         lng: -121.770524,
         vid:'4e3b43271838cb1b82d2effd',
         venue:{id:''},
         clickcount: 0},
                
        {name: 'Retzlaff Vineyards',
         addr: '1356 S Livermore Ave, Livermore',
         phone: '(925)447-8941',
         lat: 37.673628,
         lng: -121.750495,
         vid:'4b771c49f964a520737e2ee3',
         venue:{id:''},
         clickcount: 0},
        
        {name: 'Wente Vineyard',
         addr: '5565 Tesla road, Livermore',
         phone: '(925)456-0439',
         lat: 37.664250,
         lng: -121.725347,
         vid:'4b19b7dcf964a520aee223e3',
         venue:{id:''},
         clickcount: 0},
];
// Save venues inf from four square indexed by ID.
var fsVenue = [];

var Winery = function(data) {
    this.name = ko.observable(data.name);
    this.addr = ko.observable(data.addr);
    this.phone = ko.observable(data.phone);    
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.clickcount = ko.observable(data.clickcount);
};
// Consider a filter for the list.
var viewModel = function (){
    // without var creates a global self and causes issue with gmap api
    // self = this; 
    var self = this; // use self with surity of context
    this.wineryList = ko.observableArray([]);
    wineriesModel.forEach(function (wineryItem){
            self.wineryList.push(new Winery(wineryItem));
    });
    // Return item index equal to marker index 
    this.getItemIdx = function(item){
        for (idx=0; idx < self.wineryList().length; idx++){
            if (self.wineryList()[idx] == item){
                return idx;
            }
        }
        return -1;
    }
    // on submit filter form
    this.filterList = function (formElement){
            var feFilter = document.getElementById('filter');
            var stringFilterLC = feFilter.value.toLowerCase();
            var exp = "/" + stringFilterLC + "/";            
            itemCount = len = wineriesModel.length;
            var filteredList = new Array();
            self.wineryList.removeAll();
            for (idx=0; idx < itemCount; idx++){
                if (stringFilterLC.length <= 0 || stringFilterLC==='') {
                    self.wineryList.push(new Winery(wineriesModel[idx]));
                    filteredList.push(wineriesModel[idx]);
                } else {
                    var nameLC = wineriesModel[idx].name.toLowerCase();
                    //if (name.search(exp) >= 0){ // found
                    if (nameLC.indexOf(stringFilterLC) !== -1){
                        self.wineryList.push(new Winery(wineriesModel[idx]));
                        filteredList.push(wineriesModel[idx]);
                    }
                }
            }
            updateMarkers(filteredList);// Redo the map with filtered list.
            //console.log('filterList called with filter:' + stringFilterLC);          
    }
    // on list item select, simulate marker click event.
    this.selectWinery = function(wineryItem) {
        index = self.getItemIdx(wineryItem);        
        console.log(wineryItem.name() + 'idx=' + index);
        if (index >= 0) {
            if (typeof google !== 'undefined'){
                google.maps.event.trigger(markers[index], 'click');
            } else {
                emap = document.getElementById('gmap');
                emap.innerHTML = "<h1>Can't load map</h1>";
            }
        }
    }
}
ko.applyBindings(new viewModel());
