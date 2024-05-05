import mongoose from "mongoose";

// const configOptions = {
//   useNewUrlParser: true,
// };
const connectToDb = async () => {
  const connectionUrl = process.env.MONGO_URL;
  mongoose
    .connect(connectionUrl)
    .then(() => console.log("your are connected man"))
    .catch((error) => console.log(error));
};

export default connectToDb;
