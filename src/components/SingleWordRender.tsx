import React, { useRef, useLayoutEffect, useState, memo, forwardRef } from "react";

type Props = {
  word: string;
  explain?: string;
  progress: number; // 0 ~ 1
};

const SingleWordRenderComponent = forwardRef<HTMLSpanElement, Props>(({ word, progress, explain }, ref) => {
  const wordRef = useRef<HTMLSpanElement>(null);
  const [wordWidth, setWordWidth] = useState(0);

  useLayoutEffect(() => {
    if (wordRef.current) {
      setWordWidth(wordRef.current.offsetWidth);
    }
  }, [word]);

  const underlineWidth = wordWidth * progress;

  return (
    <span className='inline-block relative align-bottom mr-1'
      ref={ref}
      style={{ lineHeight: `${3}` }}>
      <span ref={wordRef} className="whitespace-pre">{word}</span>
      <span
        className="absolute left-0 h-1 bg-sky-400 "
        style={{
          width: `${underlineWidth}px`,
          bottom: `${15}px`,
        }}
      />
      {explain && (
        <div className="absolute left-0 text-xs text-gray-500 whitespace-nowrap" style={{
          bottom: `${-10}px`,
        }}>
          {explain}
        </div>
      )}
    </span>
  );
})


const SingleWordRender = memo(SingleWordRenderComponent);
export default SingleWordRender;