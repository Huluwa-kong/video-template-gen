import sdk from "microsoft-cognitiveservices-speech-sdk";

const AZURE_KEY = process.env.AZURE_KEY;
const AZURE_REGION = process.env.AZURE_REGION;
if (!AZURE_KEY || !AZURE_REGION) {
  throw new Error(
    "AZURE_KEY and AZURE_REGION must be set in the environment variables.",
  );
}
const speechConfig = sdk.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
speechConfig.speechSynthesisVoiceName = "en-US-AriaNeural"; // 你可以换成其他语音

const audioConfig = sdk.AudioConfig.fromAudioFileOutput("output.wav");
const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

const text = "This is an AI-generated news reading example.";

// const wordBoundaries: {
//   word: string;
//   offsetMs: number;
// }[] = [];

const wordBoundaries = [];

synthesizer.wordBoundary = (s, e) => {
  console.log(`Word: ${e.text}, Audio offset: ${e.audioOffset / 10000}ms`);
  wordBoundaries.push({
    word: e.text,
    offsetMs: e.audioOffset / 10000, // 转为毫秒
  });
};


synthesizer.speakTextAsync(
  text,
  (result) => {
    if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
      console.log("Synthesis finished.");
      console.log("wordBoundaries:", wordBoundaries);
    } else {
      console.error("Speech synthesis failed:", result.errorDetails);
    }
    synthesizer.close();
  },
  (err) => {
    console.trace("err - " + err);
    synthesizer.close();
  },
);
