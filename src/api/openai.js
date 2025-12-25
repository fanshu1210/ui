
export async function getAICode(prompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  try {
    // Using Gemini API - Using v1beta version and gemini-pro model
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt + "?????????ú“????" }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    // Check if the response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      // If we get HTML, it usually means the proxy failed and we're getting the index.html
      if (text.includes("<!doctype html>") || text.includes("<!DOCTYPE html>")) {
        throw new Error("Proxy Error: Received HTML instead of JSON. The API path might be incorrect.");
      }
      throw new Error(`Received non-JSON response: ${text.substring(0, 100)}...`);
    }

    if (!response.ok) {
      const errorData = await response.json();
      // Detailed error message for debugging
      const errorMsg = errorData.error?.message || `API Error: ${response.status}`;
      const errorDetails = errorData.error?.details || [];
      const fullErrorMsg = `${errorMsg}. Details: ${JSON.stringify(errorDetails)}`;
      throw new Error(fullErrorMsg);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Call Failed:", error);
    throw error;
  }
}
