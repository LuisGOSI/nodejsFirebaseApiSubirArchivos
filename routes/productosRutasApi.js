var rutapr = require("express").Router();
var {
  mostrarProductos,
  nuevoProducto,
  borrarProducto,
  modificarProducto,
  buscarPorIDPr,
} = require("../database/productosbd");
var subirArchivo = require("../middlewares/subirArchivos");
var fs = require("fs");

rutapr.get("/api/productos/mostrarproductos", async (req, res) => {
  var productos = await mostrarProductos();
  if (productos.length > 0) {
    res.status(200).json(productos);
  } else {
    res.status(400).json("No hay productos");
  }
});

rutapr.post(
  "/api/productos/nuevoproducto",
  subirArchivo(),
  async (req, res) => {
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    if (error == 0) {
      res.status(200).json("Producto agregado");
    } else {
      res.status(400).json("Error al agregar producto");
    }
  }
);

rutapr.get("/api/productos/buscarProductoPorId/:id", async (req, res) => {
  var product = await buscarPorIDPr(req.params.id);
  if (product == "") {
    res.status(400).json("No se encontro el producto");
  } else {
    res.status(200).json(product);
  }
});

rutapr.post("/api/productos/editarPr", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await modificarProducto(req.body);
  if (error == 0) {
    res.status(200).json("Producto modificado");
  } else {
    res.status(400).json("Error al modificar el producto");
  }
});

rutapr.get("/api/productos/borrarPr/:id", async (req, res) => {
  var error = await borrarProducto(req.params.id);
  if (error == 0) {
    res.status(200).json("Producto borrado");
  } else {
    res.status(400).json("Error al borrar el producto");
  }
});

module.exports = rutapr;
