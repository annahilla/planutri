"use client";

import { ChangeEvent, useEffect, useRef } from "react";

const TextAreaResizable = ({
  value,
  setValue,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const minRows = 10;

  const adjustTextareaRows = () => {
    if (textareaRef.current) {
      textareaRef.current.rows = 1;

      const newRows = Math.max(
        Math.ceil(textareaRef.current.scrollHeight / 28),
        minRows
      );
      textareaRef.current.rows = newRows;
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    adjustTextareaRows();
  };

  useEffect(() => {
    adjustTextareaRows();
  }, [value]);

  useEffect(() => {
    adjustTextareaRows();
  }, []);

  return (
    <textarea
      ref={textareaRef}
      className="whitespace-pre-wrap border p-5 rounded outline-none w-full flex-1 resize-none"
      onChange={handleInputChange}
      value={value}
    />
  );
};

export default TextAreaResizable;
