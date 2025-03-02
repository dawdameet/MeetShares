"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      const downloadLink = `${window.location.origin}/api/download?file=${data.filename}`;
      alert(`File uploaded! Download here: ${downloadLink}`);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <input type="file" onChange={handleFileChange} className="block w-full" />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
