import express from 'express'
import path from 'path'

const app = express()
const PORT = 5000
const __dirname = path.resolve()

let globalSavedShift = null

app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.get('/api/load', (req, res) => {
//
})

app.post('/api/save', (req, res) => {
//
})

// All routes should redirect to the index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
