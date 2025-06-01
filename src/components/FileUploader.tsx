import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useFileStore } from "@/store";


export default function FileUploader() {
    const { handleFileChange} = useFileStore();
    
    return (
        <div>
            <Button className="hover:bg-yellow-400">
                <Label htmlFor="file">Upload</Label>
                <Input id="file" type="file" className="hidden" onChange={handleFileChange}/>
            </Button>
        </div>
    )
}