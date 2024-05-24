import connectToDatabase from "@/database/connectToDatabase";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();

  await connectToDatabase();
  try {
    const newTodo = await Todo.create({ text });

    return NextResponse.json(
      {
        success: true,
        message: "Todo created",
        todo: newTodo,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Bad Request",
      },
      { status: 400 }
    );
  }
}

export async function GET() {
  await connectToDatabase();

  try {
    const todos = await Todo.find({});

    return NextResponse.json(
      {
        success: true,
        message: "Todos fetched",
        todos,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Todos Not found",
      },
      { status: 404 }
    );
  }
}

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");

  await connectToDatabase();

  await Todo.findByIdAndDelete(id);

  return NextResponse.json(
    {
      success: true,
      message: "Todo deleted",
    },
    { status: 200 }
  );
}
