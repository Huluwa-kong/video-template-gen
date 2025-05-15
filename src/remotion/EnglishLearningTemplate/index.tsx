import { AbsoluteFill, useCurrentFrame, useVideoConfig, Audio, staticFile, CalculateMetadataFunction } from "remotion";
import CaptionSpeech from './components/CaptionSpeech'

import { z } from "zod";

const apiResponse = z.object({
  title: z.string(),
  subTitle: z.string(),
  audioFilePath: z.string(),
  speechMetaData: z.string()
});


export const myCompSchema = z.object({
  id: z.string(),
  data: z.nullable(apiResponse),
});

type Props = z.infer<typeof myCompSchema>;

export const calcMyCompMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const data = await fetch(`https://example.com/api/${props.id}`);
  const json = await data.json();
 
  return {
    props: {
      ...props,
      data: json,
    },
  };
};


export const EnglishLearningTemplateProps = z.object({
  audioFilePath: z.string(),
  speechMetaData: z.string(),
  title: z.string(),
  subTitle: z.string(),
})


const EnglishLearningTemplate = ({ audioFilePath, speechMetaData, title, subTitle }: z.infer<typeof CompositionProps>) => {
  //
}


export default EnglishLearningTemplate;