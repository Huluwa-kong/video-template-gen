import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio, staticFile,   } from "remotion";
import { z } from "zod";
import SingleWordRender from "@/src/components/SingleWordRender";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const WordBoundarySchema = z.object({
  word: z.string(),
  offsetMs: z.number(),
  explain: z.string(),
});

export const CaptionSpeechPropsSchema = z.object({
  audioFilePath: z.string(),
  speechMetaData: z.array(WordBoundarySchema),
});

type CaptionSpeechProps = z.infer<typeof CaptionSpeechPropsSchema>;


interface ScrollProps {
  baseOffset: number;
  shiftOffsetFrom?: number;
  shiftOffsetTo?: number;
}


const CaptionSpeech = ({ audioFilePath, speechMetaData }: CaptionSpeechProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  useEffect(() => {
    getAudioDurationInSeconds(staticFile(audioFilePath)).then(setAudioDuration);
  }, [audioFilePath]);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const currentReadingWordIndex = useMemo(() => {
    // 由于 wordRefs 是 RefObject<(HTMLSpanElement | null)[]> 类型，需要访问其 current 属性来获取数组
    if (!wordRefs.current.length) return;
    const currentTimeMs = frame / fps * 1000;
    // find the index of the word is reading
    const index = speechMetaData.findIndex(({ offsetMs }, index) => {
      const nextWordInfo = speechMetaData[index + 1];
      if (!nextWordInfo) return true; // last word, always return true
      else {
        const nextWordStartAt = nextWordInfo.offsetMs;
        return currentTimeMs >= offsetMs && currentTimeMs < nextWordStartAt;
      }
    });
    return index;
  }, [frame, fps])

  const [offsetYInfo, setOffsetYInfo] = useState<ScrollProps>({
    baseOffset: 0,
    shiftOffsetFrom: 0,
    shiftOffsetTo: 0,
  });

  useEffect(() => {
    if (!currentReadingWordIndex) return;
    const wordEl = wordRefs.current[currentReadingWordIndex];
    const containerEl = parentContainerRef.current;
    if (!wordEl || !containerEl) return;

    const wordRect = wordEl.getBoundingClientRect();
    const containerRect = containerEl.getBoundingClientRect();

    const marginBottom = 60; // 提前一些滚动
    const wordBottom = wordRect.bottom;
    const containerBottom = containerRect.bottom;
    if (wordBottom > containerBottom - marginBottom) {
      const shiftDelta = wordRect.top - containerRect.top;
      setOffsetYInfo({
        ...offsetYInfo,
        shiftOffsetFrom: 0,
        shiftOffsetTo: -shiftDelta,
      })
    }
  }, [currentReadingWordIndex,])

  console.log('shift:', offsetYInfo)


  if (!audioDuration) return <></>;

  // translate-y-[-100px]

  return <AbsoluteFill className='bg-white'>
    <div
      className="text-[24px] leading-relaxed font-serif h-[300px] overflow-hidden border border-gray-300"
      ref={parentContainerRef}
    >
      <div className="">
        {speechMetaData.map(({ word, offsetMs, explain }, index) => {
          // current time in ms
          const currentTimeMs = frame / fps * 1000;
          const nextWordInfo = speechMetaData[index + 1];
          // decide the duration of the word
          const nextWordStartAt = nextWordInfo ? nextWordInfo.offsetMs : audioDuration * 1000;
          const durationMs = nextWordStartAt - offsetMs;

          // clip the progress to 0-1
          const progress = Math.min(Math.max((currentTimeMs - offsetMs) / durationMs, 0), 1);

          // check if next word is a punctuation
          const nextWordIsPunctuation = nextWordInfo ? /^[.,!?;:()\[\]{}'"“”‘’\-—…]+$/.test(nextWordInfo.word) : false;

          return (
            <div key={index} className={`inline ${nextWordIsPunctuation ? "" : "mr-4"}`}>
              <SingleWordRender
                // 原代码的 ref 函数返回值类型不符合要求，修改为只进行赋值操作，不返回值
                ref={(el) => {
                  wordRefs.current[index] = el;
                }}
                word={word}
                explain={explain}
                progress={progress}
              />
            </div>
          )
        })}
      </div>
    </div>
    <Audio volume={0.5} src={staticFile(audioFilePath)} />
  </AbsoluteFill>
}

export default CaptionSpeech;