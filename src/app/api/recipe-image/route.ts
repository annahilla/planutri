import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  const apiKey = process.env.PEXELS_API_KEY;

  console.log("API Key:", process.env.PEXELS_API_KEY);


  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query.toLowerCase()}&orientation=landscape&per_page=1`, {
      headers: {
        Authorization: `${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();
    const image = data.photos[0]?.src?.original;

    if (image) {
      return NextResponse.json({ imageUrl: image }, { status: 200 });
    } else {
      return NextResponse.json({ error: "No image found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching image from Pexels" }, { status: 500 });
  }
}
