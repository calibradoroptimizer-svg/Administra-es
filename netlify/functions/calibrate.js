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
        const { type, config } = JSON.parse(event.body || '{}');
        let result = { success: true, type, timestamp: new Date().toISOString() };

        if (type === 'mira') {
            const h = parseFloat(config.horizontal) || 0;
            const v = parseFloat(config.vertical) || 0;
            const s = parseFloat(config.stability) || 5;
            result.adjustments = { horizontal: h, vertical: v, stability: s, compensationX: h * 0.85, compensationY: v * 0.90 };
            result.message = 'Mira calibrada';
        } else if (type === 'screen') {
            const resolutions = {
                'auto': { width: 1920, height: 1080, scale: 1.0 },
                '720p': { width: 1280, height: 720, scale: 0.75 },
                '1080p': { width: 1920, height: 1080, scale: 1.0 },
                '2k': { width: 2560, height: 1440, scale: 1.33 },
                '4k': { width: 3840, height: 2160, scale: 2.0 }
            };
            result.resolution = resolutions[config.screenType] || resolutions['auto'];
            result.message = `Tela calibrada para ${config.screenType}`;
        } else if (type === 'pull') {
            result.settings = {
                intensity: parseFloat(config.intensity) || 5,
                speed: parseFloat(config.speed) || 5
            };
            result.message = 'Puxada calibrada';
        } else {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid type' }) };
        }

        return { statusCode: 200, headers, body: JSON.stringify(result) };
    } catch (error) {
        return { statusCode: 500, headers, body: JSON.stringify({ success: false, error: error.message }) };
    }
};
