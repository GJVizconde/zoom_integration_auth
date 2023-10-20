import app from './src/app'
import { PORT } from './src/config/env.config'

const port = PORT || 4000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
