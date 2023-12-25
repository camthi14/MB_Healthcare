import { useCallback, useMemo, useRef, useState } from "react";

export const useShortText = (text: string, lengthShort = 30) => {
  const lastTextRef = useRef<string>(text);
  const [shortText, setShortText] = useState<string>(() => {
    if (text?.length > lengthShort) return text.substring(0, lengthShort - 3) + "...";
    return text;
  });

  const fullText = useMemo(
    () => Boolean(shortText?.length === lastTextRef.current?.length),
    [shortText, lastTextRef]
  );

  const onToggleShortText = useCallback(() => {
    let newShortText = "";

    if (shortText.length === lastTextRef.current.length) {
      newShortText = lastTextRef.current.substring(0, lengthShort - 3) + "...";
    } else {
      newShortText = lastTextRef.current;
    }

    setShortText(newShortText);
  }, [lastTextRef, shortText, lengthShort]);

  return { shortText, onToggleShortText, fullText };
};
