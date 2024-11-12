const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let flowers = [
   { id: 1, name: "Rose" },
   { id: 2, name: "Lily" },
   { id: 3, name: "Sunflower" },
   { id: 4, name: "Daisy" },
   { id: 5, name: "Tulip" },
   { id: 6, name: "Orchid" }
];

// CREATE: Add a new flower
app.post('/data', (req, res) => {
   const newFlower = req.body;
   newFlower.id = flowers.length + 1;
   flowers.push(newFlower);
   res.status(201).json(newFlower);
});

// READ: Get all flowers
app.get('/data', (req, res) => {
   res.json(flowers);
});

// UPDATE: Update a flower's information
app.put('/data/:id', (req, res) => {
   const flowerId = parseInt(req.params.id);
   const updatedFlower = req.body;
   let found = false;

   flowers = flowers.map(flower => {
      if (flower.id === flowerId) {
         found = true;
         return { ...flower, ...updatedFlower };
      }
      return flower;
   });

   if (found) {
      res.json({ message: "Flower updated", updatedFlower });
   } else {
      res.status(404).json({ message: "Flower not found" });
   }
});

// DELETE: Remove a flower by ID
app.delete('/data/:id', (req, res) => {
   const flowerId = parseInt(req.params.id);
   const initialLength = flowers.length;
   flowers = flowers.filter(flower => flower.id !== flowerId);

   if (flowers.length < initialLength) {
      res.status(204).send();
   } else {
      res.status(404).json({ message: "Flower not found" });
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
