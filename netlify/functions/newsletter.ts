import type { Handler, HandlerEvent } from "@netlify/functions";
import fetch from "node-fetch";

type BrevoErrorResponse = {
  message?: string;
};

export const handler: Handler = async (event: HandlerEvent) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers,
    };
  }

  try {
    // Le token reCAPTCHA est automatiquement vérifié par Netlify
    // Si nous arrivons ici, c'est que la vérification a réussi
    const { email } = JSON.parse(event.body || "{}");

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email is required" }),
        headers,
      };
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify({
        email,
        listIds: [2], // À remplacer par votre ID de liste réel
        updateEnabled: true,
      }),
    });

    const data = (await response.json()) as BrevoErrorResponse;

    if (!response.ok) {
      console.error("Brevo API error:", data);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: "Failed to subscribe",
          details: data.message || "Unknown error",
        }),
        headers,
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Subscribed successfully" }),
      headers,
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
      headers,
    };
  }
};
