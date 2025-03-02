import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="w-full p-6 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </span>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">MeetShares</h1>
          </div>
          
         
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-6xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Secure File Sharing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your files and share them instantly with anyone. No registration required.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 flex">
          <div className="col-span-2">
            <FileUpload />
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col justify-center ">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Why Choose Us?</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">Simple drag & drop interface</span>
              </li>
              
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">End-to-end encryption</span>
              </li>
              
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">Files expire after 24 hours</span>
              </li>
              
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">No registration needed</span>
              </li>
              
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">Works on all devices</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg font-medium transition-colors hover:bg-blue-50">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="w-full bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 MeetShares. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}