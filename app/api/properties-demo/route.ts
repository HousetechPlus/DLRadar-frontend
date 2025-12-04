import { NextResponse } from "next/server";
import properties from "@/data/properties_demo.json";

export async function GET() {
  return NextResponse.json(properties);
}
