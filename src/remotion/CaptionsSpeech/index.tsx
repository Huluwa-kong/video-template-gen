import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio, staticFile } from "remotion";
import { z } from "zod";
import SingleWordRender from "@/src/components/SingleWordRender";
import { useEffect, useState } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const WordBoundarySchema = z.object({
  word: z.string(),
  offsetMs: z.number(),
});

export const CaptionSpeechPropsSchema = z.object({
  audioFilePath: z.string(),
  speechMetaData: z.array(WordBoundarySchema),
});

type CaptionSpeechProps = z.infer<typeof CaptionSpeechPropsSchema>;

const CaptionSpeech = ({ audioFilePath, speechMetaData }: CaptionSpeechProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // current time in ms
  const currentTimeMs = frame / fps * 1000;

  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  useEffect(() => {
    getAudioDurationInSeconds(staticFile(audioFilePath)).then(setAudioDuration);
  }, [audioFilePath]);

  if (!audioDuration) return <></>;

  return <AbsoluteFill>
    {speechMetaData.map(({ word, offsetMs }, index) => {
      // decide the duration of the word
      const nextWordStartAt = speechMetaData[index + 1] ? speechMetaData[index + 1].offsetMs : audioDuration * 1000;
      const durationMs = nextWordStartAt - offsetMs;

      // clip the progress to 0-1
      const progress = Math.min(Math.max((currentTimeMs - offsetMs) / durationMs, 0), 1);
      return <SingleWordRender
        key={index}
        word={word}
        progress={progress}
      />
    })}
    <Audio volume={0.5} src={staticFile(audioFilePath)} />
  </AbsoluteFill>
}

export default CaptionSpeech;