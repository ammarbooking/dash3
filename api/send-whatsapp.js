export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  try {
    const { number, message, instance_id, access_token } = req.body || {};

    if (!number || !message || !instance_id || !access_token) {
      return res.status(400).json({
        status: "error",
        message: "Missing required parameters"
      });
    }

    const response = await fetch("https://whatsbot.at/whatsapp_livechat/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        number,
        message,
        instance_id,
        access_token
      })
    });

    const text = await response.text();
    return res.status(response.status).send(text);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}
