const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Earbuds",
    description: "Bluetooth wireless earbuds with charging case.",
    price: 1999,
    category: "Electronics",
    image: "/img/img2",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description: "Stylish smart watch with fitness and health tracking.",
    price: 2499,
    category: "Electronics",
    image: "/img/img1.jpg",
    stock: 15,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with powerful sound.",
    price: 1499,
    category: "Electronics",
    image: "/img/elec3.jpg",
    stock: 20,
  },
  {
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with deep bass.",
    price: 2999,
    category: "Electronics",
    image: "/img/elec4.jpg",
    stock: 12,
  },

  {
    name: "Women's Kurti",
    description: "Beautiful cotton kurti suitable for casual wear.",
    price: 799,
    category: "Fashion",
    image: "/img/fashion1.jpg",
    stock: 30,
  },
  {
    name: "Men's Casual Shirt",
    description: "Comfortable cotton casual shirt for everyday wear.",
    price: 999,
    category: "Fashion",
    image: "/img/fashion2.jpg",
    stock: 20,
  },
  {
    name: "Women's Handbag",
    description: "Elegant handbag with spacious compartments.",
    price: 1299,
    category: "Fashion",
    image: "/img/fashion3.jpg",
    stock: 18,
  },
  {
    name: "Denim Jeans",
    description: "Classic comfortable denim jeans for everyday styling.",
    price: 1499,
    category: "Fashion",
    image: "/img/fashion4.jpg",
    stock: 22,
  },

  {
    name: "Face Serum",
    description: "Lightweight face serum for glowing and healthy skin.",
    price: 599,
    category: "Beauty",
    image: "/img/beauty1.jpg",
    stock: 35,
  },
  {
    name: "Moisturizer",
    description: "Hydrating moisturizer suitable for daily skincare.",
    price: 449,
    category: "Beauty",
    image: "/img/beauty2.jpg",
    stock: 40,
  },
  {
    name: "Lipstick",
    description: "Long-lasting lipstick with a smooth finish.",
    price: 399,
    category: "Beauty",
    image: "/img/beauty3.jpg",
    stock: 28,
  },
  {
    name: "Perfume",
    description: "Refreshing fragrance suitable for everyday use.",
    price: 899,
    category: "Beauty",
    image: "/img/beauty4.jpg",
    stock: 16,
  },

  {
    name: "Non-Stick Frying Pan",
    description: "Durable non-stick frying pan for everyday cooking.",
    price: 699,
    category: "Home & Kitchen",
    image: "/img/kitchen1.jpg",
    stock: 18,
  },
  {
    name: "Electric Kettle",
    description: "Fast boiling electric kettle with automatic shut-off.",
    price: 999,
    category: "Home & Kitchen",
    image: "/img/kitchen2.jpg",
    stock: 14,
  },
  {
    name: "Dinner Set",
    description: "Elegant dinner set for family dining.",
    price: 1599,
    category: "Home & Kitchen",
    image: "/img/kitchen3.jpg",
    stock: 10,
  },
  {
    name: "Table Lamp",
    description: "Modern decorative table lamp for home and office.",
    price: 799,
    category: "Home & Kitchen",
    image: "/img/home1.jpg",
    stock: 20,
  },

  {
    name: "Basmati Rice 5kg",
    description: "Premium quality long grain basmati rice.",
    price: 699,
    category: "Grocery",
    image: "/img/grocery1.jpg",
    stock: 50,
  },
  {
    name: "Organic Wheat Flour",
    description: "Fresh and nutritious whole wheat flour.",
    price: 299,
    category: "Grocery",
    image: "/img/grocery2.jpg",
    stock: 45,
  },
  {
    name: "Green Tea",
    description: "Refreshing green tea made from premium tea leaves.",
    price: 249,
    category: "Grocery",
    image: "/img/grocery3.jpg",
    stock: 35,
  },
  {
    name: "Mixed Dry Fruits",
    description: "Healthy mix of almonds, cashews and raisins.",
    price: 599,
    category: "Grocery",
    image: "/img/grocery4.jpg",
    stock: 25,
  },

  {
    name: "The Power of Habits",
    description: "A motivational book about building better habits.",
    price: 399,
    category: "Books",
    image: "/img/book1.jpg",
    stock: 20,
  },
  {
    name: "Learn JavaScript",
    description: "Beginner friendly JavaScript programming book.",
    price: 599,
    category: "Books",
    image: "/img/book2.jpg",
    stock: 15,
  },
  {
    name: "Web Development Guide",
    description: "Complete beginner guide to modern web development.",
    price: 699,
    category: "Books",
    image: "/img/book3.jpg",
    stock: 12,
  },
  {
    name: "The Alchemist",
    description: "Popular inspirational fiction novel.",
    price: 299,
    category: "Books",
    image: "/img/book4.jpg",
    stock: 25,
  },

  {
    name: "Remote Control Car",
    description: "Fun remote control racing car for kids.",
    price: 899,
    category: "Toys & Gaming",
    image: "/img/toy1.jpg",
    stock: 18,
  },
  {
    name: "Gaming Mouse",
    description: "High precision gaming mouse with RGB lighting.",
    price: 799,
    category: "Toys & Gaming",
    image: "/img/toy2.jpg",
    stock: 20,
  },
  {
    name: "Wireless Game Controller",
    description: "Comfortable wireless controller for gaming.",
    price: 1499,
    category: "Toys & Gaming",
    image: "/img/toy3.jpg",
    stock: 14,
  },
  {
    name: "Building Blocks",
    description: "Creative building blocks set for children.",
    price: 499,
    category: "Toys & Gaming",
    image: "/img/toy4.jpg",
    stock: 30,
  },

  {
    name: "Yoga Mat",
    description: "Soft and comfortable non-slip yoga mat.",
    price: 599,
    category: "Sports",
    image: "/img/sport1.jpg",
    stock: 25,
  },
  { 
    name: "Cricket Bat",
    description: "Lightweight cricket bat suitable for practice.",
    price: 1299,
    category: "Sports",
    image: "/img/sport2.jpg",
    stock: 12,
  },
  {
    name: "Football",
    description: "Durable football suitable for outdoor games.",
    price: 699,
    category: "Sports",
    image: "https://placehold.co/600x500?text=Football",
    stock: 20,
  },
  {
    name: "Skipping Rope",
    description: "Adjustable skipping rope for fitness workouts.",
    price: 249,
    category: "Sports",
    image: "https://placehold.co/600x500?text=Skipping+Rope",
    stock: 35,
  },

  {
    name: "Gold Plated Necklace",
    description: "Elegant gold plated necklace for special occasions.",
    price: 999,
    category: "Jewellery",
    image: "https://placehold.co/600x500?text=Necklace",
    stock: 10,
  },
  {
    name: "Fashion Earrings",
    description: "Stylish earrings suitable for parties and casual wear.",
    price: 399,
    category: "Jewellery",
    image: "https://placehold.co/600x500?text=Earrings",
    stock: 25,
  },
  {
    name: "Bracelet",
    description: "Minimal stylish bracelet for everyday fashion.",
    price: 499,
    category: "Jewellery",
    image: "https://placehold.co/600x500?text=Bracelet",
    stock: 18,
  },
  {
    name: "Jewellery Gift Set",
    description: "Beautiful jewellery set packed as a perfect gift.",
    price: 1299,
    category: "Jewellery",
    image: "https://placehold.co/600x500?text=Jewellery+Set",
    stock: 8,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    console.log("Old products deleted");

    await Product.insertMany(products);

    console.log(`${products.length} demo products added successfully!`);

    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error);
    process.exit(1);
  }
};

seedProducts();
