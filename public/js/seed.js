
function addRestaurant(name, lat, lon, callback) {
  $.ajax({
    url: "/addrestaurant",
    method: "POST",
    data: {
      name: name,
      lat: lat,
      lon: lon
    },
    success: function(response) {
      callback(response);  
    }
  });
}

function addDish(name, type, description, price, likes, restaurant, menu_cat) {
  $.ajax({
    url: "/adddish",
    method: "POST",
    data: {
      name: name,
      category: type,
      description: description,
      likes: likes,
      restaurant: restaurant,
      menu_cat: menu_cat
    },
    success: function(response) {
       console.log(response);
    }
  });
}

function seed() {
  addRestaurant("Lulu's Noodles", 40.4451450, -79.9490840, addLulus);
  addRestaurant("Ali Baba", 40.4450560, -79.9490590, addAlis); 
  addRestaurant("Subway", 40.444757, -79.948953, addSubway);
  addRestaurant("All India", 40.452213, -79.952632, addAllindia);
  addRestaurant("Union Grill", 40.169327, -80.245037, addUnionGrill);
  addRestaurant("Quiznos", 40.44559, -79.94924, addQuiznos);
  addRestaurant("Eat Unique", 40.44560, -79.94862, addEatunique);
  addRestaurant("Yuva India Indian Eatery", 40.44482, -79.94897, addYuvaIndia);
  addRestaurant("Orient Express", 40.44468, -79.94819, addOrientExpress);
  addRestaurant("The Bagel Factory", 40.43825, -79.91990, addTheBagelFactory);

}

function addLulus(response) {
  addDish("Pad Thai", "food", "Thai rice noodles stir fried in a special thai sauce with egg, tofu, bean sprouts, green onions, and chopped peanuts, then garnished with bean sprouts and red cabbage.", 7.25, 2, "Noodle Plates", response._id);

  addDish("Singapore Rice Noodle", "food",
    "Vermicelli rice noodles stir fried in light curry with shrimp, chicken, bean sprouts, onion and eggs.", 7.25, 4, "Noodle Plates", response._id);

  addDish("Beef Chow Fun", "food", "Fried wide rice noodles, beansprouts, greenonions, stir fried in special sauce handed down from mama's recipes.", 7.25, 10, "Noodle Plates", response._id);

  addDish("Traditional Fried Rice", "food", "Seasoned rice, greenpeas, carrot, onion, egg, your choice of meats.", 7.25, 1, "Fried Rice", response._id);

  addDish("Fresh Mango Bubble Tea", "drink", "Milk Tea with Bubbles made with Fresh Mango",
    3.95, 0, "Cool Stuff to Drink", response._id);
}

function addAlis(response) {
  addDish("Hummus", "food", "A famous vegetable dip made from mashed chick pea, mixed with crushed sesame syrup, lemon juice, topped with garlic, oregano, paprika, and oil.",
    3.95, 2, "A La Carte", response._id);

  addDish("Vegetarian Grape Leaves", "food", "Cooked grape leaves stuffed with rice and ground lamb meat, served warm, or strictly vegetarian served cold", 4.95, 4, "A La Carte", response._id);

  addDish("Spinach & Lentil Soup", "food", "A delicious mixture of lentils, spinach, potatoes, lemon juice, & spices", 4.95, 10, "A La Carte", response._id);

  addDish("Kebab Platter with Chicken", "food", "A compartment dish consisting of hummus, tossed salad, rice with pignour nuts, and topped with a skewer of tender", 13.45, 1, "Main", response._id);

  addDish("Moussaka", "food", "Layers of eggplant, tomatoes, potatoes, and spiced ground lamb in a light sauce. smothered with melted cheese, and served with a salad.", 12.95, 0, "Main", response._id);

  addDish("Shish Kebab Dinner", "food", "Tender pieces of the finest meat, made to your taste served with a toassed salad, and rice. includes a beverage and dessert.", 14.95, 0, "Main", response._id);

  addDish("Baklawa", "food", "Phyllo dough filled with ground walnuts, soaked with honey",
    2.45, 0, "Pastries", response._id);  
}

