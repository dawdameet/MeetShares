"use client";

import { useState } from "react";
import { FaCloudUploadAlt, FaCheck, FaCopy, FaFile, FaImage, FaFilePdf, FaFileWord, FaFileExcel, FaFileAlt } from "react-icons/fa";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    // Reset states when new file is selected
    setDownloadLink(null);
    setCopied(false);
    setUploadProgress(0);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setDownloadLink(null);
      setCopied(false);
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file!");

    setUploading(true);
    setCopied(false);
    setDownloadLink(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Simulate upload progress (in a real app, you'd use XMLHttpRequest with progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const increment = Math.floor(Math.random() * 15) + 5;
          const newProgress = Math.min(prev + increment, 95);
          return newProgress;
        });
      }, 300);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");

      const link = `${window.location.origin}/api/download?file=${data.filename}`;
      setDownloadLink(link);
    } catch (error) {
      alert(`Error: ${(error as Error).message}`);
      setUploadProgress(0);
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

  const getFileIcon = () => {
    if (!file) return <FaCloudUploadAlt className="text-5xl text-gray-400" />;
    
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
      return <FaImage className="text-5xl text-blue-500" />;
    } else if (extension === 'pdf') {
      return <FaFilePdf className="text-5xl text-red-500" />;
    } else if (['doc', 'docx'].includes(extension)) {
      return <FaFileWord className="text-5xl text-blue-600" />;
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      return <FaFileExcel className="text-5xl text-green-600" />;
    } else {
      return <FaFileAlt className="text-5xl text-amber-500" />;
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-xl text-center space-y-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Share Your Files Securely
      </h2>

      <div 
        className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
          file
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {getFileIcon()}
        
        <p className="mt-3 text-sm text-gray-600">
          {file ? "File selected" : "Click to browse or drag & drop"}
        </p>
        
        {file && (
          <div className="absolute bottom-0 left-0 right-0 bg-blue-500 bg-opacity-10 p-2">
            <p className="text-xs text-blue-700 font-medium truncate">
              {file.name}
            </p>
          </div>
        )}
        
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {file && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <FaFile className="text-gray-500 mr-2" />
            <span className="font-medium text-sm truncate max-w-xs">{file.name}</span>
          </div>
          <span className="text-xs text-gray-500 ml-2">{formatFileSize(file.size)}</span>
        </div>
      )}

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
          <p className="text-xs text-gray-500 mt-1">{uploadProgress}% uploaded</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition-all duration-200 ${
          !file || uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg active:scale-98"
        }`}
      >
        {uploading ? "Uploading..." : downloadLink ? "Upload Another File" : "Upload Now"}
      </button>

      {downloadLink && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-4 rounded-lg flex flex-col items-center gap-3 shadow-sm transition-all duration-300 animate-fadeIn">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full mb-1">
            <FaCheck className="text-green-600" />
          </div>
          
          <p className="text-sm font-medium text-green-700">Your file is ready to share!</p>
          
          <div className="w-full flex items-center justify-between bg-white border border-green-200 rounded-lg px-3 py-2">
            <p className="text-xs text-gray-600 truncate max-w-[80%]">{downloadLink}</p>
            <button
              onClick={handleCopy}
              className="p-2 rounded-full hover:bg-green-100 transition-colors duration-200"
              aria-label="Copy link"
            >
              {copied ? (
                <FaCheck className="text-green-600 text-sm" />
              ) : (
                <FaCopy className="text-green-700 text-sm" />
              )}
            </button>
          </div>
          
          <p className="text-xs text-gray-500">
            This link will expire in 24 hours
          </p>
        </div>
      )}
    </div>
  );
}