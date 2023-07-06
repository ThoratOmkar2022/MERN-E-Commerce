const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://othorat2023:ZTxQVvrYWzWF8CfQ@cluster0.j4a8jfs.mongodb.net/Cluster0?retryWrites=true&w=majority";

const mongoDB = async function () {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      // mongoDbClient.connect(mongoURI, { useNewUrlParser: true }, async(err, result) => {
      if (err) {
        console.log("---" + err);
      } else {
        // var database =
        console.log("connected to mongo");
        const fetch_data = await mongoose.connection.db.collection("fooddata");
        console.log(fetch_data);

        fetch_data.find({}).toArray(async function (err, data) {
          const foodCategory = await mongoose.connection.db.collection(
            "foodCategory"
          );
          foodCategory.find({}).toArray(function (err, catData) {
            if (err) console.log(err);
            else {
              global.fooddata = data;
              global.foodCategory = catData;
            }
          });
          // if (err) console.log(err);
          // else {
          //   global.fooddata = data;
          //   console.log(global.fooddata);
          // }
        });
      }
    }
  );
};

module.exports = mongoDB;
