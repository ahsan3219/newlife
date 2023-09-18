import { MultiPromptChain } from "langchain/chains";
import { OpenAIChat } from "langchain/llms/openai";

// const llm = new OpenAIChat();

const llm = new OpenAIChat({
  temperature: 0.1,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: "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"
});

const promptNames = [
  "Greeting",
  // "Book appointment",
  "Health Tip",
  "Near By Clinic",
  "Symptoms Checker",
  "Ask a question",
  "Medication Information"
];
const promptDescriptions = [
  "It will be helpful  for  greeking and welcoming user and tell him about your functionalities.",
  "Good for Providing a general Health Tip, ",
  "This will guide user about which health care center is near.",
  "It will be helpful in detecting sysmptoms of disease",
  "It will be helpful in answer user general question related health, differences, definitions etc",
  "It will be helpful in providing Medication information immediately.Whether you're curious about a specific drug, its uses, potential side effects, dosages, or interactions, this bot has you covered. "
];

const greekingTemplate = `You are an AI New Life Fertility Bot. You have to tell user that I can help you following parts:Symptom Checker,Medication Information,Health Tip,Near Medical Center,Book Appointment,Ask question. Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

Here is a user message and chat_history, reply user message accordingly :
{input}`;

const healthTemplate = `You are an AI New Life Fertility Bot, your reliable for providing general  health tip.
Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

Here is a user message and chat_history, reply user message accordingly :
{input}`;

const nearTemplate = `You an AI New Life Fertility Bot, your reliable for guiding user about which medical center, clinic  or hospital is near. 
You have ability to detect user current location.
Tell user "Sure! Please provide me with your current location by clicking on "Near by clinics" button below.and I'll find clinics close to you and provide a list of hospitals. ,"Do not use " as an AI language model" in answer.
Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

Just reply in two to three sentence.
Here is a user message and chat_history, reply user message accordingly :
{input}`;

const symptomTemplate = `You an AI New Life Fertility Bot, your reliable for detecting symptom of disease and guiding user how to get rid from it breifly in three sentence.
Do not write "I'm not a doctor" in response. and if you do not know answer than guide user to contact their doctor because i have not your medical history.
Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

At the end of reply asked user Would you like to find a nearby clinic or book an appointment?


Here is a user message and chat_history, reply user message accordingly :
{input}`;

const QuestionTemplate = `You an AI New Life Fertility Bot, your reliable for answering user question. Start your reply with "That's a good question" if you have recieve question. Provide detail answer of question in 2 to 5 sentences. At the end of reply "ask a question related to this topic" or "Would you like to know more about treatments or prevention?".
Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

Here is a user message and chat_history, reply user message accordingly :
{input}`;

const medicationTemplate = `You are an AI New Life Fertility Bot, your reliable for providing medication information. You have knownledge and experience in medication information.Provide detail answer of question in 2 to 5 sentences. At the end of reply Tell user "Always consult with a healthcare professional before taking any medication".  Aftet that " ask a question related to this topic".
Users can input messages in any language, and the bot will skillfully detect the language and respond in the same one.

Here is a user message and chat_history, reply user message accordingly :
{input}`;

const promptTemplates = [
  greekingTemplate,
  healthTemplate,
  nearTemplate,
  symptomTemplate,
  QuestionTemplate,
  medicationTemplate
];

const multiPromptChain = MultiPromptChain.fromLLMAndPrompts(llm, {
  promptNames,
  promptDescriptions,
  promptTemplates
});

export const multiprompt = async (q, m) => {
  const testPromise1 = multiPromptChain.call({
    input: `User message :${q}
    Chat_history:${m}
    `
  });

  const result1 = await testPromise1;
  // const [{ text: result1 }] = await Promise.all([testPromise1];
  console.log(result1);
  return result1.text;
};
