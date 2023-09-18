// import { ChatOpenAI } from "langchain/chat_models/openai";
// import { BufferMemory } from "langchain/memory";
// import { ConversationalRetrievalQAChain } from "langchain";

// const llm = new ChatOpenAI({
//   openAIApiKey: "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",
//   temperature: 0,
//   modelName: "gpt-3.5-turbo"
// });

// const template = `You are the Appointment Bot. Your goal is to collect information for scheduling an appointment. You will ask the user for their name, username, email, phone number, address, preferred time, and date for the appointment. After collecting the information, you will read it back to the user for confirmation. You have to follow provided below format to collect information
// start asking question. Ask question one by one and use chathistory what data you get and ask accordingly.After getting all information mentioned and it's confirmation return a json of information with their values.
// User: {human_input}
// chathistory:{chat_history}

// `;

// const prompt = {
//   input_variables: ["human_input", "chat_history"],
//   template: template
// };

// const memory = new BufferMemory({
//   memoryKey: "chat_history"
// });

// const llmChain = new ConversationalRetrievalQAChain({
//   llm: llm,
//   prompt: prompt,
//   memory: memory
// });

// export const appointment = async (a) => {
//   const numResponses = 1;
//   const language = "en";
//   const aiAnswer = await llmChain.call({ human_input: a });
//   console.log(aiAnswer);
// };

import { Configuration, OpenAIApi } from "openai";
export const booking = async (i, j) => {
  const a = "and return a json of information you recieved with their values.";
  const template = `Check chat_history first as for your guidance then guide user accordingly.   

  You have to act as an AI New Life Fertility bot. Your goal is to collect information for scheduling an appointment. 

  Ask user that either  he is looking for general practitioner or a specialist? 
  
  After above ask the user for their email, phone number, address, preferred time, and date for the appointment one by one.
  
  After collecting the information, you will send information only back to the user for confirmation. 
  
  Once user confirm all information you have to  thanks  user for booking appointment say bye.

   Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.
  
  Here is a user message and chat_history, reply user accordingly :
  
User: ${i}
chat_history:${JSON.stringify(j)}
`;

  console.log("template ", template);

  const configuration = new Configuration({
    apiKey: "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" //,malika key
  });

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: template,
    max_tokens: 150,
    temperature: 0.1
  });
  console.log("response", response.data.choices[0].text);
  return response.data.choices[0].text;
};
