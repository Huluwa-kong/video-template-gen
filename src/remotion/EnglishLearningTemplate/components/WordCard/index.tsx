interface WordCardProps {
  word: string;
  pronunciation: string;
  chineseMeaning?: string;
}

const WordCard = ({ word, pronunciation, chineseMeaning }: WordCardProps) => {
  // A simple card
  // Word Punctuation
  // Meaning
  return (
    <div className="flex flex-col rounded-sm bg-red-200 px-4 py-1">
      <div className="flex flex-row">
        <span className="text-2xl mr-1">{word}</span>
        <span className="text-2xl font-bold">[{pronunciation}]</span>
      </div>
      <div className="text-lg">{chineseMeaning}</div>
    </div>
  )
}


const WordCardList = ({ words }: { words: WordCardProps[] }) => {
  return (
    <div className="flex flex-col shrink">
      {words.map((word, index) => (
        <WordCard key={index} {...word} />
      ))}
    </div>
  )
}

export { WordCard };
export default WordCardList;
