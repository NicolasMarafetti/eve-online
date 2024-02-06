// pages/api/proxy.js
export default async function handler(req, res) {
    // Forward the request to the external API
    const response = await fetch('https://evetycoon.com/api/v1/market/orders/16638?locationId=60008494');
    const data = await response.json();

    // Send back the response to the client
    res.status(200).json(data);
}