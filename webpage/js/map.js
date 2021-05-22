mapboxgl.accessToken = 'pk.eyJ1IjoieWlxaW5nbGkiLCJhIjoiY2tvb3ExaWhvMGUxbDJ6cGNza3V5YWg0ayJ9.EqtATjybhBeo9LeoULMoDg';

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-0.30334650103263694, 51.50715074898964], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

// Add the control to the map.
map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }));

map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));


map.on('load', function () {
    map.addSource('msoa_boundary', {
    type: 'geojson',
    // Use a URL for the value for the `data` property.
    data: 'data/msoa.geojson'
    });


    map.addLayer({
          'id': 'boundary',
          'type': 'line',
          'source': 'msoa_boundary',
          'layout': {},
          'paint': {
               'line-color': '#3a78b1',
               'line-width': 2
}
});
});

$(document).ready( function() {

    // when site loaded, load popup box
    loadPopupBox();

    $('#popupBoxClose').click( function() {
        unloadPopupBox();
    });

    function unloadPopupBox() {
        $('#popup_box').fadeOut('slow');
        $('#blur_out').css({
            'display': 'none'
        });
    }

    function loadPopupBox() {
        $('#popup_box').fadeIn('slow');
    }
});



var marker;
var source;
var layer_;
var rent_data;

var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
});

