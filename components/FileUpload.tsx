"use client";

import { useState } from "react";
import { FaCloudUploadAlt, FaCheck, FaCopy } from "react-icons/fa";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    setCopied(false);
    setDownloadLink(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      const link = `${window.location.origin}/api/download?file=${data.filename}`;
      setDownloadLink(link);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleCopy = () => {
    if (downloadLink) {
      navigator.clipboard.writeText(downloadLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg text-center space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Upload a File</h2>

      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
        <FaCloudUploadAlt className="text-4xl text-gray-400 group-hover:text-blue-500" />
        <p className="mt-2 text-sm text-gray-500">Click to browse or drag & drop</p>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {file && (
        <p className="text-gray-700 text-sm">
          Selected: <span className="font-medium">{file.name}</span>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-2 text-white rounded-lg ${
          uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } transition`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {downloadLink && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
          <p className="truncate">{downloadLink}</p>
          <button onClick={handleCopy} className="ml-2 text-green-700 hover:text-green-900">
            {copied ? <FaCheck /> : <FaCopy />}
          </button>
        </div>
      )}
    </div>
  );
}
