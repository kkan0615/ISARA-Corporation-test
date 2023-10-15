import express from 'express'
import path from 'path'

const app = express()
const PORT = 5000
const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/** Global saved shifts */
let globalSavedShifts = []
// Allow dist as static
app.use(express.static(path.join(__dirname, 'client', 'dist')))

// Load data
app.get('/api/load', (req, res) => {
  return res.json({
    data: globalSavedShifts || [],
  })
})

// Save data
app.post('/api/save', (req, res) => {
  // Set to global variable
  globalSavedShifts = req.body.shifts

  // Return data with "201"
  return res.status(201).json({
    message: 'successfully saved'
  })
})

// All routes should redirect to the index.html
app.get('*', (req, res) => {
  return res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
