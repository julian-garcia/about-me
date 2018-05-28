function initMap() {
    var pos = {lat: 45.401497, lng: -0.001179};
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: pos
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    var locations = [
                     {lat:  40.785091,
                      lng: -3.968285}, 
                     {lat:  45.084045,
                      lng: -0.874256}, 
                     {lat: 51.401497, 
                      lng: -0.001179},
                     {lat:  50.754932,
                      lng: -3.984016}
                    ];
                    
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({position:location, map:map, label:labels.substring(i, i+1)});
    });
}