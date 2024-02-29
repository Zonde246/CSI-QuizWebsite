import mongoose from "mongoose";
// * Connect to the database, from the .env file
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb://localhost:27017/Quizlet");
// * User Schema. Return the scheme if it exists else create a new one
export const users =
  mongoose.models["users"] ||
  mongoose.model("users", {
    name: String,
    password: String,
    QuizIDs: Array,
    NoOfQuizes: Number,
  });

// * Quizes Schema. Return the scheme if it exists else create a new one
export const Quizes =
  mongoose.models["quizes"] ||
  mongoose.model("quizes", {
    QuizID: String,
    Title: String,
    NoOfTakers: Number,
    TimeLimit: Number,
    Creator: String,
    Questions: {
      type: Array,
      default: [],
    },
  });
