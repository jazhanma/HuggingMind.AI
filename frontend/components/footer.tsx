import { LinkedinIcon } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Logo className="h-5 w-5" />
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} HuggingMind AI. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Founder and Developer: Jaskaran Singh</span>
            <a
              href="https://linkedin.com/in/jaskaran-singh-199780222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-gray-600 hover:text-yellow-500 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
