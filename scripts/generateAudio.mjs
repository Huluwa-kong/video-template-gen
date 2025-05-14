import sdk from "microsoft-cognitiveservices-speech-sdk";
import fs from "fs";

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

const text = `US inflation slowed to its lowest rate in more than four years, an unexpected and welcome development at a time when President Donald Trump’s dramatically escalated tariffs are expected to cause prices to rise.

Consumer prices rose 0.2% last month, bringing the annual inflation rate to 2.3%, an unexpectedly cooler reading than the 2.4% increase seen in March, according to the latest Consumer Price Index data released Tuesday by the Bureau of Labor Statistics.

It’s the lowest annual rate since February 2021.

However, what’s been a yearslong unwinding of post-pandemic inflation isn’t expected to last.

“The larger tariff-related price adjustments are likely to come over the next few months,” Alexandra Wilson-Elizondo, co-head and co-chief investment officer of multi-asset solutions at Goldman Sachs Asset Management, wrote Tuesday. “Consequently, we still anticipate (the Federal Reserve) remaining on the sidelines in the near term and for markets to be trading with negotiation and reconciliation headlines.”

Consumers got some relief at the grocery store, where prices fell 0.4% from March, and that brought down overall food prices by 0.1%.

Egg prices sank 12.7% for the month, reflecting declines seen on the wholesale side as the industry starts to recover from a deadly bout of avian flu. The average price of a dozen Grade A eggs fell from $6.23 to $5.12, BLS data shows.

Annually, egg prices are up 49.3%.`;

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
      // write result
      fs.writeFileSync(
        "wordBoundaries.json",
        JSON.stringify(wordBoundaries, null, 2),
      )
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