function addSubway(response) {
  addDish("Black Forest Ham", "food", 
    "Load it up with all the crunchy veggies you like on your choice of freshly baked bread. Even try it fresh toasted with melty cheese and mustard.",
    6.50, 3, response._id, "Sandwiches");

  addDish("Oven Roasted Chicken", "food",
    "The Oven Roasted Chicken you love is piled high atop freshly baked bread with your favorite toppings from spicy jalapenos to crisp green peppers.", 7.25, 3, response._id, "Sandwiches");

  addDish("Sweet Onion Chicken Teriyaki", "food", "This gourmet specialty is a flavorful blend of tender teriyaki glazed chicken strips and our own fat-free sweet onion sauce. Served hot & toasted on freshly baked bread, Mike Trout calls this protein-packed power hitter his favorite sub.", 7.00, 10, response._id, "Sandwiches");

  addDish("Turkey Breast", "food", "Get flavor without the flab when you try this American classic. Dive into tender turkey breast piled sky-high with everything from lettuce and tomatoes to banana peppers, maybe even jalapeños if you’re feeling spicy.", 7.65, 8, response._id, "Sandwiches");

  addDish("Veggie Delite", "food", "
Crispy, crunchy and classically delicious. The Veggie Delite® is tangible proof that a sandwich can be high in flavor without being high in fat. Try a delicious combination of lettuce, tomatoes, green peppers, cucumbers and onions with your choice of fat-free condiments on freshly baked bread.",
    6.95, 3, response._id, "Sandwiches");
}

function addAllindia(response) {
  addDish("Chicken Curry 1", "food", 
    "Delicious boneless chicken cooked n a delicately spiced curry sauce.",
    9.50, 8, response._id, "Entrees");

  addDish("Butter Chicken", "food",
    "Boneless chicken in a cream, nut and tomato gravy.", 11, 9, response._id, "Entrees");

  addDish("Mango Chicken Curry", "food", "Chicken cooked with mango, onion and tomato sauce with spices and herbs.", 10, 7, response._id, "Entrees");

  addDish("Saag Masala", "food", "Baby spinach cooked with chicken herbs and spices.", 7.65, 8, response._id, "Entrees");

  addDish("Chaas", "drink", "Gusjrati style spiced buttermilk.",
    4.35, 5, response._id, "Drinks");
}

function addUnionGrill(response) {
  
  addDish("White Pizza", "food", 
    "Spinach, olive oil, garlic, provolone, mozzarella and feta cheese.",
    3.50, 4, response._id, "Pizzas");

  addDish("Three Pepper Pizza", "food",
    "Fresh red, green and hot peppers.", 5.50, 6, response._id, "Pizzas");

  addDish("Garden Pizza", "food", "Fresh basil, red onions, roma tomatoes, provolone, mozzarella cheese and house vinaigrette.", 6.50, 5, response._id, "Pizzas");

  addDish("Chicken & Artichoke Pizza", "food", "Sautéed chicken, artichokes, roasted red peppers and hot banana peppers with garlic and olive oil, provolone, mozzarella and fontinella cheeses.", 7.00, 11, response._id, "Pizzas");

  addDish("Union Grill Focaccia Pizza", "food", "Provolone, mozzarella, Fontinella cheese, roma tomatoes and fresh basil.",
    6.35, 5, response._id, "Pizzas");
}

function addQuiznos(response) {

  addDish("Black Angus Steak", "food", 
    "Black Angus Steak, All-Natural Mozzarella & Cheddar, Sautéed Mushrooms & Onions, Honey Bourbon Mustard, Zesty Grille Sauce Served on your choice of Artisan Breads: White, Wheat, Rosemary Parmesan or Jalapeno Cheddar",
    9.50, 8, response._id, "Sandwiches");

  addDish("Roasted Beef And Horseradish", "food", "Black Angus roast beef with cheddar, sauteed onions, lettuce, tomato Served on your choice of Artisan Breads: White, Wheat, Rosemary Parmesan or Jalapeno Cheddar", 
    8.50, 4, response._id, "Sandwiches");

  addDish("Garden Pizza", "food", "Prime rib with mozzarella, sauteed onions, peppercorn sauce Served on your choice of Artisan Breads: White, Wheat, Rosemary Parmesan or Jalapeno Cheddar", 
    7.50, 9, response._id, "Sandwiches");

  addDish("French Dip", "food", "Prime Rib, All-Natural Mozzarella, Sauteed Bell Peppers & Onions, and Mild Peppercorn Sauce with a side of Au Jus Served on your choice of Artisan Breads: White, Wheat, Rosemary Parmesan or Jalapeno Cheddar", 
    7.00, 9, response._id, "Sandwiches");

  addDish("Double Swiss Prime RIb", "food", "Prime Rib, Double All-Natural Swiss, Sautéed Onions, Mayo Served on your choice of Artisan Breads: White, Wheat, Rosemary Parmesan or Jalapeno Cheddar",
    8.35, 8, response._id, "Sandwiches");
}

