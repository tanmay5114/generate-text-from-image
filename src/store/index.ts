import { ChangeEvent } from 'react';
import { createWorker } from 'tesseract.js';
import { create } from 'zustand';
type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface CounterState {
  file: FileList | null;
  contentOfFile: string | null;
  tempPreview: string[];
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
  tempPreview: [],

  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files === null) {
      return;
    }

    const files = e.target.files;

    set({ tempPreview: [] });

    set({ file: files});
    for (let i = 0; i < files.length; i++) {
      set((state) => ({
        tempPreview: [...state.tempPreview, URL.createObjectURL(files[i])]
      }));
    };
    const currentState = get();
    console.log("hanlde the file change: ", currentState);
    },


  handleFileUpload: async () => {
    set({contentOfFile: ""});
    console.log("handle the file upload");
    const worker = await createWorker('eng');
    const file = get().file;
    if (!file) {
      console.log("File is empty");
      return;
    }

    if (file.length > 1) {
      for (let i = 0; i < file.length; i++) {
        const ret = await worker.recognize(URL.createObjectURL(file[i]));
        let oldContent = get().contentOfFile;
        console.log("old content is ", oldContent);
        set({ contentOfFile: oldContent = oldContent + "\n" + ret.data.text})
      }
    }
    else {
      const ret = await worker.recognize(URL.createObjectURL(file[0]));
      console.log("text is: ", ret.data.text);
      set({ contentOfFile: ret.data.text });
    }
  }
}));

