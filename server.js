const express = require("express");

const Container = require("./utils/container");
const dbName = "db.json";
const container = new Container(dbName);
//const { auth } = require("./middlewares/auth");
const routerProductos = require("./routes/productos");
//const upload = require("./storage");


const app = express();  
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use((req, res, next)=>{
    const date = new Date(Date.now());
    console.log(date.toLocaleString());
    next();
});

app.get("/api/productos", async (req,res)=>{
    const listadoUsuarios = await container.getAll();
    res.json(listadoUsuarios);
});

app.get("/api/productos/:id", async (req, res)=>{
    const id = parseInt(req.params.id);
    const productos = await container.getById(id);
    res.json(productos);
});

app.post("/api/productos", async (req, res)=>{
    const data = req.body;
    const producto = await container.save(data);
    res.json(producto);
});

app.delete("/api/productos/:id", async (req, res)=>{
    const id = parseInt(req.params.id);
    const productoBorrado = await container.deleteById(id);
    res.json(productoBorrado);
});

app.put("/api/productos/:id", async (req, res)=>{
    const id = parseInt(req.params.id);
    const product = req.body;

    const productoEditado = await container.updateById(id, product);
    res.json(productoEditado);
});

const server = app.listen(PORT, (req, res)=> {
    console.log(`Server listening on port: ${PORT}`)
});