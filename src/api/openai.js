
export async function getAICode(prompt) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  try {
    // Using fetch directly to have full control over the request path and debugging
    const response = await fetch('/api/deepseek/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt + "，请用代码块返回结果" }],
        stream: false
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
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("DeepSeek API Call Failed:", error);
    throw error;
  }
}
