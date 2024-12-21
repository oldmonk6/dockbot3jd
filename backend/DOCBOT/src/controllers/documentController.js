import { Document } from "../models/Document.js"; // Assuming you have a Document model
import { extractTextFromDocument } from "../utils/extractTextFromDocument.js"; // Utility function to extract text from uploaded document
import axios from "axios";
import { createDeepInfra } from '@ai-sdk/deepinfra';
import { generateText } from 'ai';


const deepinfra = createDeepInfra({
  apiKey: process.env.DEEPINFRA_API_KEY ?? '',
});

// Example AI function for calling Gemini API


export const uploadDocument = async (req, res) => {
  try {
  
    const filePath = req.file.path;
    console.log(filePath);

    // Step 1: Save the document in the database
    const document = new Document({ user: req.userid, filePath });
    await document.save();
    console.log("hi")

    // Step 2: Extract text from the uploaded document
    const extractedText = await extractTextFromDocument(filePath);
    console.log(extractedText) // Implement this utility to extract text (e.g., PDF, image to text)

    if (!extractedText) {
      return res.status(400).json({ success: false, message: 'Failed to extract text from document.' });
    }
     console.log("hello")
    // Step 3: Call the Gemini AI analysis service with the extracted text
    const diagnosisResponse = await generateText({
          model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
          prompt: `Analyze  and provide me with the severity to handle the disease from the given data in 50 words: ${extractedText}`,
        });
        console.log(diagnosisResponse);
        const diagnosisPrediction = diagnosisResponse?.text || "No diagnosis prediction available.";
        const dosageresponse = await generateText({
          model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
          prompt: `Analyze  and provide me with the dosage to handle the disease from the given data in 50 words ${extractedText}`,
        });
        console.log(dosageresponse);
        const dosageprediction = dosageresponse?.text || "No diagnosis prediction available.";
        const nextstepresponse = await generateText({
          model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
          prompt: `Analyze  and provide me with the next step to handle the disease from the given data 50 words: ${extractedText}`,
        });
        console.log(nextstepresponse);
        const nextstepprediction = nextstepresponse?.text || "No diagnosis prediction available.";
    // Step 4: Store AI results in the document
    const analysisResults={
      severity:diagnosisPrediction,
      dosage:dosageprediction,
      nextSteps:nextstepprediction
    }
    console.log(analysisResults);
    document.analysis = analysisResults;
    await document.save();

    // Step 5: Respond with the document and analysis
    res.status(201).json({ success: true, analysisResults });
  } catch (error) {
    console.error("Error in uploadDocument:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


