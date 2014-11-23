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
      var data = {
        dishId : dish._id,
        liked  : f,
        userId : $scope.user._id
      };
      $http.post('/updatefavorite', data).success(function(data) {
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
        console.log(data)            // like foursquare, present user with closest restaurant and then have option to choose "right" restaurant
        parentThis.restaurants = data;
        // calculate distance for restaurant and sort dishes while you're at it
        for (var rest in parentThis.restaurants) {
          parentThis.restaurants[rest].distance = Number(getDistanceFromLatLonInKm(self.lat,self.long,parentThis.restaurants[rest].lat,parentThis.restaurants[rest].long)).toFixed(4) * 1000;
          // var sortedDishes = parentThis.restaurants[rest].dishes.sort(function(obj1, obj2){return obj1.likes-obj2.likes});
          // parentThis.restaurants[rest].dishes = sortedDishes
          parentThis.restaurants[rest].show = false;
          // parentThis.restaurants[rest].selected = parentThis.restaurants[rest].dishes[4];
          // parentThis.restaurants[rest].first = parentThis.restaurants[rest].dishes[4];
          // parentThis.restaurants[rest].second = parentThis.restaurants[rest].dishes[3];
          // parentThis.restaurants[rest].third = parentThis.restaurants[rest].dishes[2];
          // parentThis.restaurants[rest].fourth = parentThis.restaurants[rest].dishes[1];
          // parentThis.restaurants[rest].fifth = parentThis.restaurants[rest].dishes[0];

        }
        for (var rest in parentThis.restaurants) {
          var sortedDistance = parentThis.restaurants.sort(function(obj1, obj2){return obj1.distance-obj2.distance});
        }

        parentThis.restaurants[0].show = true;
        

        
        });
      });
    }

    $scope.showRest = function(restId) {
      for ( var rest in parentThis.restaurants) {
        if (parentThis.restaurants[rest]._id ==restId) {
          console.log(parentThis.restaurants[rest].name);
          for (var r in parentThis.restaurants) {
            if (parentThis.restaurants[r].show == true) {
              parentThis.restaurants[r].show = false;
            }
          }
        parentThis.restaurants[rest].show = true;
        $scope.showDetails = ! $scope.showDetails;
        }
      }
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
