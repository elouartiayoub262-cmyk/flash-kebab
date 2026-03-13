import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    category TEXT NOT NULL,
    desc TEXT,
    img TEXT
  )
`);

// Seed initial data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (count.count === 0) {
  const initialProducts = [
    // Kebab & Durum
    { name: 'Kebab Pollo', price: '4,00€', category: 'Kebab & Durum', desc: 'Carne de pollo, ensalada fresca y nuestra salsa de yogur artesanal.', img: '/fotos/Kebab Pollo.jpg' },
    { name: 'Kebab Ternera', price: '4,00€', category: 'Kebab & Durum', desc: 'Carne de ternera seleccionada, ensalada y salsa de yogur.', img: '/fotos/Kebab Ternera.jpg' },
    { name: 'Kebab Mixto', price: '4,50€', category: 'Kebab & Durum', desc: 'Mezcla de pollo y ternera con ensalada y salsa.', img: '/fotos/Kebab Mixto.jpg' },
    { name: 'Durum Pollo', price: '4,50€', category: 'Kebab & Durum', desc: 'Rollo de pan de pita con pollo, ensalada y salsa.', img: '/fotos/Durum Pollo.jpg' },
    { name: 'Durum Ternera', price: '4,50€', category: 'Kebab & Durum', desc: 'Rollo de pan de pita con ternera, ensalada y salsa.', img: '/fotos/Durum Ternera.jpg' },
    { name: 'Durum Mixto', price: '5,00€', category: 'Kebab & Durum', desc: 'Rollo de pan de pita con carne mixta, ensalada y salsa.', img: '/fotos/Durum Mixto.jpg' },
    { name: 'Plato Kebab', price: '7,00€', category: 'Kebab & Durum', desc: 'Plato completo con carne, patatas, ensalada y salsas.', img: '/fotos/Plato Kebab.jpg' },
    { name: 'Pizza Turca (Lahmacun)', price: '5,50€', category: 'Kebab & Durum', desc: 'Masa fina con carne picada, verduras y especias.', img: '/fotos/Pizza Turca (Lahmacun).jpg' },
    
    // Hamburguesas
    { name: 'Smash Burguer', price: '8,50€', category: 'Hamburguesas', desc: 'Doble carne de ternera smash, cheddar, cebolla caramelizada y salsa secreta.', img: '/fotos/Smash Burguer.jpg' },
    { name: 'Long Chicken', price: '6,50€', category: 'Hamburguesas', desc: 'Pollo crujiente alargado con lechuga y mayonesa.', img: '/fotos/Long Chicken.jpg' },
    { name: 'Hamburguesa Clásica', price: '5,00€', category: 'Hamburguesas', desc: 'Ternera, lechuga, tomate, cebolla y queso.', img: '' },
    { name: 'Hamburguesa Doble Queso', price: '6,50€', category: 'Hamburguesas', desc: 'Doble carne y doble de queso cheddar.', img: '' },

    // Tacos
    { name: 'Taco Flash', price: '6,00€', category: 'Tacos', desc: 'Especialidad de la casa con carne mixta y salsa picante suave.', img: '/fotos/Taco Flash.jpg' },
    { name: 'Taco Pollo', price: '5,50€', category: 'Tacos', desc: 'Pollo marinado con especias, patatas y salsa quesera.', img: '/fotos/Taco Pollo.jpg' },
    { name: 'Taco Fish', price: '6,00€', category: 'Tacos', desc: 'Pescado crujiente con salsa tártara y ensalada.', img: '/fotos/Taco Fish.jpg' },
    { name: 'Taco Al Andalus', price: '6,50€', category: 'Tacos', desc: 'Sabor andaluz con carne picada y especias.', img: '/fotos/Taco Al Andalus.jpg' },
    { name: 'Taco Carne Picada', price: '6,00€', category: 'Tacos', desc: 'Carne picada de ternera con verduras.', img: '/fotos/Taco Carne Picada.jpg' },
    { name: 'Taco Especial', price: '7,00€', category: 'Tacos', desc: 'El más completo con extra de todo.', img: '/fotos/Taco Especial.jpg' },
    { name: 'Taco Nuggets', price: '5,50€', category: 'Tacos', desc: 'Relleno de nuggets de pollo crujientes.', img: '/fotos/Taco Nuggets.jpg' },

    // Pizzas
    { name: 'Pizza Jhony', price: '9,50€', category: 'Pizzas', desc: 'Carne, pollo, huevo y salsa especial.', img: '/fotos/Pizza Jhony.jpg' },
    { name: 'Pizza Barbacoa', price: '9,00€', category: 'Pizzas', desc: 'Salsa barbacoa, carne picada, bacon y cebolla.', img: '/fotos/Pizza Barbacoa.jpg' },
    { name: 'Pizza Carbonara', price: '9,00€', category: 'Pizzas', desc: 'Nata, bacon, champiñones y cebolla.', img: '/fotos/Pizza Carbonara.jpg' },
    { name: 'Pizza Cuatro Quesos', price: '9,00€', category: 'Pizzas', desc: 'Mezcla de cuatro quesos fundidos.', img: '/fotos/Pizza Cuatro Quesos.jpg' },
    { name: 'Pizza Flash', price: '10,00€', category: 'Pizzas', desc: 'La pizza estrella con todos los ingredientes.', img: '/fotos/Pizza Flash.jpg' },
    { name: 'Pizza México', price: '9,50€', category: 'Pizzas', desc: 'Picante con jalapeños, carne y maíz.', img: '/fotos/Pizza México.jpg' },
    { name: 'Pizza Tropical', price: '9,00€', category: 'Pizzas', desc: 'Jamón york y piña.', img: '/fotos/Pizza Tropical.jpg' },
    { name: 'Pizza Mediterránea', price: '9,00€', category: 'Pizzas', desc: 'Atún, aceitunas, cebolla y pimiento.', img: '/fotos/Pizza Mediterránea.jpg' },
    { name: 'Pizza Americana', price: '9,50€', category: 'Pizzas', desc: 'Bacon, huevo y patatas fritas.', img: '/fotos/Pizza Americana.jpg' },
    { name: 'Pizza Coreana', price: '10,00€', category: 'Pizzas', desc: 'Sabor exótico con ingredientes coreanos.', img: '/fotos/Pizza Coreana.jpg' },
    { name: 'Pizza Crema', price: '9,50€', category: 'Pizzas', desc: 'Base de crema con pollo y champiñones.', img: '/fotos/Pizza Crema.jpg' },
    { name: 'Pizza El Padrino', price: '10,50€', category: 'Pizzas', desc: 'Para los amantes de la carne.', img: '/fotos/Pizza El Padrino.jpg' },
    { name: 'Pizza Fresca', price: '9,00€', category: 'Pizzas', desc: 'Ingredientes frescos del día.', img: '/fotos/Pizza Fresca.jpg' },
    { name: 'Pizza Kentaki', price: '9,50€', category: 'Pizzas', desc: 'Pollo crujiente estilo Kentucky.', img: '/fotos/Pizza Kentaki.jpg' },
    { name: 'Pizza Los Soprano', price: '10,50€', category: 'Pizzas', desc: 'Una pizza que no podrás rechazar.', img: '/fotos/Pizza Los Soprano.jpg' },
    { name: 'Pizza Marinera', price: '9,50€', category: 'Pizzas', desc: 'Frutos del mar y atún.', img: '/fotos/Pizza Marinera.jpg' },
    { name: 'Pizza Paradiso', price: '9,50€', category: 'Pizzas', desc: 'Un paraíso de sabores vegetales.', img: '/fotos/Pizza Paradiso.jpg' },
    { name: 'Pizza Veggie', price: '8,50€', category: 'Pizzas', desc: 'Verduras variadas y queso.', img: '/fotos/Pizza Veggie.jpg' },
    { name: 'Pizza Griega', price: '9,50€', category: 'Pizzas', desc: 'Queso feta, aceitunas negras, tomate y orégano.', img: '/fotos/Griega.jpg' },
    { name: 'Pizza Gourmet', price: '11,00€', category: 'Pizzas', desc: 'Ingredientes premium seleccionados por el chef.', img: '/fotos/Gourmet.jpg' },
    { name: 'Calzone', price: '9,50€', category: 'Pizzas', desc: 'Pizza cerrada rellena de tus ingredientes favoritos.', img: '/fotos/Calzone.jpg' },

    // Camperos & Sandwich
    { name: 'Campero Pollo', price: '5,50€', category: 'Camperos & Sandwich', desc: 'Pollo, lechuga, tomate, mayonesa y queso.', img: '' },
    { name: 'Campero Ternera', price: '5,50€', category: 'Camperos & Sandwich', desc: 'Ternera, lechuga, tomate, mayonesa y queso.', img: '/fotos/Ternera.jpg' },
    { name: 'Campero Mixto', price: '6,00€', category: 'Camperos & Sandwich', desc: 'Pollo y ternera con todos los extras.', img: '/fotos/Flash.jpg' },
    { name: 'Sandwich Mixto', price: '3,50€', category: 'Camperos & Sandwich', desc: 'Jamón york y queso fundido.', img: '' },
    { name: 'Sandwich Club', price: '5,50€', category: 'Camperos & Sandwich', desc: 'Tres pisos con pollo, bacon, huevo y ensalada.', img: '' },

    // Ensaladas
    { name: 'Ensalada César', price: '7,50€', category: 'Ensaladas', desc: 'Lechuga, pollo crujiente, picatostes y salsa césar.', img: '' },
    { name: 'Ensalada Mixta', price: '6,00€', category: 'Ensaladas', desc: 'Lechuga, tomate, cebolla, atún y huevo.', img: '' },
    { name: 'Ensalada Flash', price: '8,00€', category: 'Ensaladas', desc: 'Nuestra ensalada especial con carne de kebab.', img: '' },

    // Entrantes & Croquetas
    { name: 'Patatas Fritas', price: '3,00€', category: 'Entrantes & Croquetas', desc: 'Ración de patatas crujientes.', img: '' },
    { name: 'Nuggets de Pollo (8 un)', price: '4,50€', category: 'Entrantes & Croquetas', desc: 'Deliciosos bocaditos de pollo.', img: '' },
    { name: 'Alitas de Pollo (6 un)', price: '5,50€', category: 'Entrantes & Croquetas', desc: 'Alitas marinadas y crujientes.', img: '' },
    { name: 'Aros de Cebolla (10 un)', price: '4,00€', category: 'Entrantes & Croquetas', desc: 'Aros de cebolla rebozados.', img: '' },
    { name: 'Palitos de Mozzarella (6 un)', price: '5,00€', category: 'Entrantes & Croquetas', desc: 'Queso mozzarella fundido rebozado.', img: '' },

    // Bebidas
    { name: 'Refresco 33cl', price: '1,50€', category: 'Bebidas', desc: 'Coca-Cola, Fanta, Sprite, etc.', img: '' },
    { name: 'Agua 50cl', price: '1,20€', category: 'Bebidas', desc: 'Agua mineral natural.', img: '' },
    { name: 'Cerveza 33cl', price: '2,00€', category: 'Bebidas', desc: 'Cerveza nacional.', img: '' },

    // Postres
    { name: 'Baklava (2 un)', price: '3,00€', category: 'Postres', desc: 'Dulce tradicional turco de hojaldre y frutos secos.', img: '' },
    { name: 'Tarta de Queso', price: '4,00€', category: 'Postres', desc: 'Casera y cremosa.', img: '' },
    { name: 'Flan Casero', price: '3,00€', category: 'Postres', desc: 'Con caramelo.', img: '' },
  ];

  const insert = db.prepare("INSERT INTO products (name, price, category, desc, img) VALUES (?, ?, ?, ?, ?)");
  for (const p of initialProducts) {
    insert.run(p.name, p.price, p.category, p.desc, p.img);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use("/fotos", express.static(path.join(__dirname, "fotos")));

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.post("/api/products", (req, res) => {
    const { name, price, category, desc, img } = req.body;
    const result = db.prepare("INSERT INTO products (name, price, category, desc, img) VALUES (?, ?, ?, ?, ?)").run(name, price, category, desc, img);
    res.json({ id: result.lastInsertRowid });
  });

  app.put("/api/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, price, category, desc, img } = req.body;
    db.prepare("UPDATE products SET name = ?, price = ?, category = ?, desc = ?, img = ? WHERE id = ?").run(name, price, category, desc, img, id);
    res.json({ success: true });
  });

  app.delete("/api/products/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    res.json({ success: true });
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "ayoub" && password === "ayoub123") {
      res.json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
