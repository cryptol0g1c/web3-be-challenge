import { connectDB } from "./config/database";
import { config } from './config/environment';
import app from './app'

app.listen(config.PORT, async() => {
  console.log(`Server running on port ${config.PORT}`)
  try {
    await connectDB();
  } catch (error) {
    console.log(error)
  }
})