import { Configuration, OpenAIApi } from "openai";
export const davinci_pure = async (userMessage) => {
  console.log("backend", userMessage);
  const configuration = new Configuration({
    apiKey: "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" //,malika key
  });

  const openai = new OpenAIApi(configuration);
  const prompt_gpt = userMessage;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 400,
    temperature: 0
  });
  console.log("response", response.data.choices[0].text);
  return response.data.choices[0].text;
};
