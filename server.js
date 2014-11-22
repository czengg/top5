
var http     = require('http'),
    path     = require('path'),
    fs       = require('fs'),
    url      = require('url'),
    mongo    = require('mongodb'),
    mongoose = require('mongoose'),
    express  = require('express'),
    jade = require('jade');

var app = express();
var router = express.Router();
var pub = path.join(__dirname, 'public');

//all environments
app.set('port', process.env.PORT || 3000);
app.use(express.static(pub));
// app.use(passport.initialize());
// app.use(passport.session());
app.set('views', pub + '/views');
app.set('view engine', 'jade');

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

// var Dish = new Schema({
//   id             : { type: Number , required: true },
//   name           : { type: String , required: true },
//   type           : { type: String , required: true },
//   description    : { type: String , required: true },
//   favorited      : { type: Boolean, required: true },
//   likes          : { type: Number , required: true },
// });
// var DishModel = db.model('Dish', Dish);

var Restaurant = new Schema({
  name     : { type: String, required: true },
  lat      : { type: Number, required: true },
  long      : { type: Number, required: true },
  hasMenu   : { type: Boolean, required: true}.
  dishes : [{
    name           : { type: String , required: true },
    type           : { type: String , required: true },
    description    : { type: String , required: true },
    price          : { type: Number, required: true},
    favorited      : { type: Boolean, required: true },
    likes          : { type: Number, required: true},
    menuCat        : { type: String, required: true}
  }]
});

var RestaurantModel = db.model('Restaurant', Restaurant);

router.get('/', function (req, res) {
    res.render('index');
});


// ----------------------------------------------------
// SAMPLE DATABASE STUFF
// ----------------------------------------------------

RestaurantModel.find().remove().exec();

var lulus = new RestaurantModel({
  name: "Lulu's Noodles",
  lat: 40.4451450, //40.4451450
  long: -79.9490840, //-79.9490840
  hasMenu: false,
  dishes : [{
    name: 'Pad Thai',
    type: 'food',
    description : "Thai rice noodles stir fried in a special thai sauce with egg, tofu, bean sprouts, green onions, and chopped peanuts, then garnished with bean sprouts and red cabbage.",
    price : 7.25,
    favorited : true,
    likes : 2
  },
  {
    name: 'Singapore Rice Noodle',
    type: 'food',
    description : "Vermicelli rice noodles stir fried in light curry with shrimp, chicken, bean sprouts, onion and eggs.",
    price : 7.25,
    favorited : false,
    likes : 4
  },
  {
    name: 'Beef Chow Fun',
    type: 'food',
    description : "Fried wide rice noodles, beansprouts, greenonions, stir fried in special sauce handed down from mama's recipes.",
    price : 7.25,
    favorited : false,
    likes : 10
  },
  {
    name: 'Traditional Fried Rice',
    type: 'food',
    description : "Seasoned rice, greenpeas, carrot, onion, egg, your choice of meats.",
    price : 7.25,
    favorited : false,
    likes : 1
  },
  {
    name: 'Fresh Mango Bubble Tea',
    type: 'drink',
    description : "Milk Tea with Bubbles made with Fresh Mango",
    price : 3.95,
    favorited : false,
    likes : 0
  },
  ]
});

