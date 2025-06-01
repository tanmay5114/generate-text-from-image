import { useFileStore } from "@/store"

export default function FilePreview() {
    const { tempPreview } = useFileStore();

    return (
        <div className="flex flex-col justify-center gap-4 p-3">
            {tempPreview.length > 0
                ? tempPreview.map((item) => {
                    return <img key={item.slice(-3)} src={item} className="p-4"/>
                })
                : <div>Upload the image fast...</div>

            }
        </div>
    )
}