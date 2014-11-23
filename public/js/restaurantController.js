var RestaurantController = function($http, $scope) {

  $scope.favoriteToggle = function(dish) {
    dish.favorited = !dish.favorited;
    console.log(dish);
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
      console.log(dish._id);
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
    var that = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      // self.long = position.coords.longitude;
      // self.lat = position.coords.latitude;
      self.lat = 40.445;
      self.lon = -79.949;
      var geoUrl = 'http://localhost:3000/getrestaurant/' + self.lon + '/' + self.lat;
      $http.get(geoUrl).success(function(data) {
        
        that.restaurants = data.restaurants;
        var dishes = data.dishes;

        for (var rest in that.restaurants) {
          for ( var d in dishes ) {
            if ( that.restaurants[rest]._id == dishes[d]._id) {
              dishes[d]['dishes'].forEach(function(dish) {
                var i = $scope.user.favorited.indexOf(dish._id);
                if (i < 0) {
                  dish.favorited = false;
                } else {
                  dish.favorited = true;
                }
              });

              that.restaurants[rest].dishes = dishes[d]['dishes'];
            }
          }
        }

        for (var rest in that.restaurants) {
          that.restaurants[rest].distance = Number(getDistanceFromLatLonInKm(self.lat,self.lon,that.restaurants[rest].lat,that.restaurants[rest].lon)).toFixed(4) * 1000;
          that.restaurants[rest].show = false;
          that.restaurants[rest].selected = that.restaurants[rest].dishes[0];
        }
        for (var rest in that.restaurants) {
          var sortedDistance = that.restaurants.sort(function(obj1, obj2){return obj1.distance-obj2.distance});
        }

        that.restaurants[0].show = true;

        });
      });
    }

    this.showRest = function(restId) {
      for ( var rest in this.restaurants) {
        if (this.restaurants[rest]._id ==restId) {
          for (var r in this.restaurants) {
            if (this.restaurants[r].show == true) {
              this.restaurants[r].show = false;
            }
          }
        this.restaurants[rest].show = true;
        this.showDetails = ! this.showDetails;
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

 // c.restaurant.first === dish ? 'row-first' : (c.restaurant.second === dish ? 'row-second' : (c.restaurant.third === dish ? 'row-third' :(c.restaurant.fourth === dish ? 'row-fourth' : (c.restaurant.fifth === dish ? 'row-fifth' : 'row' )))) 

angular.module('top5').controller('RestaurantController', RestaurantController);

