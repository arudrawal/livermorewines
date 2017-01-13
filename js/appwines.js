var googleMapApiKey = "AIzaSyB7odyxqSylhrPYpmNw6xg65tHCdKghI18";

var wineriesModel = [
        {name: 'Concannon Vineyard',
         addr: '4590 Tesla road, Livermore',
         phone: '(800)258-9866',
         lat: 37.666217,
         lng: -121.739736,
         clickcount: 0},
        
        {name: 'Wente Vineyard',
         addr: '5565 Tesla road, Livermore',
         phone: '(925)456-0439',
         lat: 37.664250,
         lng: -121.725347,
         clickcount: 0},

        
        {name: 'Las Positas Vineyards',
         addr: '1828 Wetmore road, Livermore',
         phone: '(925)449-9463',
         lat: 37.645922,
         lng: -121.770524,
         clickcount: 0},
        
        {name: 'Garre Vineyard & Winery',
         addr: '7986 Tesla road, Livermore',
         phone: '(925)371-8200',
         lat: 37.636250,
         lng: -121.557990,
         clickcount: 0},
        
        {name: 'Retzlaff Vineyards',
         addr: '1356 S Livermore Ave, Livermore',
         phone: '(925)447-8941',
         lat: 37.673628,
         lng: -121.750495,
         clickcount: 0},
        
        {name: '3 Steves Winery',
         addr: '5700 Greenville Rd, Livermore',
         phone: '(925)997-7736',
         lat: 37.648543,
         lng: -121.694541,
         clickcount: 0},
         
        {name: 'Crooked Vine Winery',
         addr: '4948 Tesla Rd, Livermore',
         phone: '(925)449-0458',
         lat: 37.666327,
         lng: -121.733695,
         clickcount: 0},

];
/*
var Winery = function(data) {
    this.name = data.name;
    this.addr = data.addr;
    this.phone = data.phone;
    this.lat = data.lat;
    this.lng = data.lng;
    this.clickcount = ko.observable(data.clickcount);
};*/
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
    self = this; // use self with surity of context
    this.wineryList = ko.observableArray([]);
    wineriesModel.forEach(function (wineryItem){
        self.wineryList.push(new Winery(wineryItem));
    });
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
            updateMarkers(filteredList);
            console.log('filterList called with filter:' + stringFilter);
            // Redo the map with filtered list.
    }
    //this.currentWinery = ko.observable(this.wineryList()[0]);
    //this.incrementCounter = function() {
    //    self.currentWinery().clickCount( self.currentWinery().clickCount()+1);
    //}
    /*
    this.selectWinery = function(wineryItem) {
        console.log(wineryItem.name());
        self.currentWinery(wineryItem);
    }*/
}
ko.applyBindings(new viewModel());
