import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Importing flower data
import flowersData from './data/data.json' assert { type: 'json' };
let flowers = flowersData;

// CREATE: Add a new flower
app.post('/flowers', (req, res) => {
   const newFlower = req.body;
   newFlower.id = flowers.length + 1;
   flowers.push(newFlower);
   res.status(201).json(newFlower);
});

// READ: Get all flowers
app.get('/flowers', (req, res) => {
   res.json(flowers);
});

// UPDATE: Update a flower's information
app.put('/flowers/:id', (req, res) => {
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
app.delete('/flowers/:id', (req, res) => {
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
