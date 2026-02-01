
import { GoogleGenAI } from "@google/genai";
import { ENROLLMENT_ANNOUNCEMENT, AGE_GROUPS, ENROLLMENT_TIMELINE, SCHOOL_NAME, MANAGING_BODY } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function askEnrollmentAssistant(question: string) {
  const systemInstruction = `
    Bạn là trợ lý ảo hỗ trợ tuyển sinh của trường ${SCHOOL_NAME}, thuộc quản lý của ${MANAGING_BODY}.
    Dưới đây là thông tin chính thức:
    - Thông báo tuyển sinh: ${ENROLLMENT_ANNOUNCEMENT}
    - Chỉ tiêu: ${JSON.stringify(AGE_GROUPS)}
    - Lịch trình: ${JSON.stringify(ENROLLMENT_TIMELINE)}

    Hãy trả lời các câu hỏi của phụ huynh một cách thân thiện, ngắn gọn và chính xác dựa trên dữ liệu trên. 
    Nếu không có thông tin, hãy khuyên họ liên hệ văn phòng nhà trường.
    Ngôn ngữ: Tiếng Việt.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "Xin lỗi, tôi gặp trục trặc kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hotline trường.";
  }
}
