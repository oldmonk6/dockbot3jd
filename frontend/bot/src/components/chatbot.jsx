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
    <div className="w-screen bg-[#75766c]">
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center h-[90%]">
          <div className="w-[50%] h-[40%]">
            <div className="flex justify-center text-4xl font-semibold">How can I help you?</div>
            <div className="text-white bg-gray-800 h-[100%] rounded-md border-2 border-solid border-black mt-3 p-4 overflow-y-scroll">
              {typeof responseans === 'string' ? (
                responseans
              ) : (
                <div className="">
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
                className="bg-gray-800 text-white p-4 w-full rounded-md"
                placeholder="Enter your symptoms"
                onChange={(e) => setSymptoms(e.target.value)}
              />
              <input
                type="text"
                className="bg-gray-800 text-white p-4 w-full rounded-md mt-3"
                placeholder="Enter your location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white p-4 w-full rounded-md mt-3"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}