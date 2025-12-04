import { NextResponse } from "next/server";
import exampleProperty from "@/data/property_example_us_fl_orange.json";

export async function GET() {
  return NextResponse.json(exampleProperty);
}
