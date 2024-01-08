const { connectDB } = require("./src/db");
const myExpress = require("./src/module/myExpress");
const donnerRoute = require("./src/routes/donner");
const userRoute = require("./src/routes/users");
const app = myExpress();
const PORT = 2003;

userRoute(app);
donnerRoute(app);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
