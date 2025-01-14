const express = require("express"); // שרת וניהול נתיבים
const morgan = require("morgan"); // לוגים של בקשות HTTP
const cors = require("cors"); // הרשאות בין דומיינים
require("dotenv").config(); // טעינת משתנים מקובץ .env

const app = express(); // יצירת אפליקציית Express
app.use(express.json()); // תמיכה ב-JSON לבקשות
app.use(cors()); // הפעלת CORS להרשאות בין-דומיינים
app.use(morgan("dev")); // שימוש בלוגים באמצעות Morgan

const esp = require("./routes/esp");
app.use("/esp", esp);

const port = 6060;
app.use(express.json());
app.listen(port, () => {
  console.log(`Now listening on port http://localhost:${port}`);
});
