import mongoose from "mongoose";
export function connect() {
const URI = process.env.Mongo_URI as string;
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected Mongo DB");
    })
    .catch((e) => {
      console.error(e);
    });
}
