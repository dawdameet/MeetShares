import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">File Sharing App</h1>
      <FileUpload />
    </div>
  );
}
