import React, { useRef, useEffect, useState } from "react";

type Props = {
  word: string;
  progress: number; // 0 ~ 1
};

const SingleWordRender: React.FC<Props> = ({ word, progress }) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState(0);

  // 动态获取单词宽度
  useEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth);
    }
  }, [word]);

  return (
    <span
      style={{ display: "inline-block", position: "relative", marginRight: 4, fontSize: 24 }}
    >
      <span ref={wordRef}>{word}</span>
      {progress > 0 && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            backgroundColor: "#007bff", // 可自定义颜色
            width: wordWidth * progress,
            transition: "width 50ms linear",
          }}
        />
      )}
    </span>
  );
};


export default SingleWordRender;