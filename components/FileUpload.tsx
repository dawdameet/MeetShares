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
    <div className="p-8 max-w-lg mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl text-center space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
        Upload Your File
      </h2>

      <label
        className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          file
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
      >
        <FaCloudUploadAlt
          className={`text-5xl transition-colors duration-300 ${
            file ? "text-blue-500" : "text-gray-400 group-hover:text-blue-400"
          }`}
        />
        <p className="mt-3 text-sm text-gray-600">
          {file ? "Ready to upload!" : "Click to browse or drag & drop"}
        </p>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {file && (
        <p className="text-gray-700 text-sm flex items-center justify-center space-x-2">
          <span className="font-medium truncate max-w-xs">{file.name}</span>
          <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Now"}
      </button>

      {downloadLink && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center justify-between shadow-sm transition-all duration-300 hover:shadow-md">
          <p className="text-sm truncate max-w-[80%]">{downloadLink}</p>
          <button
            onClick={handleCopy}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
          >
            {copied ? (
              <FaCheck className="text-green-600" />
            ) : (
              <FaCopy className="text-green-700" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}