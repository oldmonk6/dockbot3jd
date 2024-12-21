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
    <div className="w-screen">
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center bg-slate-300 h-[80%]">
          <div className="w-[50%] bg-slate-300 h-[80%]">
            <div className="flex justify-center">Upload Document</div>
            <div className="bg-slate-400 h-[100%] overflow-y-scroll">
              {results && (
                <div className="p-4 ">
                 
                  {/* Display Severity, Dosage, and Next Steps directly */}
                  <div className="p-4">
                    <h3 className="font-bold">Severity:</h3>
                    <p>{results.severity}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">Dosage:</h3>
                    <p>{results.dosage}</p>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">Next Steps:</h3>
                    <p>{results.nextSteps}</p>
                  </div>
                </div>
              )}
             
              </div>
              <div className="py-6 flex justify-around">
                <input
                  className="rounded-md"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  multiple
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleUpload}
                  className="bg-violet-400 p-4 rounded-md text-white"
                >
                  {uploading ? "Uploading..." : "Upload & Analyze"}
                </button>
                {uploading && <Loader />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
