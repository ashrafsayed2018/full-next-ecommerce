import mongoose from "mongoose";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedToplogy: true,
};
const connectToDb = async () => {
  const connectionUrl =
    "mongodb+srv://nextjsecom:password1984@cluster0.0xfexvu.mongodb.net/";
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log("ecommerce database connection established"))
    .catch((error) => console.log(error));
};

export default connectToDb;
