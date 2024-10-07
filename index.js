import express from "express";
import cors from "cors";
import healthController from "./controller/health.js";
import { dbInit } from "./database/connection.js";
import createUser from "./controller/user.controller/create.js";
import createToken from "./controller/auth.js";
import isAuth from "./middleware/isAuth.js";
import createProduct from "./controller/product.controller/create.js";
import listAllProducts from "./controller/product.controller/read.js";
import updateProductByProductId from "./controller/product.controller/update.js";
import deleteProductByProductId from "./controller/product.controller/delete.js";
import notFoundController from "./controller/not-found.js";
import { getAllUsers, getUserById } from "./controller/user.controller/read.js";
import updateUser from "./controller/user.controller/update.js";
import deleteUserById from "./controller/user.controller/delete.js";
const app = express();

const PORT = 4141;

app.use(cors({
    // origin: 'https://timekeeper.pages.dev'
    origin: 'https://seritracker.com'
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', healthController.get);
app.post('/', healthController.post);

app.post('/register', createUser);
app.post('/login', createToken);

// for connection
dbInit();

app.get('/users', getAllUsers)
app.get('/users/:id', getUserById)
app.put('/users/:id', updateUser)
app.delete('/users/:id',deleteUserById)

app.post('/products', isAuth, createProduct);
app.get('/products', isAuth, listAllProducts);
app.put('/products', isAuth, updateProductByProductId)
app.delete('/products/:id', isAuth, deleteProductByProductId)

app.use(notFoundController);

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
})