import { Composition } from "remotion";
import { Main } from "@/src/remotion/MyComp/Main";
import CaptionSpeech from '@/src/remotion/CaptionsSpeech'
import {
  COMP_NAME,
  defaultMyCompProps,
  DURATION_IN_FRAMES,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/types/constants";
import { NextLogo } from "@/src/remotion/MyComp/NextLogo";

export const RemotionRoot: React.FC = () => {
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
        durationInFrames={DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        defaultProps={{
          audioFilePath: 'output.wav',
          speechMetaData: [
            { word: 'This', offsetMs: 50 },
            { word: 'is', offsetMs: 337.5 },
            { word: 'an', offsetMs: 450 },
            { word: 'AI-generated', offsetMs: 637.5 },
            { word: 'news', offsetMs: 1600 },
            { word: 'reading', offsetMs: 1887.5 },
            { word: 'example', offsetMs: 2175 },
            { word: '.', offsetMs: 2812.5 }
          ]
        }}
      />
    </>
  );
};
