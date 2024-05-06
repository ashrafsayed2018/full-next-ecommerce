import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    fullName: String,
    address: String,
    country: String,
    city: String,
    postalCode: String,
    userID: String,
  },
  { timestamps: true }
);

const Address =
  mongoose.models.Address || mongoose.models("Address", AddressSchema);
export default Address;
