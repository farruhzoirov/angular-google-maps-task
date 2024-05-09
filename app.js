//Data
var cities = [
  {
    city : 'Turkmenistan',
    desc : 'Turkmenistan, Ashgabat',
    lat : 37.970147,
    long :  58.381021
  },
  {
    city : 'India',
    desc : 'This is India',
    lat : 23.117509,
    long : 79.929764
  },
  {
    city : 'Turkey',
    desc : 'Turkish ',
    lat : 38.724091,
    long : 35.484498
  },
  {
    city : 'Uzbekistan',
    desc : 'This is Uzbekistan',
    lat : 41.304208,
    long : 69.246543
  },
  {
    city : 'Uzbekistan, Khorezm',
    desc : 'This is Khorezm',
    lat : 41.547094,
    long : 60.627519
  }
];

angular.module('mapsApp', [])
    .controller('MapCtrl', function ($scope) {

      var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
      }

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      $scope.markers = [];

      var infoWindow = new google.maps.InfoWindow();

      var createMarker = function (info){

        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(info.lat, info.long),
          title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';

        google.maps.event.addListener(marker, 'click', function(){
          infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          infoWindow.open($scope.map, marker);
        });

        $scope.markers.push(marker);

      }

      for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
      }

      $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
      }

    });