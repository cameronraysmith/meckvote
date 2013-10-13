function main() {

      var map;
      var charlotte = new google.maps.LatLng(35.227189, -80.843067);
      //var district4 = new google.maps.LatLng(35.227189, -80.843067);

      // create google maps map
      var mapOptions = {
        zoom: 11,
        center: charlotte,
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'),  mapOptions);

      var mapStyle = [{
      stylers: [{ saturation: -65 }, { gamma: 1.52 }] }, {
      featureType: "administrative", stylers: [{ saturation: -95 }, { gamma: 2.26 }] }, {
      featureType: "water", elementType: "labels", stylers: [{ visibility: "on" }] }, {
      featureType: "administrative.locality", stylers: [{ visibility: 'on' }] }, {
      featureType: "road", stylers: [{ visibility: "simplified" }, { saturation: -99 }, { gamma: 2.22 }] }, {
      featureType: "poi", elementType: "labels", stylers: [{ visibility: "on" }] }, {
      featureType: "road.arterial", stylers: [{ visibility: 'on' }] }, {
      featureType: "road.local", elementType: "labels", stylers: [{ visibility: 'on' }] }, {
      featureType: "transit", stylers: [{ visibility: 'on' }] }, {
      featureType: "road", elementType: "labels", stylers: [{ visibility: 'on' }] }, {
      featureType: "poi", stylers: [{ saturation: -55 }]
      }];

      // Set the map style
      map.setOptions({ styles: mapStyle });

      // get voter data from cartodb
      var voteLayerUrl = 'http://cameronraysmith.cartodb.com/api/v2/viz/53a5193e-3450-11e3-93be-d9a071d77a57/viz.json';
      // get precinct data from cartodb
      var precLayerUrl = 'http://cameronraysmith.cartodb.com/api/v2/viz/5a50fa4a-3451-11e3-a1af-7793533fdd91/viz.json';

      var sublayers = [];


      // create layer and add to the map, then add some intera
      cartodb.createLayer(map, precLayerUrl)
        //.addTo(map)
        .on('done', function(layer) {
          map.overlayMapTypes.setAt(0, layer);
          var sublayer1 = layer.getSubLayer(0);
        // sublayer.on('featureOver', function(e, pos, latlng, data) {
        //   cartodb.log.log(e, pos, latlng, data);
        // });

        // sublayer.on('error', function(err) {
        //   cartodb.log.log('error: ' + err);
        // });
        sublayers.push(sublayer1);
      })
      .on('error', function() {
        cartodb.log.log("some error occurred");
      });

      cartodb.createLayer(map, voteLayerUrl)
      //.addTo(map)
      .on('done', function(layer) {
        map.overlayMapTypes.setAt(1, layer);
        var sublayer2 = layer.getSubLayer(0);
        // sublayer.on('featureOver', function(e, pos, latlng, data) {
        //   cartodb.log.log(e, pos, latlng, data);
        // });

        // sublayer.on('error', function(err) {
        //   cartodb.log.log('error: ' + err);
        // });
        sublayers.push(sublayer2);
      })
      .on('error', function() {
        cartodb.log.log("some error occurred");
      });

      var LayerActions = {
      all: function(){
        sublayers[1].setSQL("SELECT * FROM district4vote");
        sublayers[0].hide();
        return true;
      },
      black: function(){
        sublayers[1].setSQL("SELECT * FROM district4vote WHERE race_code IN ('B  ') OR race_code IS NULL AND party_cd IN ('DEM','UNA') OR party_cd IS NULL");
        sublayers[0].hide();
        return true;
      },
      other: function(){
        sublayers[1].setSQL("SELECT * FROM district4vote WHERE race_code IN ('W  ','U  ','O  ','M  ','A  ','I  ') OR race_code IS NULL AND party_cd IN ('DEM','UNA') OR party_cd IS NULL");
        sublayers[0].hide();
        return true;
      },
      precincts: function(){
        sublayers[0].show();
        return true;
      }
    }

      $('.button').click(function() {
      $('.button').removeClass('selected');
      $(this).addClass('selected');
      LayerActions[$(this).attr('id')]();
      });

      LayerActions[$(this).attr('id')]();

      // var PrecActions = {
      //   precincts: function(){
      //   sublayers[1].hide();
      //   return true;
      // }
      // }
  }

google.maps.event.addDomListener(window, 'load', main);
