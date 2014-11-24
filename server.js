
var http       = require('http'),
    path       = require('path'),
    fs         = require('fs'),
    url        = require('url'),
    mongo      = require('mongodb'),
    mongoose   = require('mongoose'),
    express    = require('express'),
    jade       = require('jade'),
    bodyParser = require('body-parser');

var app = express();
var router = express.Router();
var pub = path.join(__dirname, 'public');

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(pub));
app.set('views', pub + '/views');
app.set('view engine', 'jade');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// establish mongo connection
var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/data';
var db = mongoose.createConnection(mongoUri);
db.on('error', function(err) {
  console.log('MongoDB connection error:', err);
});
db.once('open', function() {
  console.log("MongoDB connected");
});


// New mongoose schema to create our
var Schema = mongoose.Schema;
var Collection = mongoose.Collection;


var Dish = new Schema({
  name           : { type: String , required: true },
  category       : { type: String , required: true },
  description    : { type: String , required: true },
  price          : { type: Number , required: true },
  likes          : { type: Number , required: true },
  menu_cat       : { type: String , required: true },
  restaurant_id  : { type: String , required: false } 
});
var DishModel = db.model('Dish', Dish);

var Restaurant = new Schema({
  name      : { type: String, required: true },
  lat       : { type: Number, required: true },
  lon      : { type: Number, required: true },
});

var RestaurantModel = db.model('Restaurant', Restaurant);

var User = new Schema({
  name            : { type: String,  required: true  },
  fb_id           : { type: Number,  required: true  },
  favorited       : { type: Array ,  required: false }
});
var UserModel = db.model('User', User);

router.get('/', function (req, res) {
  res.render('index');
});

router.post('/login', function (req, res) {
  UserModel.findOne({
    fb_id: req.body.fb_id
  }, function(err, user) {
    if (err) { res.send(JSON.stringify(err)); } else {
      if (user === null) {
        var user = new UserModel({
          name       : req.body.first_name,
          fb_id      : parseInt(req.body.fb_id),
          favorited  : new Array()
        });

        user.save(function(userErr) {
          if (userErr) { res.send(JSON.stringify(userErr)); } else {
            res.send(JSON.stringify({
              user  : user,
              isNew : true
            }));
          }
        });
      } else {
        res.send(JSON.stringify({
          user  : user,
          isNew : false
        }));
      }
    }
  });
});

// RestaurantModel.find().remove().exec();
// DishModel.find().remove().exec();



// get all dishes for restaurant given longitude and latitude
router.get('/getrestaurant/:long/:lat', function(req, res) {
  RestaurantModel.find({}, function(err, restaurants){
    DishModel.aggregate([
      { $group: {
          _id:  "$restaurant_id", dishes: { 
            $push: {
              _id : "$_id", 
              name : "$name", 
              category : "$category", 
              description : "$description", 
              price : "$price", 
              menu_cat : "$menu_cat", 
              likes : "$likes"
            } 
          }
        }
      }
    ], function (err, result) {
      if (err) {
        res.send(JSON.stringify(err));
      } else {
        res.send({restaurants : restaurants, dishes : result});
      }
    });
  }); 
});

router.post('/updatefavorite', function(req, res) {
  DishModel.findOne({
    _id: req.body.dishId
  }, function(err, dish) {
    if (err) { res.send(JSON.stringify(err)); } else {
      if (req.body.liked === 1) {
        dish.likes += 1;
      } else {
        dish.likes -= 1;
      }
      dish.save(function(err) {
        if (err) { res.send(JSON.stringify(err)); } else {
          UserModel.findOne({
            _id: req.body.userId
          }, function(err, user) {
            if (err) { res.send(JSON.stringify(err)); } else {

              if (req.body.liked === 1) {
                user.favorited.push(req.body.dishId);
              } else {
                var i = user.favorited.indexOf(req.body.dishId);
                user.favorited.splice(i, 1);
              }
              user.save(function(userErr) {
                if (userErr) { res.send(JSON.stringify(userErr)); } else {
                  res.send(user);
                }
              });
            }
          });
        }
      });
    }
  });

});

router.post('/addrestaurant', function(req, res) {
  var restaurant = new RestaurantModel({
    name: req.body.name,
    lat: req.body.lat,
    lon: req.body.lon
  });
  restaurant.save(function(err){
    if (err) { res.send(err) } else {
      res.send(restaurant);
    }
  });
});

router.post('/adddish', function(req, res) {
  RestaurantModel.findOne({
    _id: req.body.restaurant
  }, function (err, restaurant) {
    if (err) { res.send(err) } else {
      var dish = new DishModel({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price : req.body.price,
        likes: req.body.likes,
        menu_cat : req.body.menu_cat,
        restaurant_id: restaurant._id
      });
      dish.save(function(err) {
        if (err) { res.send(err) } else {
          res.send(dish);
        }
      });
    }
  });
});

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

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});