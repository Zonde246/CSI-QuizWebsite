import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Quizlet");

export const users =
  mongoose.models["users"] ||
  mongoose.model("users", {
    name: String,
    password: String,
    QuizIDs: Array,
    NoOfQuizes: Number,
  });

export const Quizes =
  mongoose.models["quizes"] ||
  mongoose.model("quizes", {
    QuizID: String,
    Questions: {
      type: Array,
      default: [],
    },
    Creator: String,
    TimeLimit: Number,
    NoOfTakers: Number,
  });
