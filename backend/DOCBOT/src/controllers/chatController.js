import { ChatInteraction } from "../models/ChatInteraction.js";
import { createDeepInfra } from '@ai-sdk/deepinfra';
import { generateText } from 'ai';


const deepinfra = createDeepInfra({
  apiKey: process.env.DEEPINFRA_API_KEY ?? '',
});

export const processChat = async (req, res) => {
  try {
    const { symptoms, location } = req.body;
    console.log(symptoms);

    if (!symptoms) {
      return res.status(400).json({ success: false, message: "Symptoms are required." });
    }

    const userid =  req.userid;

    // Step 1: Generate Diagnosis Predictions
    const diagnosisResponse = await generateText({
      model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
      prompt: `Analyze the following symptoms and provide possible diagnoses in 50 words: ${symptoms}`,
    });
    console.log(diagnosisResponse);
    const diagnosisPrediction = diagnosisResponse?.text || "No diagnosis prediction available.";

    // Step 2: Find Nearby Hospitals
    let nearbyHospitals = [];
    if (location) {
      const hospitalResponse = await generateText({
        model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
        prompt: `List three hospitals or clinics near ${location} for medical assistance in 50 words.`,
      });
      nearbyHospitals = hospitalResponse?.text || "No nearby hospitals found.";
    }
    console.log(nearbyHospitals);

    // Step 3: Generate Emergency Advice
    const adviceResponse = await generateText({
      model: deepinfra('meta-llama/Meta-Llama-3.1-70B-Instruct'),
      prompt: `Provide emergency advice for the following symptoms: ${symptoms} in 50 words`,
    });
    const emergencyAdvice = adviceResponse?.text || "No emergency advice available.";
    console.log(emergencyAdvice);

    // Save Interaction to Database
    const interaction = new ChatInteraction({
      user: userid,
      symptoms,
      diagnosisPrediction,
      nearbyHospitals,
      emergencyAdvice,
    });

    await interaction.save();

    // Respond with Consolidated Data
    res.status(200).json({
      success: true,
      interaction: {
        symptoms,
        diagnosisPrediction,
        nearbyHospitals,
        emergencyAdvice,
      },
    });
  } catch (error) {
    console.error("Error in processChat:", error);
    res.status(500).json({ success: false, message: "An error occurred while processing the chat." });
  }
};
