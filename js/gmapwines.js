    var map; // load map only once
    var markers=[]; // maintain markers
    var greenIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    var defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    
    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
    }
    function restoreDefaultIcon(exceptThis) {
        for (var i = 0; i < markers.length; i++) {
          if (exceptThis != markers[i]){
            markers[i].setIcon(defaultIcon);
            if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
            }
            if (markers[i].infowindow) {
                markers[i].infowindow.close();
            }
          }
        }
    }
    function clearAnimation(){
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
            }
        }
    }
    // Set markers from the array of wineries
    function updateMarkers(listWineries){
        if (typeof google == 'undefined'){
            emap = document.getElementById('gmap');
            emap.innerHTML = "<h1>Can't load map</h1>";
            return;
        }
        setMapOnAll(null);// Delete all markers
        markers = [];
        for (i=0; i < listWineries.length; i++){
            var pos = {lat: listWineries[i].lat, 
                       lng: listWineries[i].lng};
            var marker = new google.maps.Marker({
                position: pos, map: map, 
                title: listWineries[i].name,
                animation: google.maps.Animation.DROP});
            //if (defaultIcon == null){
            //    defaultIcon = marker.getIcon();
            //}
            markers.push(marker);
            
            marker.addListener('click', function() {
                    // Pull from four square
                    
                    // Pull Yelp rating and show in info window.
                    var contentString = '<div id="content">'+
                        '<div id="name">'+ listWineries[i].name +'</div>'+
                        '<div id="addr">'+ listWineries[i].addr +'</div>'+
                        '<div id="phone">'+ listWineries[i].phone +'</div>'+
                        '</div>';                    
                    // Create unique copy of infoWindow
                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });
                    //infowindow.marker = this;
                    function inner (){ // This is real callback
                        infowindow.open(map, this);//this=marker
                        this.infowindow = infowindow; // save object
                        this.setIcon(greenIcon);
                        // Restore default icon and close other infowindow
                        restoreDefaultIcon(this);
                        // set animation for this
                        this.setAnimation(google.maps.Animation.BOUNCE);
                        window.setTimeout(clearAnimation, 2000);
                    }
                    return inner;
                }()); // Function invked
        }
    }
    function initMap(){        
        var divMap = document.getElementById('gmap');
        var livermoreCA = {lat: 37.67549, lng: -121.7582};
        map = new google.maps.Map(divMap, 
                        {zoom: 12, center: livermoreCA});        
        //map.addEventListener(MapEvent.INFOWINDOW_CLOSED,alert('abc')); 
                                //{restoreDefaultIcon(null);});
        updateMarkers(wineriesModel);
        //console.log("Google map initialized");
    }
    function gmapError(){
        emap = document.getElementById('gmap');
        emap.innerHTML = "<h1>Can't load map</h1>";
        console.log('Failed to load gmap');
    }