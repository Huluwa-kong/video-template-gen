import './index.css';

import { Composition } from "remotion";
import { Main } from "@/src/remotion/MyComp/Main";
import CaptionSpeech from '@/src/remotion/CaptionsSpeech'
import CaptionSpeechConfig from '@/src/remotion/CaptionsSpeech/config'
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import { NextLogo } from "@/src/remotion/MyComp/NextLogo";
import wordBoundaries from "@/wordBoundaries.json";
import { useMemo } from "react";


export const RemotionRoot: React.FC = () => {
  // load json from static file

  const wordBoundariesProcess = useMemo(() => {
    if (!wordBoundaries) return [];
    // for each word, remove spaces (\n, white space etc)
    return wordBoundaries.map(({ word, offsetMs }) => {
      return {
        word: word.trim().replace(/[\s\u00A0]{2,}/g, ' '),
        offsetMs,
        explain: '测试',
      }
    })
  }, [wordBoundaries])

  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={defaultMyCompProps}
      />
      <Composition
        id="NextLogo"
        component={NextLogo}
        durationInFrames={300}
        fps={30}
        width={140}
        height={140}
        defaultProps={{
          outProgress: 0,
        }}
      />
      <Composition
        id={'CaptionSpeech'}
        component={CaptionSpeech}
        durationInFrames={CaptionSpeechConfig.DURATION_IN_FRAMES}
        fps={CaptionSpeechConfig.VIDEO_FPS}
        width={CaptionSpeechConfig.VIDEO_WIDTH}
        height={CaptionSpeechConfig.VIDEO_HEIGHT}
        defaultProps={{
          audioFilePath: 'cnn-news.wav',
          speechMetaData: wordBoundariesProcess
        }}
      />
    </>
  );
};