var ab = new RestaurantModel({
  name: "Ali Baba",
  lat: 40.4450560, //40.4450560
  long: -79.9490590, //-79.9490590
  hasMenu: true,
  dishes : [{
    name: 'Hummus',
    type: 'food',
    description : "A famous vegetable dip made from mashed chick pea, mixed with crushed sesame syrup, lemon juice, topped with garlic, oregano, paprika, and oil.",
    price : 3.95,
    favorited : true,
    likes : 2,
    menuCat: "A La Carte"
  },
  {
    name: 'Vegetarian Grape Leaves',
    type: 'food',
    description : "Cooked grape leaves stuffed with rice and ground lamb meat, served warm, or strictly vegetarian served cold",
    price : 4.95,
    favorited : false,
    likes : 4,
    menuCat: "A La Carte"
  },
  {
    name: 'Spinach & Lentil Soup',
    type: 'food',
    description : "A delicious mixture of lentils, spinach, potatoes, lemon juice, & spices",
    price : 4.95,
    favorited : false,
    likes : 10,
    menuCat: "A La Carte"
  },
  {
    name: 'Kebab Platter with Chicken',
    type: 'food',
    description : "A compartment dish consisting of hummus, tossed salad, rice with pignour nuts, and topped with a skewer of tender",
    price : 13.45,
    favorited : false,
    likes : 1,
    menuCat: "Main"
  },
  {
    name: 'Moussaka',
    type: 'drink',
    description : "Layers of eggplant, tomatoes, potatoes, and spiced ground lamb in a light sauce. smothered with melted cheese, and served with a salad.",
    price : 12.95,
    favorited : false,
    likes : 0,
    menuCat: "Main"
  },
  {
    name: 'Shish Kebab Dinner',
    type: 'food',
    description : "Tender pieces of the finest meat, made to your taste served with a toassed salad, and rice. includes a beverage and dessert.",
    price : 14.95,
    favorited : false,
    likes : 0,
    menuCat: "Main"
  },
  {
    name: 'Baklawa',
    type: 'food',
    description : "Phyllo dough filled with ground walnuts, soaked with honey",
    price : 2.45,
    favorited : false,
    likes : 0,
    menuCat: "Pastries"
  }
  ]
});



lulus.save(function(err,lulus) {
    // we've updated the dog into the db here
    if (err) throw err;
      console.log(ab);
  })

ab.save(function(err,ab) {
    // we've updated the dog into the db here
    if (err) throw err;
        console.log(ab);
  })

// ----------------------------------------------------


// get all dishes for restaurant given longitude and latitude
router.get('/getrestaurant/:long/:lat', function(req, res) {

 RestaurantModel.find({

    // find all restaurants, then sort the data; if you can find a way to write a better query, would be awesome

    // long : Number(parseFloat(req.params.long).toFixed(3)),
    // lat  : Number(parseFloat(req.params.lat).toFixed(3))

 }, function(restaurantErr, restaurants) {
    if (restaurantErr) { res.send(JSON.stringify(restaurantErr)); }
    var rests = [];
    for ( var j in restaurants) {
      if (restaurants[j].lat == req.params.lat && restaurants[j].long == req.params.long) {
        rests.push(restaurants[j]);
      }
    }
    if ( rests.length == 0) {
      console.log(rests);
      for ( var x in restaurants) {
        if (Number(parseFloat(restaurants[x].lat).toFixed(3)) == Number(parseFloat(req.params.lat).toFixed(3)) && Number(parseFloat(restaurants[x].long).toFixed(3)) == Number(parseFloat(req.params.long).toFixed(3))) {
          rests.push(restaurants[x]);
        }
      }
    }
    res.send(JSON.stringify(rests));
  });
});

router.get('/updatefavorite/:restaurant/:dish/:favorite', function(req, res) {
  DishModel.findOne({
    id: req.params.dish
  }, function(err, dish) {
    if (err) { res.send(err) }
    if (req.params.dish === 1) {
      dish.favorited = true;
      dish.likes += 1;
    } else {
      dish.favorited = false;
      dish.likes -= 1;
    }
    dish.save(function(err) {
      if (err) {
        res.send(err);
      } else {
        res.send(dish);
      }
    });
  });
});

router.get('/addrestaurant/:name/:lat/:lon', function(req, res) {
  var restaurant = new RestaurantModel({
    name: req.params.name,
    lat: req.params.lat,
    long: req.params.long
  });
  restaurant.save(function(err){
    if (err) { res.send(err) }
    res.send(restaurant);
  });
});

router.post('/adddish', function(req, res) {
  RestaurantModel.findOne({
    name: req.body.restaurant
  }, function (err, restaurant) {
    if (err) { res.send(err) }
    var dish = new DishModel({
      name: req.body.dish.name,
      type: req.body.dish.type,
      description: req.body.dish.description,
      favorited: req.body.dish.favorited,
      likes: req.body.dish.likes,
      restaurant_id: restaurant._id
    });
    dish.save(function(err) {
      if (err) { res.send(err) }
      res.send(dish);
    });
  });
});

app.use('/', router);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});