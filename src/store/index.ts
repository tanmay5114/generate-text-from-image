import { ChangeEvent } from 'react';
import { createWorker } from 'tesseract.js';
import { create } from 'zustand';
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface CounterState {
  file: File | null;
  contentOfFile: string | null;
  status: UploadStatus;
  uploadProgress: number;

  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFileUpload: () => void;
}

export const useFileStore = create<CounterState>((set, get) => ({
  file: null,
  contentOfFile: null,
  status: 'idle',
  uploadProgress: 0,

  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      set({ file: e.target.files[0]})
      const currentState = get();
      console.log("hanlde the file change: ", currentState);
    }},

  handleFileUpload: async () => {
    console.log("handle the file upload");
    const worker = await createWorker('eng');
    const file = get().file;
    if (!file) {
      console.log("File is empty");
      return;
    }
    const ret = await worker.recognize(URL.createObjectURL(file));
    console.log("text is: ", ret.data.text);
    set({ contentOfFile: ret.data.text });
  }
}));

