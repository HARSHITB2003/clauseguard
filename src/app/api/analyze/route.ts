import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are ClauseGuard, an expert UK contract analyst. You read legal documents and identify clauses that disadvantage the person who would sign this document (the "user"). You focus on: unfair terms, hidden fees, auto-renewal traps, broad IP assignments, restrictive non-compete clauses, one-sided termination rights, liability exclusions, data usage permissions, and any clause that a reasonable person would want to negotiate before signing.

For each problematic clause you find, provide:
1. The exact text of the clause (quoted)
2. A risk level: "high", "medium", or "low"
3. A category from: "payment", "ip_ownership", "non_compete", "auto_renewal", "liability", "data_usage", "termination", "hidden_fees", "exclusivity", "indemnity", "governing_law", "other"
4. A plain English explanation of why this clause is problematic (2-3 sentences, no legal jargon)
5. A suggested counter-clause or negotiation point the user could propose

Also identify clauses that are FAIR and reasonable (mark as "safe").

Return your analysis as JSON only, no markdown, no backticks, in this exact format:
{
  "documentType": "rental_agreement|employment_contract|freelancer_contract|terms_of_service|privacy_policy|gym_membership|other",
  "overallRiskScore": 0-100,
  "summary": "2-3 sentence overall assessment",
  "totalClauses": number,
  "redFlags": number,
  "cautionFlags": number,
  "safeClauses": number,
  "clauses": [
    {
      "id": 1,
      "text": "exact quoted clause text",
      "risk": "high|medium|low|safe",
      "category": "category_string",
      "explanation": "plain English explanation",
      "counter": "suggested counter-clause or negotiation point",
      "sectionName": "which section of the document this is from"
    }
  ]
}`;

export async function POST(request: NextRequest) {
  try {
    const { text, apiKey } = await request.json();

    if (!text || text.trim().length < 100) {
      return Response.json(
        { error: "Document must be at least 100 characters." },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return Response.json(
        { error: "API key is required." },
        { status: 400 }
      );
    }

    const documentText = text.substring(0, 12000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: `Analyze this document and return JSON only:\n\n${documentText}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return Response.json(
        { error: `Claude API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const resultText = data.content
      .filter((item: { type: string }) => item.type === "text")
      .map((item: { text: string }) => item.text)
      .join("");

    const clean = resultText.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(clean);

    return Response.json(analysis);
  } catch (error) {
    console.error("Analysis failed:", error);
    return Response.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
