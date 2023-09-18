import { Configuration, OpenAIApi } from "openai";
import nlp from "compromise";
import { getUserLocation } from "./map.js";
export const davinci = async (userMessage) => {
  console.log("backend", userMessage);
  const configuration = new Configuration({
    apiKey: "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" //,malika key
  });

  const openai = new OpenAIApi(configuration);
  // const chat_history=chat.data
  // const objectsArray = chat.filter(item => typeof item === 'object' && !Array.isArray(item));
  //   const promp_gpt = `
  // //   You are a chatbot of Dr Ali and Artificial intelligence bot that can answer medical questions. You have to answer questions treat you as a teacher and user as student. Always speak to your own doctor for specific answers in your medical case as I do not have your medical file.

  // // Only give the answer of question only.
  // // No need to answer questions present in chathistory.

  // // Human:${userMessage}
  // // Chatbot:
  // `;

  // Detect user intent using the compromise library
  async function detectUserIntent(input) {
    const doc = nlp(input);

    if (doc.has("appointment") || doc.has("book") || doc.has("schedule")) {
      console.log(
        "Sure, we can help you book an appointment. Please provide more details."
      );
      const prompt_gpt = `You are the Appointment Bot. Your goal is to collect information for scheduling an appointment. You will ask the user for their name, username, email, phone number, address, preferred time, and date for the appointment. After collecting the information, you will read it back to the user for confirmation and once it is confirm then send a  json of the information on last.
  start asking question one by one as above`;
      return prompt_gpt;
    } else if (
      doc.has("hospital") ||
      doc.has("medical center") ||
      doc.has("clinic")
    ) {
      // const result =  getUserLocation();
      // setTimeout((result) => {
      //   console.log("result", typeof result, result);
      // }, 5000);
      // console.log("result", typeof result, result);

      getUserLocation()
        .then((result) => {
          console.log("result121", typeof result, result);

          // setTimeout((result) => {
          //   console.log("result", typeof result, result);
          // }, 10000); // 3000 milliseconds = 3 seconds
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });

      const prompt_gpt = `You are a chatbot who tell user about near hospital in a great way.Use this format:
    
      `;
      return prompt_gpt;
    } else if (doc.has("medication") || doc.has("medicine")) {
      console.log(
        "If you need information about medication, we're here to help."
      );
    } else if (
      doc.has("healthcare") ||
      doc.has("health") ||
      doc.has("wellness")
    ) {
      console.log(
        "General healthcare inquiries are welcome. Feel free to ask."
      );
    } else if (
      doc.has("symptoms") ||
      doc.has("check symptoms") ||
      doc.has("health symptoms")
    ) {
      console.log(
        "If you're experiencing symptoms and need assistance, we're here for you."
      );
    } else {
      console.log("I'm sorry, I couldn't understand your request.");
    }
  }

  const prompt_gpt = await detectUserIntent(userMessage);
  console.log("prompt_gpt", prompt_gpt);

  //   const promp_gpt = `You are the Appointment Bot. Your goal is to collect information for scheduling an appointment. You will ask the user for their name, username, email, phone number, address, preferred time, and date for the appointment. After collecting the information, you will read it back to the user for confirmation.

  // Bot: Hello! I'm here to help you schedule an appointment. Let's start by collecting some information. What is your full name?
  // User: [User's full name]

  // Bot: Thank you! What username would you like to use for the appointment?
  // User: [User's username]

  // Bot: Great! Please provide your email address.
  // User: [User's email address]

  // Bot: Thank you! What phone number can we reach you at?
  // User: [User's phone number]

  // Bot: Perfect! Could you provide your address for the appointment?
  // User: [User's address]

  // Bot: Thanks! Now, when would you prefer the appointment? Please provide a date and time (e.g., YYYY-MM-DD at HH:MM AM/PM).
  // User: [User's preferred date and time]

  // Bot: Got it! Here's the information you've provided:
  // Name: [User's full name]
  // Username: [User's username]
  // Email: [User's email address]
  // Phone: [User's phone number]
  // Address: [User's address]
  // Time: [User's preferred time]
  // Date: [User's preferred date]

  // Bot: Is all the information correct? Please reply with 'yes' if everything looks good, or 'no' if you need to make any changes.
  // User: [User's confirmation]

  // Bot: Thank you for confirming. Your appointment information has been recorded. I will send you an email with the details. Have a great day!

  // start asking question one by one as above
  // `;

  // console.log("prompt_gpt", typeof promp_gpt, promp_gpt);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt_gpt,
    max_tokens: 600,
    temperature: 0
  });
  console.log("response", response.data.choices[0].text);
  console.log(response);
  return response.data.choices[0].text;
};

///Nearest Hospital or clinic
// ////<!DOCTYPE html>
// <html>
// <head>
//   <title>Geolocation and Mapbox API Example</title>
// </head>
// <body>

// <h2>My Heading</h2>

// <p>Play around with the code and click on the "Run" button to view the result.</p>

// <p id="demo"></p>
// <p id="demo1"></p>

// <script>
// function handleSuccess(position) {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;

//   const demoElement = document.getElementById("demo");
//   demoElement.innerHTML = "Longitude: " + longitude + "<br />" + "Latitude: " + latitude;

//   // Make GET request to Mapbox API
//   const mapboxUrl = `https://api.mapbox.com/search/searchbox/v1/category/hospital?access_token=sk.eyJ1IjoiYWhzYW5yYXoiLCJhIjoiY2xsY3hta25rMDVnaDNlcW16NjI4cGtuYyJ9.XY8n1z7pAVj73m6I0p2tmA&language=en&limit=10&origin=67.0784509,24.9442949`;

//   fetch(mapboxUrl)
//     .then(response => response.json())
//     .then(data => {
//   const demoElement1 = document.getElementById("demo1");
//   demoElement1.innerHTML = JSON. stringify(data);

// console.log(data); // Display the response data in the browser console
//     })
//     .catch(error => {

//   const demoElement1 = document.getElementById("demo1");
//   demoElement1.innerHTML = JSON. stringify(data);
//       console.error("Error fetching data:", error);
//     });
// }

// function handleError(error) {
//   console.error("Error getting location:", error);
// }

// // Check if geolocation is available in the browser
// if ("geolocation" in navigator) {
//   // Get user's current position
//   navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
// } else {
//   console.log("Geolocation is not available in this browser.");
// }
// </script>

// </body>
// </html>
