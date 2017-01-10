var googleMapApiKey = "AIzaSyB7odyxqSylhrPYpmNw6xg65tHCdKghI18";

var initalListWineries = [
        {name: 'Concannon Vineyard',
         addr: '4590 Tesla road, Livermore',
         phone: '(800)258-9866',
         lat: 37.666217,
         lng: -121.739736},
        
        {name: 'Wente Vineyard',
         addr: '5565 Tesla road, Livermore',
         phone: '(925)456-0439',
         lat: 37.664250,
         lng: -121.725347},

        
        {name: 'Las Positas Vineyards',
         addr: '1828 Wetmore road, Livermore',
         phone: '(925)449-9463',
         lat: 37.645922,
         lng: -121.770524},
        
        {name: 'Garre Vineyard & Winery',
         addr: '7986 Tesla road, Livermore',
         phone: '(925)371-8200',
         lat: 37.636250,
         lng: -121.557990},
        
        {name: 'Retzlaff Vineyards',
         addr: '1356 S Livermore Ave, Livermore',
         phone: '(925)447-8941',
         lat: 37.673628,
         lng: -121.750495},
        
        {name: '3 Steves Winery',
         addr: '5700 Greenville Rd, Livermore',
         phone: '(925)997-7736',
         lat: 37.648543,
         lng: -121.694541},
         
        {name: 'Crooked Vine Winery',
         addr: '4948 Tesla Rd, Livermore',
         phone: '(925)449-0458',
         lat: 37.666327,
         lng: -121.733695},

];
var Winery = function(data) {
    this.name = ko.observable(data.name);
    this.addr = ko.observable(data.addr);
    this.phone = ko.observable(data.phone);    
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
};

var viewModel = function (){
    self = this; // use self with surity of context
    this.wineryList = ko.observableArray([]);
    initalListWineries.forEach(function (wineryItem){
        self.wineryList.push(new Winery(wineryItem));
    });
    this.currentWinery = ko.observable(this.wineryList()[0]);
    this.selectWinery = function(wineryItem) {
        console.log(wineryItem.name());
        self.currentWinery(wineryItem);
    }
}
//ko.applyBindings(new viewModel());
