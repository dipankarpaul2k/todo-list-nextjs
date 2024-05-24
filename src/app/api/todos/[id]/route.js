import connectToDatabase from "@/database/connectToDatabase";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

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

export async function DELETE({ params }) {
  const { id } = params;

  await connectToDatabase();

  try {
    await Todo.findByIdAndDelete(id);
    return NextResponse.json(
      {
        success: true,
        message: "Todo deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Can't delete todo",
      },
      { status: 400 }
    );
  }
}
