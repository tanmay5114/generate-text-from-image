import { useFileStore } from "@/store"

export default function FilePreview() {
    const { file } = useFileStore();
    let preview;
    if (file) {
        preview = URL.createObjectURL(file) 
    }
    return (
        <div>
            <img src={preview} />
        </div>
    )
}