const express = require("express");

const app = express();

app.use(express.json());

// Application configuration from environment variables
const APP_ENV = process.env.APP_ENV || "development";
const DB_HOST = process.env.DB_HOST || "localhost";
const APP_PORT = process.env.APP_PORT || 8080;

// Temporary in-memory product data
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 75000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Mobile Phone",
        price: 30000,
        category: "Electronics"
    }
];

// Health endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "UP",
        environment: APP_ENV
    });
});

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get product by ID
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// Add product
app.post("/products", (req, res) => {
    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        return res.status(400).json({
            message: "name, price and category are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(p => p.id)) + 1
            : 1,
        name,
        price,
        category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// Update product
app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, category } = req.body;

    products[productIndex] = {
        id,
        name: name || products[productIndex].name,
        price: price !== undefined ? price : products[productIndex].price,
        category: category || products[productIndex].category
    };

    res.json(products[productIndex]);
});

// Delete product
app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

// Start application
app.listen(APP_PORT, () => {
    console.log(`Product API running on port ${APP_PORT}`);
    console.log(`Environment: ${APP_ENV}`);
    console.log(`Database Host: ${DB_HOST}`);
});