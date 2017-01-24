    var map; // load map only once
    var markers=[]; // maintain markers
    var GREEN_MARKER = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    var RED_MARKER = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    var URL4SQUARE = "https://api.foursquare.com/v2/venues/";
    var CLIENT_ID='PFVHQYLSUNA4ZUWSBBPLR3UDK0ZBN40FSEKBWPPY3D4BNNL3';
    var CLIENT_SECRET='5NV3TQ4E5SK30RTPHXIQO12NB5RUZDUMC0VDMCRVGAZB4MHN';
    var FS_VERSION = '20170115';
    //var today = new Date();
    //var FS_VERSION=' ' + today.getFullYear()+today.getMonth()+today.getDate();
    var CRED4SQUARE = 'client_id=' + CLIENT_ID + '&client_secret=' + 
                      CLIENT_SECRET + '&v=' + FS_VERSION;
    var ANIMATIN_MS = 2000;
    /**
     * @description Sets the map on all markers in the array.
     * @param {Object} map
     * @returns
     */
    function setMapOnAll(map) {
        for (var idx = 0; idx < markers.length; idx++) {
          markers[idx].setMap(map);
        }
    }
    /**
     * @description Restore default icon on all markers except 
     *              the one given as param.
     * @param{object} marker
     * @returns
     */
    function restoreDefaultIcon(exceptThis) {
        for (var i = 0; i < markers.length; i++) {
          if (exceptThis != markers[i]){
            markers[i].setIcon(RED_MARKER);
            if (markers[i].getAnimation() !== null) {
                markers[i].setAnimation(null);
            }
            if (markers[i].infowindow) {
                markers[i].infowindow.close();
            }
          }
        }
    }
    
    /**
     * @description Clear animation frm the markers on timeout.
     * @param 
     * @returns
     */    
    function clearAnimation(){
        for (var idx = 0; idx < markers.length; idx++) {
            if (markers[idx].getAnimation() !== null) {
                markers[idx].setAnimation(null);
            }
        }
    }
    /**
     * @description called when marker is clicked.
     * @param  {Marker} marker
     * @returns
     */
    function onClickMarker(marker) {
        // Extract venue info
        venue = fsVenue[wineriesModel[marker.idx].vid];
        var rating;
        if (typeof venue == 'undefined') {
            rating = 'unable to load Foursquare';
        } else {
            rating = venue.rating;
        }
        var contentString = '<div id="content">'+
            '<div id="name">'+ wineriesModel[marker.idx].name +'</div>'+
            '<div id="addr">'+ wineriesModel[marker.idx].addr +'</div>'+
            '<div id="phone">'+ wineriesModel[marker.idx].phone +'</div>'+
            '<div id="rating"><a href="https://foursquare.com/v/' +
            wineriesModel[marker.idx].vid + '" target="_blank">' +
            'FOURSQUARE.COM Rating</a>:&nbsp;<b>' + rating +'</b></div>'+
        '</div>';

        // Create infowindow once
        if (typeof marker.infowindow == 'undefined') {
            marker.infowindow = new google.maps.InfoWindow({
                content: contentString
            });
        } else {
            marker.infowindow.setContent(contentString);
        }
        marker.setIcon(GREEN_MARKER);
        marker.infowindow.open(map, marker);//this=marker
        // Restore default icon and close all other infowindows
        restoreDefaultIcon(marker);
        // set animation for this
        marker.setAnimation(google.maps.Animation.BOUNCE);
        window.setTimeout(clearAnimation, ANIMATIN_MS);
    }

    /**
     * @description Create/Set markers from the array of wineries.
     * @param {array} wineries
     * @returns
     */
    function initMarkers(){
        if (typeof google == 'undefined'){
            var emap = document.getElementById('gmap');
            emap.innerHTML = "<h1>Failed to load google map</h1>";
            return;
        }
        for (var idx = 0; idx < wineriesModel.length; idx++){
            var pos = {lat: wineriesModel[idx].lat, 
                       lng: wineriesModel[idx].lng};
            var marker = new google.maps.Marker({
                position: pos, map: map, 
                title: wineriesModel[idx].name,
                animation: google.maps.Animation.DROP});
            marker.idx = idx; // save index position, need in click listener
            markers.push(marker);
            
            marker.addListener('click', function(){
                    var mk=this; // create a copy of marker
                    onClickMarker(mk);
            });
        }
    }
    /**
     * @description Callback when google map initilized.
     * @param
     * @returns
     */    
    function initMap(){
        var divMap = document.getElementById('gmap');
        var livermoreCA = {lat: 37.67549, lng: -121.7582};
        map = new google.maps.Map(divMap,
                        {zoom: 12, center: livermoreCA});        
        // When infowindow is closed by mouse click.
        //map.addEventListener(MapEvent.INFOWINDOW_CLOSED,alert('abc')); 
                               //{restoreDefaultIcon(null);});
        initMarkers();
    }
    
    /**
     * @description Handle if map loading failed.
     * @param
     * @returns
     */    
    function gmapError(){
        var emap = document.getElementById('gmap');
        emap.innerHTML = "<h1>'Failed to load gmap'</h1>";
        //console.log('Failed to load gmap');
    }
    /**
     * @description Load venue data from foursquare.com
     *              Data is stored in global array of objects.
     * @param
     * @returns
     */
    function load4SquareData(){
        var anyError = false;
        for (var idx = 0; idx < wineriesModel.length; idx++){
            var url4s = URL4SQUARE + wineriesModel[idx].vid + '?' + CRED4SQUARE;
            $.ajax({
                url: url4s,
                dataType: 'json',
            }).done(function(result){
                if (result.meta.code == 200){
                    fsVenue[result.response.venue.id] = result.response.venue;
                }
            }).fail(function(result){
                console.log(result);                
            });
        }
    }
    
    /**
     * @description Invoke data load from 4 square, once page is loaded.
     * @param        
     * @returns
     */    
    $( document ).ready(function() {
        load4SquareData();
    });