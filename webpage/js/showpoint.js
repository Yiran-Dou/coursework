
    
            map.addLayer({
                'id': 'rent_info',
                'type': 'circle',
                'source': 'rent_info',
                'paint': {
                              'circle-radius': 4,
                              'circle-stroke-width': 2,
                              'circle-color': '#3a78b1',
                              'circle-stroke-color': 'white'
                          }
                      });

                      // Create a popup, but don't add it to the map yet.
               var popup = new mapboxgl.Popup({
               closeButton: false,
               closeOnClick: false
               });

               map.on('mouseenter', 'places', function (e) {
               // Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';

var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

// Populate the popup and set its coordinates
// based on the feature found.
popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';
popup.remove();
});




map.on('load', function () {
// Add a layer showing the places.
map.addLayer({
'id': 'places',
'type': 'circle',
'source': 'places',
'paint': {
'circle-color': '#4264fb',
'circle-radius': 6,
'circle-stroke-width': 2,
'circle-stroke-color': '#ffffff'
}
});

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
closeButton: false,
closeOnClick: false
});

map.on('mouseenter', 'places', function (e) {
// Change the cursor style as a UI indicator.
map.getCanvas().style.cursor = 'pointer';

var coordinates = e.features[0].geometry.coordinates.slice();
var description = e.features[0].properties.description;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

// Populate the popup and set its coordinates
// based on the feature found.
popup.setLngLat(coordinates).setHTML(description).addTo(map);
});

map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';
popup.remove();
});
});
*/
