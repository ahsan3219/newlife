// const { davinci_pure } = require("./pureai");
// const axios = require("axios");

// // Function to make the API request
// async function fetchHospitalsNearby(latitude, longitude) {
//   const apiUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=5&apiKey=dc7440ae5c1043f6b2e886aa7ff7c699`;

//   axios
//     .get(apiUrl)
//     .then(async (response) => {
//       // Process the response data here
//       const hospitalInfoList = [];

//       response.data.features.forEach((element) => {
//         const hospital_name_address = {
//           name: element.properties.name,
//           address: element.properties.formatted
//         };
//         hospitalInfoList.push(hospital_name_address);
//       });
//       console.log("response.data.features", hospitalInfoList);
//       const prompt = `You are an AI chatbot who is guiding  user about near hospitals or medical center or clinic. use this format:
//      Name:
//      Address:
//      Here is the list of name and address :${JSON.stringify(hospitalInfoList)}
//      Send answer using all list  in provided format
//      `;
//       const res = await davinci_pure(prompt);

//       console.log("davinci_pure", res);

//       return res;
//     })
//     .catch((error) => {
//       console.error("Error making the request:", error);
//     });
// }

// // Get user's current location
// export function getUserLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async function (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
//         console.log("longitude", longitude);

//         const response = await fetchHospitalsNearby(latitude, longitude);

//         console.log("long", response);
//       },
//       (error) => {
//         console.error("Error getting user location:", error.message);
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
// }

const { davinci_pure } = require("./pureai");
const axios = require("axios");

async function fetchHospitalsNearby(latitude, longitude) {
  const apiUrl = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=5&apiKey=dc7440ae5c1043f6b2e886aa7ff7c699`;

  try {
    let hospitalInfoList = [];
    const response = await axios.get(apiUrl);

    response.data.features.forEach((element) => {
      const hospital_name_address = {
        name: element.properties.name,
        address: element.properties.formatted
      };
      hospitalInfoList.push(hospital_name_address);
    });
    console.log("response.data.features", hospitalInfoList);

    // const hospitalInfoList = response.data.features.map((element) => ({
    //   name: element.properties.name,
    //   address: element.properties.formatted
    // }));

    console.log("response.data.features", hospitalInfoList);

    const prompt = `You are an AI chatbot who is guiding the user about nearby hospitals, medical centers, or clinics. Use this format:
     Name:
     Address:
     Here is the list of names and addresses: ${JSON.stringify(
       hospitalInfoList
     )}
     Send an answer using all items in the provided format.Use all items`;

    const res = await davinci_pure(prompt);
    console.log("davinci_pure", res);

    return res;
  } catch (error) {
    console.error("Error making the request:", error);
  }
}

export async function getUserLocation() {
  try {
    const position = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("longitude", longitude);

    const response = await fetchHospitalsNearby(latitude, longitude);

    console.log("response1232", response);
    return response;
  } catch (error) {
    console.error("Error getting user location:", error.message);
  }
}

// getUserLocation();

// export async function getUserLocation() {
//   return new Promise((resolve, reject) => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const latitude = position.coords.latitude;
//           const longitude = position.coords.longitude;

//           // Call the API with the retrieved coordinates
//           const response = fetchHospitalsNearby(latitude, longitude);
//           resolve(response);

//           // Resolve the promise with the response
//         },
//         (error) => {
//           console.error("Error getting user location:", error.message);
//           reject(error); // Reject the promise with the error
//         }
//       );
//     } else {
//       const error = new Error("Geolocation is not supported by this browser.");
//       console.error(error.message);
//       reject(error); // Reject the promise with the error
//     }
//   });
// }
