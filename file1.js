const express = require('express');
const app = express();
const port = 3000;

// Route to display flower names
app.get('/', (req, res) => {
   res.send('<h1>Flower List</h1><ul><li>Rose</li><li>Lily</li><li>Sunflower</li><li>Daisy</li><li>Tulip</li><li>Orchid</li></ul>');
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
