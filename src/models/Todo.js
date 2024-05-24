import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide the todo text."],
      minlength: [3, "Todo text must be at least 3 characters long."],
      maxlength: [100, "Todo text must be less than 100 characters long."],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
