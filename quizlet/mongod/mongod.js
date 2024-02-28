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
    Title: String,
    NoOfTakers: Number,
    TimeLimit: Number,
    Creator: String,
    Questions: {
      type: Array,
      default: [],
    },
  });
