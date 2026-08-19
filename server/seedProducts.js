const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Earbuds",
    description: "High-quality wireless earbuds with clear sound and long battery life.",
    price: 1299,
    category: "Electronics",
    image: "/img/img2.jpg",
    stock: 20,
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
    description: "Portable Bluetooth speaker with powerful sound and deep bass.",
    price: 1799,
    category: "Electronics",
    image: "/img/elec3.jpg",
    stock: 12,
  },
  {
    name: "Wireless Headphones",
    description: "Comfortable wireless headphones with excellent sound quality.",
    price: 1999,
    category: "Electronics",
    image: "/img/elec4.jpg",
    stock: 10,
  },

  {
    name: "Women's Kurti",
    description: "Beautiful and comfortable kurti suitable for everyday wear.",
    price: 899,
    category: "Fashion",
    image: "/img/fashion1.jpg",
    stock: 25,
  },
  {
    name: "Men's Casual Shirt",
    description: "Stylish casual shirt made with comfortable fabric.",
    price: 799,
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
    stock: 15,
  },
  {
    name: "Denim Jeans",
    description: "Comfortable and stylish denim jeans for everyday use.",
    price: 1199,
    category: "Fashion",
    image: "/img/fashion4.jpg",
    stock: 18,
  },

  {
    name: "Face Serum",
    description: "Skin-brightening face serum for healthy-looking skin.",
    price: 599,
    category: "Beauty",
    image: "/img/beauty1.jpg",
    stock: 20,
  },
  {
    name: "Moisturizer",
    description: "Hydrating moisturizer suitable for daily skincare.",
    price: 449,
    category: "Beauty",
    image: "/img/beauty2.jpg",
    stock: 25,
  },
  {
    name: "Lipstick",
    description: "Long-lasting lipstick with a smooth and beautiful finish.",
    price: 399,
    category: "Beauty",
    image: "/img/beauty3.jpg",
    stock: 30,
  },
  {
    name: "Perfume",
    description: "Refreshing perfume with a long-lasting fragrance.",
    price: 999,
    category: "Beauty",
    image: "/img/beauty4.jpg",
    stock: 15,
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
    description: "Fast-boiling electric kettle for tea, coffee and hot water.",
    price: 999,
    category: "Home & Kitchen",
    image: "/img/kitchen2.jpg",
    stock: 15,
  },
  {
    name: "Dinner Set",
    description: "Beautiful dinner set for everyday meals and special occasions.",
    price: 1499,
    category: "Home & Kitchen",
    image: "/img/kitchen3.jpg",
    stock: 10,
  },
  {
    name: "Table Lamp",
    description: "Modern table lamp perfect for bedroom, office or study table.",
    price: 799,
    category: "Home & Kitchen",
    image: "/img/home1.jpg",
    stock: 20,
  },

  {
    name: "Basmati Rice 5kg",
    description: "Premium quality basmati rice with long and aromatic grains.",
    price: 699,
    category: "Grocery",
    image: "/img/grocery1.jpg",
    stock: 30,
  },
  {
    name: "Organic Wheat Flour",
    description: "Healthy and nutritious organic wheat flour.",
    price: 499,
    category: "Grocery",
    image: "/img/grocery2.jpg",
    stock: 25,
  },
  {
    name: "Green Tea",
    description: "Refreshing green tea made from quality tea leaves.",
    price: 299,
    category: "Grocery",
    image: "/img/grocery3.jpg",
    stock: 35,
  },
  {
    name: "Mixed Dry Fruits",
    description: "Premium mixture of healthy and delicious dry fruits.",
    price: 899,
    category: "Grocery",
    image: "/img/grocery4.jpg",
    stock: 20,
  },

  {
    name: "The Power of Habits",
    description: "A useful book about habits and personal development.",
    price: 399,
    category: "Books",
    image: "/img/book1.jpg",
    stock: 15,
  },
  {
    name: "Learn JavaScript",
    description: "Beginner-friendly guide to learning JavaScript programming.",
    price: 599,
    category: "Books",
    image: "/img/book2.jpg",
    stock: 20,
  },
  {
    name: "Web Development Guide",
    description: "Complete guide for learning modern web development.",
    price: 699,
    category: "Books",
    image: "/img/book3.jpg",
    stock: 12,
  },
  {
    name: "The Alchemist",
    description: "A popular inspirational novel about dreams and destiny.",
    price: 299,
    category: "Books",
    image: "/img/book4.jpg",
    stock: 25,
  },

  {
    name: "Remote Control Car",
    description: "Fun remote control car suitable for kids.",
    price: 899,
    category: "Toys",
    image: "/img/toy1.jpg",
    stock: 15,
  },
  {
    name: "Gaming Mouse",
    description: "Responsive gaming mouse with comfortable grip.",
    price: 699,
    category: "Toys",
    image: "/img/toy2.jpg",
    stock: 20,
  },
  {
    name: "Wireless Game Controller",
    description: "Comfortable wireless controller for gaming.",
    price: 1299,
    category: "Toys",
    image: "/img/toy3.jpg",
    stock: 12,
  },
  {
    name: "Building Blocks",
    description: "Creative building blocks for kids.",
    price: 499,
    category: "Toys",
    image: "/img/toy4.jpg",
    stock: 25,
  },


  {
    name: "Yoga Mat",
    description: "Comfortable non-slip yoga mat for workouts and exercise.",
    price: 599,
    category: "Sports",
    image: "/img/sport1.jpg",
    stock: 20,
  },
  {
    name: "Cricket Bat",
    description: "Strong and lightweight cricket bat for players.",
    price: 1299,
    category: "Sports",
    image: "/img/sport2.jpg",
    stock: 15,
  },
  {
    name: "Football",
    description: "Durable football suitable for practice and matches.",
    price: 699,
    category: "Sports",
    image: "/img/sport3.jpg",
    stock: 20,
  },
  {
    name: "Skipping Rope",
    description: "Lightweight skipping rope for fitness and cardio workouts.",
    price: 299,
    category: "Sports",
    image: "/img/sport4.jpg",
    stock: 30,
  },


  {
    name: "Gold Plated Necklace",
    description: "Elegant gold plated necklace for special occasions.",
    price: 999,
    category: "Jewellery",
    image: "/img/jewel1.jpg",
    stock: 10,
  },
  {
    name: "Fashion Earrings",
    description: "Stylish fashion earrings suitable for everyday wear.",
    price: 399,
    category: "Jewellery",
    image: "/img/jewel2.jpg",
    stock: 20,
  },
  {
    name: "Bracelet",
    description: "Beautiful bracelet with an elegant modern design.",
    price: 499,
    category: "Jewellery",
    image: "/img/jewel3.jpg",
    stock: 15,
  },
  {
    name: "Jewellery Gift Set",
    description: "Beautiful jewellery gift set for special occasions.",
    price: 1299,
    category: "Jewellery",
    image: "/img/jewel4.jpg",
    stock: 10,
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
  }
};
seedProducts();
