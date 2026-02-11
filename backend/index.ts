import app from "./src/app";
import connectToDatabase from "./src/config/database";

const PORT = process.env.PORT || 5001;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Is Running http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
