var RestaurantController = function ($http, $scope) {
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
          console.log(data);
          console.log(data.length);
          if (data.length == 1) {
            var sortedD = data[0].dishes.sort(function(obj1, obj2){return obj1.likes-obj2.likes});
            console.log(sortedD);
            data[0].dishes = sortedD;
            parentThis.restaurant = data[0];
            parentThis.restaurant.selected = data[0].dishes[4];
            parentThis.restaurant.first = data[0].dishes[4];
            parentThis.restaurant.second = data[0].dishes[3];
            parentThis.restaurant.third = data[0].dishes[2];
            parentThis.restaurant.fourth = data[0].dishes[1];
            parentThis.restaurant.fifth = data[0].dishes[0];
          }
          else if ( data.length > 1) {
            parentThis.restaurant = data[0];
            var sortedD = data[0].dishes.sort(function(obj1, obj2){return obj1.likes-obj2.likes});
            
            data[0].dishes = sortedD;
            console.log(data[0]);
            parentThis.restaurant = data[0];
            parentThis.restaurant.selected = data[0].dishes[4];
            parentThis.restaurant.first = data[0].dishes[4];
            parentThis.restaurant.second = data[0].dishes[3];
            parentThis.restaurant.third = data[0].dishes[2];
            parentThis.restaurant.fourth = data[0].dishes[1];
            parentThis.restaurant.fifth = data[0].dishes[0];

          }
        
      });
    });
  }
};



angular.module('top5').controller('RestaurantController', RestaurantController);
