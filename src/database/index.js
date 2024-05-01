import mongoose from "mongoose";

// const configOptions = {
//   useNewUrlParser: true,
// };
const connectToDb = async () => {
  const connectionUrl =
    "mongodb+srv://nextjsecom:password1984@cluster0.0xfexvu.mongodb.net/ecommerce";
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("your are connected man"))
    .catch((error) => console.log(error));
};

export default connectToDb;
