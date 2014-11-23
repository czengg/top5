
function addRestaurant(name, lat, lon) {
  $.ajax({
    url: "/addrestaurant",
    method: "POST",
    data: {
      name: name,
      lat: lat,
      lon: lon
    },
    success: function(response) {
      console.log(response);    
    }
  });
}

function addDish(name, type, description, price, likes, restaurant) {
  $.ajax({
    url: "/adddish",
    method: "POST",
    data: {
      name: name,
      type: type,
      description: description,
      likes: likes,
      restaurant: restaurant
    },
    success: function(response) {
      console.log(response);    
    }
  });
}

function seed() {
  addRestaurant("Lulu's Noodles", 40.4451450, -79.9490840);
  addRestaurant("Ali Baba", 40.4450560, -79.9490590);

  addDish("Pad Thai", "food", 
    "Thai rice noodles stir fried in a special thai sauce with egg, tofu, bean sprouts, 
    green onions, and chopped peanuts, then garnished with bean sprouts and red cabbage.",
    7.25, 2, "Lulu's Noodles");

  addDish("Singapore Rice Noodle", "food",
    "Vermicelli rice noodles stir fried in light curry with shrimp, chicken, bean sprouts, 
    onion and eggs.", 7.25, 4, "Lulu's Noodles");

  addDish("Beef Chow Fun", "food", "Fried wide rice noodles, beansprouts, greenonions, stir 
    fried in special sauce handed down from mama's recipes.", 7.25, 10, "Lulu's Noodles");

  addDish("Traditional Fried Rice", "food", "Seasoned rice, greenpeas, carrot, onion, egg, 
    your choice of meats.", 7.25, 1);

  addDish("Fresh Mango Bubble Tea", "drink", "Milk Tea with Bubbles made with Fresh Mango",
    3.95, 0);

  addDish("Hummus", "food", "A famous vegetable dip made from mashed chick pea, mixed with 
    crushed sesame syrup, lemon juice, topped with garlic, oregano, paprika, and oil.",
    3.95, 2, "Ali Baba");

  addDish("Vegetarian Grape Leaves", "food", "Cooked grape leaves stuffed with rice and ground 
    lamb meat, served warm, or strictly vegetarian served cold", 4.95, 4);

  addDish("Spinach & Lentil Soup", "food", "A delicious mixture of lentils, spinach, potatoes, 
    lemon juice, & spices", 4.95, 10);

  addDish("Kebab Platter with Chicken", "food", "A compartment dish consisting of hummus, tossed 
    salad, rice with pignour nuts, and topped with a skewer of tender", 13.45, 1);

  addDish("Moussaka", "drink", "Layers of eggplant, tomatoes, potatoes, and spiced ground lamb 
    in a light sauce. smothered with melted cheese, and served with a salad.", 12.95, 0);

  addDish("Shish Kebab Dinner", "food", "Tender pieces of the finest meat, made to your taste 
    served with a toassed salad, and rice. includes a beverage and dessert.", 14.95, 0);

  addDish("Baklawa", "food", "Phyllo dough filled with ground walnuts, soaked with honey",
    2.45, 0);
}

seed();