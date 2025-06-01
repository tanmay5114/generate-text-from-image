import FilePreview from "./components/FilePreview";
import FileUploader from "./components/FileUploader";
import { Button } from "./components/ui/button";
import { useFileStore } from "./store";

function App() {
  const {handleFileUpload, contentOfFile} = useFileStore();

  return (
    <div className="flex flex-col justify-center items-center w-full gap-2 my-2">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance p-4">
        Upload The Image
      </h1>

      <div className="p-4">
          <FileUploader />
      </div>

      <div className="p-4 max-w-[1000px]">
        <FilePreview />
      </div>

      <Button className="p-4 bg-green-400 hover:bg-green-800" onClick={handleFileUpload}>
        Convert to Text
      </Button>

      <p className="p-4 max-w-[750px]">
        {contentOfFile}
      </p>

    </div>
  )
}

export default App;