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
  mongoose.models["Quizes"] ||
  mongoose.model("Quizes", {
    QuizID: String,
    Questions: Array,
    Answers: Array,
    Creator: String,
    NoOfTakers: Number,
  });