function addEatunique(response) {

  addDish("Meatloaf Melt", "food", 
    "A new twist on an old favorite. Homestyle meatloaf served hot on grilled farmbread with blue cheese, barbecue sauce, and bacon.",
    5.99, 8, response._id, "Sandwiches");

  addDish("Chicken Ranch Griller", "food", 
    "Grilled chicken breast, provolone, lettuce, tomato & bacon, with ranch dressing on a toasted roll.", 
    6.59, 9, response._id, "Sandwiches");

  addDish("Pesto Chicken Sandwich", "food", "Grilled chicken breast, smoked gouda, tomato, and spring greens on a toasted roll spread with pesto", 
    6.99, 13, response._id, "Sandwiches");

  addDish("California Chicken Club", "food", "Grilled chicken breast served with Swiss cheese, bacon, lettuce, and salsa mayo on toasted focaccia.", 
    6.99, 13, response._id, "Sandwiches");

  addDish("Classic BLT", "food", "The classic bacon lettuce and tomato sandwich served on toasted farm bread.",
    5.59, 11, response._id, "Sandwiches");
}

function addYuvaIndia(response) {

  addDish("Somosas", "food", 
    "Crisp, golden-brown pastries stuffed with mildly seasoned potatoes and a hint of lime.",
    3.99, 11, response._id, "Appetizers");

  addDish(" Mullifatwany Soup", "food", 
    "Roasted leg of lamb broth with all white-meat chicken and green onion.", 
    3.25, 10, response._id, "Appetizers");

  addDish("Lamb Slipper Kebobs", "food", "Pan-fried ground lamb, onion, shallots, ginger and chillies.", 
    8.99, 11, response._id, "Appetizers");

  addDish("Fire Roasted Wings", "food", "Wings marinated in yogurt and freshly ground spices, then roasted in the tandoor..", 
    8.25, 9, response._id, "Appetizers");

  addDish("Lamb Biriyani", "food", "Gently cooking rice with lamb, fresh herbs and spices.",
    12.95, 7, response._id, "Entrees");
}

function addOrientExpress(response) {

  addDish("Three Color Sashimi Domburi", "food", 
    "3 pcs salmon, 3 pcs tuna & 2 pcs yellowtail.",
    13.95, 10, response._id, "Entrees");

  addDish("Sushi Sampler", "food", 
    "2 pcs tuna 2 pcs salmon, 1 pcs yellowtail, 2 pcs red snapper, 1 pcs shrimp, 1 pcs squid & 1 pc octopus", 
    18.95, 14, response._id, "Entrees");

  addDish("Sushi & Two Rolls", "food", "Salmon, tuna, yellowtail, mackerd surf calms, california roll & roll & tuna roll)", 
    15.00, 8, response._id, "Entrees");

  addDish("Shrimp & Vegetable Tempura Dinner", "food", "Deep fried jumbo srhimp & vegetables in a light batter served with rice and dipping sauce", 
    13.00, 9, response._id, "Entrees");

  addDish("Sushi & One Roll", "food", "Tuna, salmon, red snapper squid shrimp & one yellowtail & scallion maki",
    12.00, 5, response._id, "Entrees");
}

function addTheBagelFactory(response) {

  addDish("Salt Beef Melt", "food", 
    "Salt beef with melted swiss cheese, gherkins & mustard",
    3.80, 10, response._id, "Sandwiches");

  addDish("Roosevelt Melt", "food", 
    "Portabella mushroom, spinach, tomatoes & mozzarella", 
    3.80, 14, response._id, "Sandwiches");

  addDish("Santa Fe Melt", "food", "tuna, chilli dressing, red onions, peppers & mozzarella.", 
    3.50, 8, response._id, "Sandwiches");

  addDish("Soho Club", "food", "turkey, bacon, spinach, tomato, mayonnaise and cheddar cheese.", 
    3.50, 9, response._id, "Sandwiches");

  addDish("Manhattan Club", "food", "Chicken, bacon, sweetcorn, mayonnaise and cos lettuce.",
    3.00, 5, response._id, "Sandwiches");
}
// seed();
