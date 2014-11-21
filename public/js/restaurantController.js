var RestaurantController = function($http, $scope) {
  var parentThis = this;


  this.favoriteToggle = function(restaurant, dish) {
    dish.favorited = !dish.favorited;
    var counter;
    var f;
    if (counter !== undefined) {
      clearTimeout(counter);
    }
    counter = setTimeout(function() {
      if (dish.favorited) {
        f = 1;
      } else {
        f = 0;
      }
      var favoriteUrl = 'http://localhost:3000/updatefavorite/' + restaurant.id + '/' + dish.id + '/' + f;
      $http.get(favoriteUrl).success(function(data) {
        console.log(data);
      });
    }, 50);  
  }
  
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // self.long = position.coords.longitude;
      // self.lat = position.coords.latitude;
      self.lat = 40.445;
      self.long = -79.949;
      var geoUrl = 'http://localhost:3000/getrestaurant/' + self.long + '/' + self.lat;
      $http.get(geoUrl).success(function(data) {
        console.log(data)
          // only one restaurant is found
          if (data.length == 1) {
            // sort dishes in order of likes
            var sortedD = data[0].dishes.sort(function(obj1, obj2){return obj1.likes-obj2.likes});
            console.log("There is only one restaurant match");
            data[0].dishes = sortedD;
            // data comes in as an array, not an object
            parentThis.restaurant = data[0];
            parentThis.restaurant.unknown = false;
            parentThis.restaurant.selected = data[0].dishes[4];
            parentThis.restaurant.first = data[0].dishes[4];
            parentThis.restaurant.second = data[0].dishes[3];
            parentThis.restaurant.third = data[0].dishes[2];
            parentThis.restaurant.fourth = data[0].dishes[1];
            parentThis.restaurant.fifth = data[0].dishes[0];
          }
          else if ( data.length > 1) {
            // like foursquare, present user with closest restaurant and then have option to choose "right" restaurant
            console.log("There are multiple restaurants");
            parentThis.restaurants = data;
            // you need to calculate the closest restaurant
            var min = Number(getDistanceFromLatLonInKm(self.lat,self.long,parentThis.restaurants[0].lat,parentThis.restaurants[0].long)).toFixed(4) * 1000;
            var firstRest = parentThis.restaurants[0];
            for (var rest in parentThis.restaurants) {
              parentThis.restaurants[rest].distance = Number(getDistanceFromLatLonInKm(self.lat,self.long,parentThis.restaurants[rest].lat,parentThis.restaurants[rest].long)).toFixed(4) * 1000;
              if (min > parentThis.restaurants[rest].distance) {
                min = parentThis.restaurants[rest].distance;
                firstRest = parentThis.restaurants[rest];
              }
            }
            // notice parentThis.restaurant instead of parentThis.restaurants; restaurant is the closest one, but need to keep all of them so you don't reload
            parentThis.restaurant = firstRest;
            // same stuff as first if clause
            var sortedD = parentThis.restaurant.dishes.sort(function(obj1, obj2){return obj1.likes-obj2.likes});
            parentThis.restaurant.dishes = sortedD;
            parentThis.restaurant.unknown = true;
            parentThis.restaurant.selected = parentThis.restaurant.dishes[4];
            parentThis.restaurant.first = parentThis.restaurant.dishes[4];
            parentThis.restaurant.second = parentThis.restaurant.dishes[3];
            parentThis.restaurant.third = parentThis.restaurant.dishes[2];
            parentThis.restaurant.fourth = parentThis.restaurant.dishes[1];
            parentThis.restaurant.fifth = parentThis.restaurant.dishes[0];
          }
        });
      });
    }
  };

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}


angular.module('top5').controller('RestaurantController', RestaurantController);

