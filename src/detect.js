import { Configuration, OpenAIApi } from "openai";
export const davinciDetect = async (userMessage) => {
  console.log("backend", userMessage);
  const configuration = new Configuration({
    apiKey: "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" //,malika key
  });
  const openai = new OpenAIApi(configuration);
  //   const prompt_gpt = `
  //   To detect user intent, you need to identify the following categories:

  //   1. Fertility
  //   2. Book Appointment
  //   3. Symptom Checker
  //   4. Health Tip

  //   To assist you in detecting these intents, provide appropriate responses:

  // Here are examples for each of above:

  //   - Any thing else: If the user ask anything "any details about dr, healthcare, and fertility or anything else":Respond with "Fertility"

  //   - If the user says exactly same "I want to book an appointment", "Can you schedule a meeting?" then : Respond with "Book Appointment"'
  //   - If the user asks about to check symptoms: Respond with "Symptom Checker"
  //   - If the user asks for a health tip: Respond with "Health Tip"

  //   ".

  //   userInput:${userMessage}
  //   Only return the name of category in this json format and answer must be from any of above category:{"value":answer}
  //   `;

  // 7. General Health Question
  // - If the user asks a general health-related question: Respond with "Ask a question

  const prompt_gpt = `To effectively categorize user intent, you should recognize the following intent types:

1. Fertility
2. Appointment Scheduling
3. Symptom Checking
4. Health Tips

In order to assist you in accurately identifying these intents, please provide the appropriate responses for each category:

Here are examples for each of the above categories:

- For general inquiries or anything related to "doctor, healthcare, fertility, or anything else," respond with "Fertility."

- If the user explicitly states, "I want to book an appointment" or "Can you schedule a meeting?", respond with "Appointment Scheduling."

- When the user inquires about checking symptoms, respond with "Symptom Checking."

- If the user requests a health tip, respond with "Health Tips."

Please structure your response in json as follows:

{
  "value": "Answer"
}

userInput :${userMessage}

Replace "Answer" with the appropriate category name based on the user's input.`;

  console.log("prompt_gpt", prompt_gpt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 300,
    temperature: 0
  });
  console.log("response", response.data.choices[0].text);
  console.log(response);
  return response.data.choices[0].text;
};
