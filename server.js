import express from 'express';
import cors from 'cors';
import twilio from 'twilio';
import 'dotenv/config'; // .env dosyasındaki değişkenleri yüklemek için

const app = express();
app.use(cors());
app.use(express.json());

// Bu bilgileri .env dosyasında saklamalısınız
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'TWILIO_ACCOUNT_SID_BURAYA';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'TWILIO_AUTH_TOKEN_BURAYA';
const client = twilio(accountSid, authToken);

app.post('/api/send-whatsapp', (req, res) => {
    console.log("yess");
    client.messages.create({
        from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: JSON.stringify({ "1": "12/1", "2": "3pm" }),
        to: 'whatsapp:+905050349348'
    })
        .then(message => res.status(200).json({ success: true, sid: message.sid }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Gemini AI Document Examination Endpoint
app.post('/api/examine-document', async (req, res) => {
    const { documentName, prompt, customApiKey } = req.body;
    const apiKey = customApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '') {
        return res.status(200).json({
            success: false,
            error: 'GEMINI_API_KEY_MISSING',
            message: 'Gemini API anahtarı bulunamadı. Lütfen projenin kök dizinindeki .env dosyasına GEMINI_API_KEY="ANAHTARINIZ" satırını ekleyin veya aşağıdaki alandan geçici bir anahtar girerek hemen test edin.'
        });
    }

    try {
        // Use gemini-2.5-flash as it is the most stable and modern flash model
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: prompt || `Belge Adı: ${documentName}. Soru: Nasılsın`
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(200).json({ success: false, error: 'GEMINI_API_ERROR', message: data.error.message });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt üretilemedi.';
        res.status(200).json({ success: true, text });
    } catch (err) {
        res.status(500).json({ success: false, error: 'SERVER_ERROR', message: err.message });
    }
});

app.listen(5000, () => console.log('Sunucu 5000 portunda çalışıyor'));
