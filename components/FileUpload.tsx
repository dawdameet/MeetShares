"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaCheck, FaCopy, FaFile, FaFilePdf, FaFileWord, FaFileExcel, FaFileArchive, FaFileAlt, FaFileVideo, FaFileAudio, FaFileCode } from "react-icons/fa";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string>("");

  // Handle file preview generation
  useEffect(() => {
    if (!file) {
      setPreview(null);
      setFileType("");
      return;
    }

    // Determine file type
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    setFileType(extension);

    // Only create previews for image files
    if (!file.type.startsWith('image/')) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Free memory when component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

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
      return <FaFile className="text-5xl text-blue-500" />;
    } else if (extension === 'pdf') {
      return <FaFilePdf className="text-5xl text-red-500" />;
    } else if (['doc', 'docx'].includes(extension)) {
      return <FaFileWord className="text-5xl text-blue-600" />;
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      return <FaFileExcel className="text-5xl text-green-600" />;
    } else if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
      return <FaFileArchive className="text-5xl text-amber-600" />;
    } else if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'].includes(extension)) {
      return <FaFileVideo className="text-5xl text-purple-500" />;
    } else if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
      return <FaFileAudio className="text-5xl text-pink-500" />;
    } else if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml', 'py', 'java', 'c', 'cpp'].includes(extension)) {
      return <FaFileCode className="text-5xl text-gray-700" />;
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

  // Get file type label
  const getFileTypeLabel = () => {
    if (!fileType) return '';
    
    const typeMap: {[key: string]: string} = {
      pdf: 'PDF Document',
      doc: 'Word Document',
      docx: 'Word Document',
      xls: 'Excel Spreadsheet',
      xlsx: 'Excel Spreadsheet',
      ppt: 'PowerPoint',
      pptx: 'PowerPoint',
      jpg: 'JPEG Image',
      jpeg: 'JPEG Image',
      png: 'PNG Image',
      gif: 'GIF Image',
      svg: 'SVG Image',
      mp3: 'Audio File',
      mp4: 'Video File',
      zip: 'Archive',
      rar: 'Archive',
      txt: 'Text File',
    };
    
    return typeMap[fileType] || `${fileType.toUpperCase()} File`;
  };
  
  // Get file type background color
  const getFileTypeColor = () => {
    if (!fileType) return 'bg-gray-100';
    
    const colorMap: {[key: string]: string} = {
      pdf: 'bg-red-100',
      doc: 'bg-blue-100',
      docx: 'bg-blue-100',
      xls: 'bg-green-100',
      xlsx: 'bg-green-100',
      ppt: 'bg-orange-100',
      pptx: 'bg-orange-100',
      jpg: 'bg-blue-100',
      jpeg: 'bg-blue-100',
      png: 'bg-blue-100',
      gif: 'bg-purple-100',
      svg: 'bg-indigo-100',
      mp3: 'bg-pink-100',
      mp4: 'bg-purple-100',
      zip: 'bg-amber-100',
      rar: 'bg-amber-100',
      txt: 'bg-gray-100',
    };
    
    return colorMap[fileType] || 'bg-gray-100';
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-xl text-center space-y-6 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Share Your Files Securely
      </h2>

      {!file ? (
        <div 
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <FaCloudUploadAlt className="text-5xl text-gray-400" />
          
          <p className="mt-3 text-sm text-gray-600">
            Click to browse or drag & drop
          </p>
          
          <input
            id="fileInput"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="w-full">
          {/* File Preview Section */}
          <div className="mb-4 rounded-xl overflow-hidden border border-gray-200">
            {/* Image Preview */}
            {preview ? (
              <div className="relative w-full pt-[56.25%] bg-gray-50">
                <Image 
                  src={preview} 
                  alt="File preview" 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            ) : (
              /* File Type Icon for non-image files */
              <div className={`py-8 ${getFileTypeColor()} flex flex-col items-center justify-center`}>
                {getFileIcon()}
                <p className="mt-3 text-sm font-medium">{getFileTypeLabel()}</p>
              </div>
            )}
            
            {/* File Info Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t border-gray-200">
              <span className="font-medium text-sm truncate max-w-[60%]">{file.name}</span>
              <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg transition-colors hover:bg-gray-50"
            >
              Change File
            </button>
            
            <button
              onClick={() => document.getElementById('fileInput')?.click()}
              className="hidden"
            >
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </button>
          </div>
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