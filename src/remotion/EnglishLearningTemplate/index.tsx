import { AbsoluteFill, Audio } from "remotion";
import CaptionSpeech from './components/CaptionSpeech'
import WordCardList from "./components/WordCard";
import { z } from "zod";

const WordDictSchema = z.object({
  word: z.string(),
  explain: z.string(),
  audioFilePath: z.string(),
})



export const WordBoundarySchema = z.object({
  word: z.string(),
  offsetMs: z.number(),
  explain: z.string().optional(),
});

// 定义 speechMetaData 是 WordBoundary 的数组
export const SpeechMetaDataSchema = z.array(WordBoundarySchema);


// 最终父组件的 props schema
export const EnglishLearningTemplatePropsSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  audioFilePath: z.string(),
  speechMetaData: SpeechMetaDataSchema,
});


const EnglishLearningTemplate = ({ audioFilePath, speechMetaData, title, subTitle }: z.infer<typeof EnglishLearningTemplatePropsSchema>) => {
  //

  if (!speechMetaData) {
    throw new Error("Data was not fetched");
  }

  const wordList = [{
    word: 'China',
    pronunciation: 'tfaina',
    chineseMeaning: 'n.中国'
  }]

  return (
    <AbsoluteFill className="bg-white pt-8 pb-8 pl-4 pr-4">
      <div className="">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-2xl mb-4">{subTitle}</p>
      </div>
      <div className="border-t-2 border-b-2 border-black text-2xl flex items-center justify-between py-2">
        <span>单词数：{speechMetaData?.length}个</span>
        <div>
          <span className="mr-4">高频词: {3}个</span>
          <span>中频词: {3}个</span>
        </div>
      </div>
      <div className="flex flex-row">
        <CaptionSpeech audioFilePath={audioFilePath} speechMetaData={speechMetaData} className="w-[720px] border-r-2 border-black block"></CaptionSpeech>
        <WordCardList words={wordList} />
      </div>
    </AbsoluteFill>
  )
}


export default EnglishLearningTemplate;