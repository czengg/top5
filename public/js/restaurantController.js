var RestaurantController = function($http, $scope) {

  var that = this;

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
    navigator.geolocation.getCurrentPosition(function(position) {
      // self.long = position.coords.longitude;
      // self.lat = position.coords.latitude;
      self.lat = 40.445;
      self.lon = -79.949;
      var geoUrl = 'http://localhost:3000/getrestaurant/' + self.lon + '/' + self.lat;
      $http.get(geoUrl).success(function(data) {
        
        that.restaurants = data.restaurants;
        var aggregated = data.dishes;

        for (var rest in that.restaurants) {

          // ADD CATEGORIES AND FAVORITES
          var restaurant = that.restaurants[rest];
          restaurant.menu_cats = {};

          for ( var g in aggregated ) {
            var group = aggregated[g];
            if ( restaurant._id === group._id) {
              group.dishes.forEach(function(dish) {
                if (restaurant.menu_cats[dish.menu_cat] === undefined){
                  restaurant.menu_cats[dish.menu_cat] = [];
                }
                restaurant.menu_cats[dish.menu_cat].push(dish);
                var i = $scope.user.favorited.indexOf(dish._id);
                if (i < 0) {
                  dish.favorited = false;
                } else {
                  dish.favorited = true;
                }
              });

              restaurant.dishes = group.dishes;
            }
          }

          // ADD DISTANCE AND SHOW DEFAULT
          restaurant.distance = Number(getDistanceFromLatLonInKm(self.lat,self.lon,that.restaurants[rest].lat,that.restaurants[rest].lon)).toFixed(4) * 1000;
          restaurant.show = false;
        }

        that.restaurants.sort(function(obj1, obj2){return obj1.distance-obj2.distance});

        that.restaurants[0].show = true;
      });
    });
  }

  $scope.showRest = function(restId) {
    console.log(restId);
    for ( var rest in that.restaurants) {
      if (that.restaurants[rest]._id ==restId) {
        for (var r in that.restaurants) {
          if (that.restaurants[r].show == true) {
            that.restaurants[r].show = false;
          }
        }
      that.restaurants[rest].show = true;
      $scope.showDetails = ! $scope.showDetails;
      }
    }
    that.tab = 1;
  }

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
};

 // c.restaurant.first === dish ? 'row-first' : (c.restaurant.second === dish ? 'row-second' : (c.restaurant.third === dish ? 'row-third' :(c.restaurant.fourth === dish ? 'row-fourth' : (c.restaurant.fifth === dish ? 'row-fifth' : 'row' )))) 

angular.module('top5').controller('RestaurantController', RestaurantController);

