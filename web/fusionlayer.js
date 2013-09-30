var map, layer;

function initialize() {
  var charlotte = new google.maps.LatLng(35.227189, -80.843067);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: charlotte,
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

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

  var legend = document.getElementById('legend');

  for (var key in layer.styles) {
    var type = layer.styles[key]
    var div = document.createElement('div');
    var name = type.where
    var color = type.markerOptions.iconName
    div.innerHTML = name + '   -   ' + color
    legend.appendChild(div);
  }

  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
    document.getElementById('legend'));

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

google.maps.event.addDomListener(window, 'load', initialize);
