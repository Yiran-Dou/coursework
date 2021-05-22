var point1 = []

var coor = lineString(draw_data);
point1.push(coor);


function lineString(coordinates, properties, options){
  return feature(
    {
      type: "Point",
      coordinates: coordinates
    },
    properties,
    options
  )
}

function feature(geometry, properties, options){
  var feat = {type :"Feature"};
  feat.properties = {
    "id": draw_data.id,
    "all_properties": draw_data.all_properties,
    "old": draw_data.old,
    "Dist_UAL": draw_data.Dist_UAL,
    "Dist_KCL": draw_data.Dist_KCL,
    "Dist_UCL": draw_data.Dist_UCL,
    "Dist_UCL2": draw_data.Dist_UCL2,
    "Dist_WM": draw_data.Dist_WM,
    "rentpw": draw_data.rentpw,
    "crime_rate": draw_data.crime_rate,
    "ptai": draw_data.ptai,
    "cluster": draw_data.cluster,
    "modern": draw_data.modern
  };
  feat.geometry = geometry;
  return feat;
}

var rent_info = FeatureCollection(point1);
function FeatureCollection(features) {
  var fc = {type:"FeatureCollection"};
  fc.features = features;
  return fc;
}




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
