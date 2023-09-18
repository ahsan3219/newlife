import React, { useState, useEffect } from "react";
import {
  Widget,
  addResponseMessage,
  toggleWidget,
  setQuickButtons
} from "react-chat-widget";
import client from "./client";
import "react-chat-widget/lib/styles.css";
import { appointment } from "./appointment.js";
import { chat } from "./pinecone.js";
import { davinciDetect } from "./detect.js"; // Import the function to interact with OpenAI
import { booking } from "./appointment.js";
import dr from "./dr"; // Import the avatar image
import { getUserLocation } from "./map.js";
import { healthTip } from "./healthTip.js";
import { multiprompt } from "./multiprompt.js";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [memory, setMemory] = useState([]);
  useEffect(() => {
    // addResponseMessage("Hello there! How can I assist you today?");
    toggleWidget();

    const handleButtonClick = (buttonValue) => {
      console.log(`You clicked the "${buttonValue}" button.`);
      setQuickButtons([]);
      addResponseMessage(`You clicked the "${buttonValue}" button.`);
    };

    const initialButtons = [
      {
        label: "schedule",
        value: "schedule"
        // onClick: () => handleButtonClick("schedule")
      },
      {
        label: "Health Tips",
        value: "Health Tips"
      },
      {
        label: "Nearby Clinics",
        value: "Nearby Clinics"
      },
      {
        label: "Ask a Question",
        value: "Ask a Question"
      },
      {
        label: "Medication Info",
        value: "Medication Info"
      }
    ];

    setQuickButtons(initialButtons);
  }, []);

  const handleQuickButtonClicked = async (e) => {
    console.log(e);

    const initialButtons = [
      {
        label: "schedule",
        value: "schedule"
        // onClick: () => handleButtonClick("schedule")
      },
      {
        label: "Health Tips",
        value: "Health Tips"
      },
      {
        label: "Nearby Clinics",
        value: "Nearby Clinics"
      },
      {
        label: "Ask a Question",
        value: "Ask a Question"
      },
      {
        label: "Medication Info",
        value: "Medication Info"
      }
    ];

    const matchingButton = initialButtons.find((button) => button.value === e);

    if (matchingButton) {
      // addResponseMessage("Selected " + e);

      const newQuickButtons = initialButtons
        .filter((button) => button.label !== e)
        .map((button) => ({ label: button.label, value: button.value }));

      setQuickButtons(newQuickButtons);
    }

    //using gpt accordingly

    if (e === "Nearby Clinics") {
      const response = await getUserLocation();
      addResponseMessage(response);
    } else if (e === "Health Tips") {
      const response = await healthTip();
      addResponseMessage(response);
    }
  };

  let arr = [];
  let me = [];
  const handleNewUserMessage = async (newMessage) => {
    try {
      //Booing code

      const detect = await davinciDetect(newMessage);
      // console.log("detect", detect.Answer);

      const get = JSON.parse(detect);
      console.log("detect message", typeof get, get.value);
      const newObject = {
        Prompt: get.value
      };
      me.push(newObject);
      console.log("me", me);

      if (
        get.value === "Book Appointment" ||
        // arr[0].Prompt === "Book Appointment"
        me.some((item) => item.Prompt === "Book Appointment")
      ) {
        console.log("Booking");
        const botResponse = await booking(newMessage, arr);
        const newObject = {
          user: newMessage,
          docethan: botResponse,
          Prompt: get.value !== undefined ? get.value : "Book Appointment"
        };
        arr.push(newObject);
        console.log("mem", arr);

        function extractDataWithBraces(inputString) {
          // Define a regular expression pattern to match text inside curly braces
          var pattern = /\{(.*?)\}/g;

          // Find all matches of the pattern in the input string
          var matches = inputString.match(pattern);

          if (matches) {
            // Extract data inside the curly braces
            var extractedData = matches.map(function (match) {
              return match.slice(1, -1); // Remove the braces
            });
            return extractedData;
          } else {
            addResponseMessage(botResponse);
          }
        }

        extractDataWithBraces(botResponse);

        // addResponseMessage(botResponse);
      } else if (get.value == "Fertility") {
        console.log("Fertility");
        const message = `query:${newMessage}
      chat_history:${arr}
      `;
        const botResponse = await chat(message); // Use your AI function here
        const newObject = {
          user: newMessage,
          docethan: botResponse,
          Prompt: get.value
        };
        arr.push(newObject);
        console.log("mem", arr);
        addResponseMessage(botResponse.text);
      } else if (
        get.value !== "Book Appointment" &&
        get.value !== "Fertility "
      ) {
        console.log("else");
        const botResponse = await multiprompt(newMessage, arr); // Use your AI function here
        const newObject = {
          user: newMessage,
          docethan: botResponse,
          Prompt: get.value
        };
        arr.push(newObject);
        console.log("mem", arr);
        addResponseMessage(botResponse);
      }
    } catch (error) {
      // try {
      //   const botResponse = await chat(newMessage);
      //   console.log("botresponse", botResponse);
      //   addResponseMessage(botResponse.text);
      // }

      console.error("Error generating response:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="New Life Fertility "
        subtitle="Ask me anything!"
        titleAvatar={dr}
        profileAvatar={dr}
        profileClientAvatar={client}
        senderPlaceHolder="Type your messages..."
        handleQuickButtonClicked={handleQuickButtonClicked}
        resizable={true}
      />
    </div>
  );
}

export default Chatbot;
