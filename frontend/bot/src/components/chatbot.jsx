import { useState } from "react";
import axios from "axios";

export function Chatbot() {
  const [responseans, setResponse] = useState("Hi there! How can I assist you?");
  const [symptoms, setSymptoms] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/chats/chat", {
        symptoms,
        location,
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });

      console.log('Response from server:', response.data);
      setResponse(response.data.interaction);
    } catch (error) {
      console.error('Error submitting chat:', error);
      console.error('Response:', error.response);
      setResponse('Failed to process your request.');
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="w-full max-w-2xl bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold">How can I help you?</h1>
        </div>
        <div className="bg-gray-700 h-64 overflow-y-scroll p-4 rounded-md shadow-inner">
          {typeof responseans === 'string' ? (
            responseans
          ) : (
            <div>
              <h2 className="text-2xl font-bold">Diagnosis Prediction</h2>
              <p>{responseans.diagnosisPrediction}</p>
              <h2 className="text-2xl font-bold mt-4">Nearby Hospitals</h2>
              <p>{responseans.nearbyHospitals}</p>
              <h2 className="text-2xl font-bold mt-4">Emergency Advice</h2>
              <p>{responseans.emergencyAdvice}</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <input
            type="text"
            className="bg-gray-700 text-white p-4 w-full rounded-md mb-3"
            placeholder="Enter your symptoms"
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <input
            type="text"
            className="bg-gray-700 text-white p-4 w-full rounded-md mb-3"
            placeholder="Enter your location"
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-gray-700 text-white p-4 w-full rounded-md hover:bg-gray-600 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}