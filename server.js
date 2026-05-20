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

app.listen(5000, () => console.log('Sunucu 5000 portunda çalışıyor'));
