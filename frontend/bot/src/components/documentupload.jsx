import { useState } from "react";
import { Loader } from "./loader";
import axios from "axios";

export function Upload() {
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles(selectedFile);
    }
    setResults(null);
  };

  const handleUpload = async () => {
    if (!files) return alert("Please select a file");
    setUploading(true);

    const formData = new FormData();
    formData.append("files", files);

    try {
      const response = await axios.post(
        `http://127.0.0.1:3001/api/v1/document/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      // Directly set the results to the response's analysis results
      setResults(response.data.analysisResults);
    } catch (error) {
      console.error("Error uploading files:", error);
      setResults("Failed to analyze the documents.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-500 to-gray-700">
      <div className="w-full max-w-2xl bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-white">Upload Document</h1>
        </div>
        <div className="bg-gray-700 h-64 overflow-y-scroll p-4 rounded-md shadow-inner">
          {results ? (
            <div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">Severity:</h3>
                <p className="text-white">{results.severity}</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">Dosage:</h3>
                <p className="text-white">{results.dosage}</p>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-white">Next Steps:</h3>
                <p className="text-white">{results.nextSteps}</p>
              </div>
            </div>
          ) : (
            <p className="text-center text-white">No results yet.</p>
          )}
        </div>
        <div className="py-6 flex flex-col items-center">
          <input
            className="rounded-md mb-4 p-2 border border-gray-300"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
          />
          <button
            onClick={handleUpload}
            className="bg-purple-600 p-4 rounded-md text-white hover:bg-purple-700 transition duration-300"
          >
            {uploading ? "Uploading..." : "Upload & Analyze"}
          </button>
          {uploading && <Loader />}
        </div>
      </div>
    </div>
  );
}