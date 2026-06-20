import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// 1. Read .env file manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '../.env');

if (!fs.existsSync(envPath)) {
    console.error("❌ Error: .env file not found at", envPath);
    process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const match = envContent.match(/VITE_GEMINI_API_KEY\s*=\s*(.*)/);

if (!match || !match[1]) {
    console.error("❌ Error: VITE_GEMINI_API_KEY not found in .env");
    process.exit(1);
}

const API_KEY = match[1].trim();
console.log(`✅ Found API Key: ${API_KEY.substring(0, 5)}...${API_KEY.substring(API_KEY.length - 4)}`);

// 2. Helper for HTTPS Request
const makeRequest = (path, method = 'GET', body = null) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'generativelanguage.googleapis.com',
            path: `${path}?key=${API_KEY}`,
            method: method,
            headers: { 'Content-Type': 'application/json' }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data));
                } else {
                    reject({ statusCode: res.statusCode, body: data });
                }
            });
        });

        req.on('error', (e) => reject(e));
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
};

// 3. Test: List Models
console.log("\n🔍 1. Listing Available Models...");
makeRequest('/v1beta/models')
    .then((data) => {
        const models = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
        console.log(`✅ Success! Found ${models.length} generative models.`);
        console.log("   Available:", models.map(m => m.name).join(", "));

        // 4. Test: Generate Content with first available model
        const validModel = models.find(m => m.name.includes('gemini-1.5-flash')) || models[0];
        const modelName = validModel.name.replace('models/', ''); // Remove prefix for endpoint

        console.log(`\n🔍 2. Testing Generation with model: ${modelName}...`);

        return makeRequest(`/v1beta/models/${modelName}:generateContent`, 'POST', {
            contents: [{ parts: [{ text: "Hello, confirm you are working." }] }]
        });
    })
    .then((data) => {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(`✅ Success! Gemini replied: "${text?.trim()}"`);
        console.log("\n🎉 The API Key is VALID and working correctly.");
    })
    .catch((err) => {
        console.error("\n❌ API Check Failed!");
        if (err.statusCode) {
            console.error(`Status: ${err.statusCode}`);
            console.error(`Response: ${err.body}`);
        } else {
            console.error(err);
        }
    });
