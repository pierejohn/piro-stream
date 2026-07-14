import React from 'react'
import { FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#030e20] border-t border-[#123055]">
      <div className="app-container py-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          {/* Left Side */}
          <a
            href="https://www.linkedin.com/in/piere-john-b0a222237"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white duration-300"
          >
            <FaLinkedin className="text-blue-500" />
            Piere John
          </a>

          {/* Right Side */}
          <div className="text-sm text-gray-400 sm:text-right">
            <p>Used APIs: TMDB API • YouTube Embed</p>
            <p>Video Provider: Vaplayer</p>
            <p className="text-xs text-gray-500 mt-1">
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}