$("#search").click(function () {
    var point1 = [];

    if (marker != undefined) {
        marker.remove();
    }
    if (layer_ != undefined) {
        map.removeLayer('rent_info')
    }
	if (source != undefined) {
		map.removeSource('rent_data')
    }


    $.ajax({
        url: "data/rent_info.json",
        success: function (result) {

            var len = result.length;
            var temp = [];
            var data = [];
            //开始过滤数据;
            //第一个条件：price_min,先取用户选的值
            var university = $('#university option:selected').val();
            var min_rent = $('#rent_range1').val();
            var max_rent = $('#rent_range2').val();
            var min_dist = $('#dist_range1').val();
            var max_dist = $('#dist_range2').val();
            var min_ptal = $('#ptal_range1').val();
            var max_ptal = $('#ptal_range2').val();
            var min_cr = $('#cr_range1').val();
            var max_cr = $('#cr_range2').val();
            var min_modern = $('#modern_range1').val();
            var max_modern = $('#modern_range2').val();
            var min_religion = $('#religion_range1').val();
            var max_religion = $('#religion_range2').val();

            console.log(len);


            if (university == 0) {
                for (var j = 0; j < len; j++) {

                    var draw_data = result[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);

                //alert("d");

            }




           if (university == 1) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    //console.log(single_data.crime_rate);

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UCL1 >= min_dist & single_data.UCL1 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }

                data = temp;
                len = data.length;
                console.log(data);
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.13443253068502323, 51.5246396351845])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);

            }

            if (university == 2) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UCL2 >= min_dist & single_data.UCL2 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }

                data = temp;
                len = data.length;
                console.log(data);
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.01923486328218156,51.50604515706629])
                    .addTo(map);
                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);

            }

            if (university == 3) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.KCL1 >= min_dist & single_data.KCL1 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;
                len = data.length;
                console.log("过滤后len=" + len);
                marker = new mapboxgl.Marker()
                    .setLngLat([-0.1155678484390702,51.51168669431346])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 4) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.KCL2 >= min_dist & single_data.KCL2 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.11383705952102632, 51.506240991868516])
                    .addTo(map);
                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 5) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.KCL3 >= min_dist & single_data.KCL3 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.0878663119015054, 51.50339182338584])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 6) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.KCL4 >= min_dist & single_data.KCL4 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.09613277898714492, 51.46929989869306])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 7) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.KCL5 >= min_dist & single_data.KCL5 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.11992341719187699,51.49754757174982])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 8) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.IC1 >= min_dist & single_data.IC1 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.17487501058255775,51.49886471507695])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 9) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.IC2 >= min_dist & single_data.IC2 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.22524677301477306, 51.51657805539249])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 10) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.IC3 >= min_dist & single_data.IC3 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.23471784602640478, 51.517606471218876])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 11) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.LSE >= min_dist & single_data.LSE <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.11654767979024597,51.514831315671216])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 12) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.City >= min_dist & single_data.City <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.10248535438238632, 51.52791952836562])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 13) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UAL1 >= min_dist & single_data.UAL1 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.12429642039427419,51.536755906290196])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 14) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UAL2 >= min_dist & single_data.UAL2 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.14429359676842632,51.51562972814611])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 15) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data. UAL3>= min_dist & single_data.UAL3 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.21155664603029886, 51.41349405253261])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 16) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UAL4 >= min_dist & single_data.UAL4 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.10169862883918726, 51.49495699012759])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 17) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UAL5 >= min_dist & single_data.UAL5 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.12910060185099928, 51.49065012138333])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 18) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UAL6 >= min_dist & single_data.UAL6 <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.08055971719271224, 51.47441023186077])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 19) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Goldsmiths >= min_dist & single_data.Goldsmiths <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.035515290204435994, 51.474391266660085])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 20) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Queen >= min_dist & single_data.Queen <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.04020284048531091, 51.52405372887634])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 21) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.UM >= min_dist & single_data.UM <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.1431496335208093, 51.517052022137754])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 22) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Kingston >= min_dist & single_data.Kingston <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.3024321508555067, 51.403409581653406])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 23) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Brunel >= min_dist & single_data.Brunel <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.4728126051950687, 51.53244403168331])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 24) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Birkbeck >= min_dist & single_data.Birkbeck <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.13036824602624447, 51.52195641423611])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 25) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.RH >= min_dist & single_data.RH <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.563051773018152, 51.425713117968606])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 26) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.SOAS >= min_dist & single_data.SOAS <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.1291624423323022, 51.52235665511865])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 27) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.east >= min_dist & single_data.east <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([0.06502685397321095, 51.50755989080029])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 28) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.west >= min_dist & single_data.west <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.30334650103263694, 51.50715074898964])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 29) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.Greenwich >= min_dist & single_data.Greenwich <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.006631828839630083, 51.482792737537046])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }

            if (university == 30) {
                for (var i = 0; i < len; i++) {

                    var single_data = result[i];

                    if (single_data.religion >= min_religion & single_data.religion <= max_religion
                      & single_data.crime_rate >= min_cr & single_data.crime_rate <= max_cr
                      & single_data.modern >= min_modern & single_data.modern <= max_modern
                      & single_data.RCA >= min_dist & single_data.RCA <= max_dist
                      & single_data.rentpw >= min_rent & single_data.rentpw <= max_rent
                      & single_data.PTAL >= min_ptal & single_data.PTAL <= max_ptal) {

                        //添加到最终的列表里
                        temp.push(single_data);
                    }

                }
                data = temp;

                len = data.length;
                console.log("过滤后len=" + len);

                marker = new mapboxgl.Marker()
                    .setLngLat([-0.17929543068589718, 51.50122422373992])
                    .addTo(map);

                for (var j = 0; j < len; j++) {

                    var draw_data = data[j];

                    var coor = lineString(draw_data);

                    point1.push(coor);
                }
                //alert("c");
                rent_data = FeatureCollection(point1);
                console.log(rent_data);
            }



            console.log(123);
            source = map.addSource('rent_data', {
                type: 'geojson',
                data: rent_data
            });

            console.log(1234)
            layer_ = map.addLayer({
                'id': 'rent_info',
                'type': 'circle',
                'source': 'rent_data',
                'paint': {
                    'circle-radius': 8,
                    'circle-stroke-width': 2,
                    'circle-color': '#3a78b1',
                    'circle-stroke-color': 'white'
                }
            });


            console.log(12345)

            map.on('mouseenter', 'rent_info', function (e) {
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

            map.on('mouseleave', 'rent_info', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });

            //change the json file to geojson file
            function lineString(coordinates, properties, options) {
                return feature({
                    type: "Point",
                    coordinates: draw_data.Centroids,
                },
                    properties,
                    options)
            }

            function feature(geometry, properties, options) {
                var feat = {
                    type: "Feature"
                };
                feat.properties = {
                    "id": draw_data.id,
                    "all_properties": draw_data.all_properties,
                    "old": draw_data.old,
                    "rentpw": draw_data.rentpw,
                    "crime_rate": draw_data.crime_rate,
                    "ptai": draw_data.PTAL,
                    "modern": draw_data.modern,
                    "description": '<strong>MSOA ID: </strong>' + draw_data.id
                     + '</br><strong>MSOA Name: </strong>' + draw_data.msoa_name
                     + '</br><strong>Rent Per Week: </strong>' + "£" + draw_data.rentpw 
                     + '</br><strong>Crime Rate: </strong>' + draw_data.crime_rate
                     + '</br><strong>Minority Religions Population Proportion: </strong>' + draw_data.religion + "%"
                     + '</br><strong>PTAL: </strong>' + draw_data.PTAL
                     + '</br><strong>Number of Properties: </strong>' + draw_data.all_properties
                     + '</br><strong>House Type Data: </strong>'
                     + '</br>Old property proportion: ' + draw_data.old + "%"
                     + '</br>Modern property proportion: ' + draw_data.modern + "%"
                     + '</br>Flat proportion: ' + draw_data.flat_perc + "%"
                     + '</br>House proportion: ' + draw_data.house_perc + "%"
                     + '</br><strong>Studio proportion: </strong>' + draw_data.studio_perc + "%"


                };
                feat.geometry = geometry;
                return feat;
            }

            rent_data = FeatureCollection(point1);
            function FeatureCollection(features) {
                var fc = {
                    type: "FeatureCollection"
                };
                fc.features = features;
                return fc;
            }
        }
    })
})
