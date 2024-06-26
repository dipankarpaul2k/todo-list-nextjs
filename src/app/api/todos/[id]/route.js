import { NextResponse } from "next/server";
import connectToDatabase from "@/database";
import Todo from "@/models/Todo";

export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  await connectToDatabase();

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Todo updated",
        updatedTodo,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Bad Request, Todo can't be updated.",
      },
      { status: 400 }
    );
  }
}
