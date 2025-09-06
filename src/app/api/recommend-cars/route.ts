// import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

export async function POST(request: NextRequest) {
  try {
    const { answers: _ } = await request.json();

    //     const prompt = `Based on these user preferences and answers, recommend exactly 5 cars that would be best suited for them. Please provide a brief explanation for each recommendation.

    // User answers:
    // ${Object.entries(answers)
    //   .map(([question, answer]) => `${question}: ${answer}`)
    //   .join("\n")}

    // Please format your response as a JSON array with exactly 5 car recommendations, each containing:
    // - make: string
    // - model: string
    // - year: number
    // - reason: string (brief explanation)

    // Example format:
    // [
    //   {
    //     "make": "Toyota",
    //     "model": "Camry",
    //     "year": 2024,
    //     "reason": "Reliable, fuel-efficient, and perfect for daily commuting"
    //   }
    // ]`;

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: prompt }],
    //   model: "gpt-5",
    //   temperature: 0.7,
    // });

    // const content = completion.choices[0]?.message?.content;
    // if (!content) {
    //   throw new Error("No response from OpenAI");
    // }

    // const recommendations = JSON.parse(content);
    console.log(_);
    const recommendations = [
      {
        make: "Toyota",
        model: "Camry",
        year: 2024,
        reason: "Reliable, fuel-efficient, and perfect for daily commuting",
      },
      {
        make: "Honda",
        model: "CR-V",
        year: 2024,
        reason:
          "Spacious SUV with great safety features and comfort for families",
      },
    ];
    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Error getting car recommendations:", error);
    return NextResponse.json(
      { error: "Failed to get car recommendations" },
      { status: 500 },
    );
  }
}
