var map, legend, layer;

var LAYER_STYLES = {
    'All': {
    'names': [
      '4x',
      '3x',
      '2x',
      '1x',
      '0x'
    ],
    'colors': [
      '#FE4D54',
      '#FFFF86',
      '#89FF85',
      '#89FFFF',
      '#8681FF'
    ]
  }
}

function initialize() {
  var charlotte = new google.maps.LatLng(35.227189, -80.843067);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: charlotte,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  createLegend(map);

  layer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'address\'',
      from: '13pTC4zerW2jyOQ5UyOgyg4VuA6p0ktjXrP8T_rw'
    },
    styles: [{
      where: 'vote_count = 4',
      markerOptions: {
        iconName: "small_red"
      }
    },
      {
      where: 'vote_count = 3',
      markerOptions: {
        iconName: "small_yellow"
      }
    },
      {
      where: 'vote_count = 2',
      markerOptions: {
        iconName: "small_green"
      }
    },
      {
      where: 'vote_count = 1',
      markerOptions: {
        iconName: "small_blue"
      }
    },
      {
      where: 'vote_count = 0',
      markerOptions: {
        iconName: "measle_turquoise"
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
