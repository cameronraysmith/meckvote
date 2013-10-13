var map, legend, layer;

var LAYER_STYLES = {
    'All': {
    'names': [
      'R,L',
      //'3x',
      //'2x',
      'B & (D or U)',
      'NB & (D or U)'
    ],
    'colors': [
      '#FE4D54',
      //'#FFFF86',
      //'#89FF85',
      '#8681FF',
      '#89FFFF'
    ]
  }
}

function initialize() {
  var charlotte = new google.maps.LatLng(35.227189, -80.843067);

  //var gm = google.maps;
  // var map = new gm.Map(document.getElementById('map_canvas'), {
  //   mapTypeId: gm.MapTypeId.SATELLITE,
  //   center: new gm.LatLng(50, 0),
  //   zoom: 6
  // });


  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: charlotte,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var oms = new OverlappingMarkerSpiderfier(map);

  createLegend(map);

  layer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'address\'',
      //from: '13pTC4zerW2jyOQ5UyOgyg4VuA6p0ktjXrP8T_rw'
      from: '1TRkfvxdm-shotrDWOo2S0np0eu9vLn6p02CoHhI'
    },
    styles: [
    {
      where: "party_cd IN ('REP', 'LIB')",
      markerOptions: {
        iconName: "small_red"
      }
    },
     {
      where: "party_cd IN ('DEM','UNA')",
      markerOptions: {
        iconName: "measle_turquoise"
      }
    },
      {
      where: "party_cd IN ('DEM','UNA') AND race_code = 'B'",
      //where: 'race_code = B',
      markerOptions: {
        iconName: "small_blue"
      }
    }],
    map: map
  });

 google.maps.event.addListener(layer, 'click', function(e) {
          // Change the content of the InfoWindow
          e.infoWindowHtml = e.row['full_name_mail'].value + "<br>" +
                             e.row['party_cd'].value + " " +
                             e.row['race_code'].value + " " +
                             e.row['sex_code'].value + " " +
                             e.row['age'].value + "<br>" +
                             "Vote count: " +
                             e.row['vote_count'].value + "<br>" +
                             e.row['address'].value + "<br>";

          // Add note if primary voter
          if (e.row['prim_vote'].value == 1) {
            e.infoWindowHtml += "!!2013 Primary Voter!!";
          }
          // Add note if registered 2013
          if (e.row['reg2013'].value == 1) {
            e.infoWindowHtml += "!!Registered in 2013!!";
          }
  });

}

function createLegend(map) {
      var legendWrapper = document.createElement('div');
      map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
          legendWrapper);
      legendContent(legendWrapper);
    }

function legendContent(legendWrapper) {
      var legend = document.createElement('div');
      legend.id = 'legend';

      var title = document.createElement('p');
      title.innerHTML = 'votes (#)';
      legend.appendChild(title);

      var layerStyle = LAYER_STYLES['All'];
      var colors = layerStyle.colors;
      var names = layerStyle.names;
      for (var i = 0; i < colors.length; i++) {
        var legendItem = document.createElement('div');

        var color = document.createElement('div');
        color.setAttribute('class', 'color');
        color.style.backgroundColor = colors[i];
        legendItem.appendChild(color);

        var minMax = document.createElement('span');
        minMax.innerHTML = names[i];
        legendItem.appendChild(minMax);

        legend.appendChild(legendItem);
      }

      legendWrapper.appendChild(legend);
    }

google.maps.event.addDomListener(window, 'load', initialize);
