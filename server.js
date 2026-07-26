const express = require('express');
const path = require('path');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

// تهيئة Gemini باستخدام متغير البيئة السري
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIza_dummy_key_for_testing");

// تهيئة ChatGPT (OpenAI) باستخدام متغير البيئة السري
const openai = new OpenAI({
  apiKey: process.env.CHATGPT_API_KEY || "dummy_openai_key"
});

app.use('/phet', express.static(path.join(__dirname, 'phet')));

app.get('/', (req, res) => {
  res.send('Maestro Pédagogique Server is Active & Connected with Gemini & ChatGPT!');
});

// مسار خاص بـ Gemini (لتوليد الدروس والأنشطة البيداغوجية)
app.post('/api/lessons', async (req, res) => {
  try {
    const { subjectName, lessonName, educationLevel } = req.body;
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `أنت خبير بيداغوجيا التدريس. أنشئ لي محتوى درس تفاعلي منظم ومفصل بناءً على المعطيات التالية:
    - المادة: ${subjectName}
    - عنوان الدرس: ${lessonName}
    - المستوى التعليمي: ${educationLevel}
    أعطني فقرات تعليمية وأنشطة مقترحة للأستاذ باللغة العربية.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({
      success: true,
      lessonContent: response.text()
    });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ success: false, error: "تعذر توليد الدرس عبر الذكاء الاصطناعي" });
  }
});

// مسار خاص بـ ChatGPT (OpenAI)
app.post('/api/chatgpt', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      success: true,
      result: completion.choices[0].message.content
    });
  } catch (error) {
    console.error("ChatGPT Error:", error);
    res.status(500).json({ success: false, error: "تعذر الاتصال بـ ChatGPT" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});