exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };

    const defaultConfig = {
        aimbot: { enabled: true, fullHS: true, headshot: true, fov: 100, smoothness: 5, responseTime: 8 },
        advanced: { antiPull: true, noShake: true, noPull: true, headLimit: true },
        performance: { optimized: true, latency: 12, precision: 50 }
    };

    if (event.httpMethod === 'GET') {
        return { statusCode: 200, headers, body: JSON.stringify({ success: true, config: defaultConfig }) };
    }

    if (event.httpMethod === 'POST') {
        try {
            const body = JSON.parse(event.body || '{}');
            return { statusCode: 200, headers, body: JSON.stringify({ success: true, config: defaultConfig, received: body }) };
        } catch (error) {
            return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: error.message }) };
        }
    }

    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
};
