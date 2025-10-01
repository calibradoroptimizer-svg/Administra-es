exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
    if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

    try {
        const { deviceType = 'none', playStyle = 'balanced' } = JSON.parse(event.body || '{}');
        const deviceMult = { 'none': 1.0, 'iphone16': 1.15, 'iphone14': 1.10, 'ipad': 0.95 }[deviceType] || 1.0;
        const styleMult = { 'aggressive': 1.08, 'balanced': 1.0, 'defensive': 0.92 }[playStyle] || 1.0;
        const mult = deviceMult * styleMult;
        
        const config = {};
        ['geral', 'redDot', 'x2', 'x4', 'awm'].forEach((key, i) => {
            config[key] = Math.max(1, Math.min(100, Math.round([55, 65, 50, 42, 38][i] * mult)));
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true, config, metadata: { deviceType, playStyle, multiplier: mult.toFixed(2) } })
        };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
