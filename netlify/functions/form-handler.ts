import type { Handler } from "@netlify/functions";
import fetch from "node-fetch";

type BrevoErrorResponse = {
  message?: string;
};

export const handler: Handler = async (event) => {
  // Vérifier que c'est bien une requête POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    // Récupérer les données du formulaire
    const payload = JSON.parse(event.body || "{}");

    // Vérifier que c'est bien une soumission de formulaire Netlify
    if (!payload.form_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Not a Netlify form submission" }),
      };
    }

    // Si c'est un formulaire newsletter, traiter avec Brevo
    if (
      payload.form_name === "newsletter" ||
      payload.data?.["form-type"] === "newsletter"
    ) {
      const email = payload.data?.email;

      if (!email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Email is required" }),
        };
      }

      // Appeler l'API Brevo
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
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Subscribed successfully" }),
      };
    }

    // Pour les autres types de formulaires, retourner simplement un succès
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submission processed" }),
    };
  } catch (error) {
    console.error("Form handling error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
