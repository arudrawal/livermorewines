/**
 * Data model hard code array of objects.
 * vid: foursquare venue id
 */
var wineriesModel = [
        {name: '3 Steves Winery',
         addr: '5700 Greenville Rd, Livermore',
         phone: '(925) 997-7736',
         lat: 37.648543,
         lng: -121.694541,
         vid:'51f41fc4498e28c865434cb5'},

        {name: 'Bent Creek Winery',
         addr: '5455 Greenville Rd, Livermore',
         phone: '(925) 449-0458',
         lat: 37.652584900, 
         lng: -121.696612800,
         vid:'4bcb5bab511f9521f34cb1c7'},

        {name: 'Concannon Vineyard',
         addr: '4590 Tesla road, Livermore',
         phone: '(800) 258-9866',
         lat: 37.666217,
         lng: -121.739736,
         vid:'4a627a03f964a52027c41fe3'},
        
        {name: 'Cuda Ridge Wines',
         addr: '2400 Arroyo Road, Livermore',
         phone: '(510) 304-0914',
         lat: 37.6548485,
         lng: -121.7668109,
         vid:'539252af498e5e3ad199903c'},
         
        {name: 'Crooked Vine Winery',
         addr: '4948 Tesla Rd, Livermore',
         phone: '(925) 449-0458',
         lat: 37.666327,
         lng: -121.733695,
         vid:'4ad0d54cf964a5203fda20e3'},

        {name: 'Garre Vineyard & Winery',
         addr: '7986 Tesla road, Livermore',
         phone: '(925) 371-8200',
         lat: 37.636250,
         lng: -121.557990,
         vid:'4ba55302f964a520cefa38e3'},

        {name: 'Las Positas Vineyards',
         addr: '1828 Wetmore road, Livermore',
         phone: '(925) 449-9463',
         lat: 37.645922,
         lng: -121.770524,
         vid:'4e3b43271838cb1b82d2effd'},

        {name: 'Retzlaff Vineyards',
         addr: '1356 S Livermore Ave, Livermore',
         phone: '(925) 447-8941',
         lat: 37.673628,
         lng: -121.750495,
         vid:'4b771c49f964a520737e2ee3'},

        {name: 'Wente Vineyard',
         addr: '5565 Tesla road, Livermore',
         phone: '(925) 456-0439',
         lat: 37.664250,
         lng: -121.725347,
         vid:'4b19b7dcf964a520aee223e3'},
];
/**
 * Save venues information from four square indexed by VENUR_ID.
 */
var fsVenue = [];

/**
 * KnockoutJS observable object.
 */
var Winery = function(data) {
    this.name = data.name;//ko.observable(data.name);
    this.addr = data.addr;//ko.observable(data.addr);
    this.phone = data.phone;//ko.observable(data.phone);
    this.lat = data.lat;//ko.observable(data.lat);
    this.lng = data.lng;//ko.observable(data.lng);
    this.visible = ko.observable(true);
};

/**
 * KnockoutJS observable viewmodel for list view.
 */
var viewModel = function (){
    // without var creates a global self and causes issue with gmap api
    // self = this; 
    var self = this; // use self with security of context
    this.wineryList = ko.observableArray([]);
    wineriesModel.forEach(function (wineryItem){
            self.wineryList.push(new Winery(wineryItem));
    });
    /**
     * @description   Return item index of a give item, equal to marker index,
     *                We maintain index co-relation.
     * @param  {Winery} item
     * @return {intger} index, -1 if not found
     */
    this.getItemIdx = function(item){
        for (var idx = 0; idx < self.wineryList().length; idx++){
            if (self.wineryList()[idx] == item){
                return idx;
            }
        }
        return -1;
    }
    /**
     * @description   Filter the winery list and build fitered observable,
     *                called on submit filter form. Case is ignored.
     * @param  {FormElement} input filter
     * @return
     */    
    this.filterList = function (formElement){
            var feFilter = document.getElementById('filter');
            var stringFilterLC = feFilter.value.toLowerCase();
            var exp = "/" + stringFilterLC + "/";            
            var itemCount = len = wineriesModel.length;
            var filteredList = new Array();
            //self.wineryList.removeAll();
            for (var idx = 0; idx < itemCount; idx++){
                if (stringFilterLC.length <= 0 || stringFilterLC==='') {
                    //self.wineryList.push(new Winery(wineriesModel[idx]));
                    self.wineryList()[idx].visible(true);
                    filteredList.push(wineriesModel[idx]);
                } else {
                    var nameLC = wineriesModel[idx].name.toLowerCase();
                    if (nameLC.indexOf(stringFilterLC) !== -1){
                        //self.wineryList.push(new Winery(wineriesModel[idx]));
                        self.wineryList()[idx].visible(true);
                        filteredList.push(wineriesModel[idx]);
                    } else {
                        self.wineryList()[idx].visible(false);
                    }
                }
            }
            updateMarkers(filteredList);// Redo the map with filtered list.
            //console.log('filterList called with filter:' + stringFilterLC);          
    }

    /**
     * @description   on list item click, simulate marker click event.
     * @param  {Winery} Item clicked.
     * @return
     */
    this.selectWinery = function(wineryItem) {
        var index = self.getItemIdx(wineryItem);        
        //console.log(wineryItem.name() + 'idx=' + index);
        if (index >= 0) {
            if (typeof google !== 'undefined'){ // maps loaded
                google.maps.event.trigger(markers[index], 'click');
            } else { // handle map init failure
                var emap = document.getElementById('gmap');
                emap.innerHTML = "<h1>Failed to load google map</h1>";
            }
        }
    }
}
/**
 * Initialize KnockoutJS context on document.
 */
ko.applyBindings(new viewModel());