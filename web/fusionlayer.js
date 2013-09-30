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
    }]
  });
  layer.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
