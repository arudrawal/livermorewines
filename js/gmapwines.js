    var map; // load map only once
    var markers=[]; // maintain markers
    var greenIcon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    var defaultIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    var url4s = "https://api.foursquare.com/v2/venues/";
    //var url4s = 'https://api.foursquare.com/v2/venues/search?';
    var CLIENT_ID='PFVHQYLSUNA4ZUWSBBPLR3UDK0ZBN40FSEKBWPPY3D4BNNL3';
    var CLIENT_SECRET='5NV3TQ4E5SK30RTPHXIQO12NB5RUZDUMC0VDMCRVGAZB4MHN';
    //var CLIENT_ID = '5WCCP00O5EJYVALVKM2ZSV2R3GPNFIQH0LT4AZNQTUDGKAIC'
    //var CLIENT_SECRET ='EOO4AXGRYFEJE0RET4CQJWO0FSCHDERWQPIC0DG5IKU3FSA1';
    var FS_VERSION = '20170115';
    //var today = new Date();
    //var FS_VERSION=today.getFullYear()+''+today.getMonth()+''+today.getDate();
    var cred4s = 'client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET +
                 '&v=' + FS_VERSION; 
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
            marker.idx=i; // save index position
            markers.push(marker);
            
            marker.addListener('click', function() {
                        // Extract venue info
                        venue = fsVenue[listWineries[this.idx].vid];
                        rating = 0;
                        if (venue !== undefined) {
                            rating = venue.rating;
                        }
                        var contentString = '<div id="content">'+
                            '<div id="name">'+ listWineries[this.idx].name +'</div>'+
                            '<div id="addr">'+ listWineries[this.idx].addr +'</div>'+
                            '<div id="phone">'+ listWineries[this.idx].phone +'</div>'+
                            '<div id="rating">Foursquare Rating: '+ rating +'</div>'+
                            '</div>';
                        // Create unique copy of infoWindow
                        var infowindow = new google.maps.InfoWindow({
                            content: contentString
                        });                    
                        infowindow.open(map, this);//this=marker
                        this.infowindow = infowindow; // save object
                        this.setIcon(greenIcon);
                        // Restore default icon and close other infowindow
                        restoreDefaultIcon(this);
                        // set animation for this
                        this.setAnimation(google.maps.Animation.BOUNCE);
                        window.setTimeout(clearAnimation, 2000);
                    }
                );
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
    // Load data from four square
    function load4SquareData(){
        for (i=0; i < wineriesModel.length; i++){
            var vurl4s = url4s + wineriesModel[i].vid + '?' + cred4s;
            //console.log(vurl4s);
            $.ajax({
                url: vurl4s,
                dataType: 'json',
            }).done(function(result){
                //console.log(result.response.venue.rating); 
                if (result.meta.code == 200){
                    fsVenue[result.response.venue.id] = result.response.venue;
                    //console.log(result.response.venue.id);
                }
            }).fail(function(result){
                console.log(result);
            });
        }
    }
    $( document ).ready(function() {
        //console.log( "ready!" );
        load4SquareData();
    });