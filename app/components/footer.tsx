'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Footer() {
  const [message, setMessage] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  
  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-IN', { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      });
      setCurrentTime(time);
    };
    
    // Update immediately
    updateTime();
    
    // Then update every second
    const interval = setInterval(updateTime, 1000);
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) return
    
    try {
      // Replace this URL with your Discord webhook URL
      const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1374947160637837312/HicbIOeF6NMG3vfMq2CCD_HTWmB31Pierc6qgWrsYh_dbJmBpaLnQUwlT95XpBEuD0hR'
      
      if (!webhookUrl) {
        console.error('Discord webhook URL not configured')
        return
      }
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: message
        }),
      })
      
      if (response.ok) {
        setMessage('')
        setShowSuccess(true)
        console.log('Message sent to Discord')
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      } else {
        console.error('Failed to send message to Discord')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <footer className="border-t border-neutral-200 py-16 mt-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-neutral-900">🍉 Other Links</h3>
              <ul className="space-y-2 underline text-neutral-600 font-medium">
                <li><Link href="/workspace" className="hover:text-neutral-900">Workspace</Link></li>
                <li><Link href="https://layers.to/arjvnz" className="hover:text-neutral-900">Layers</Link></li>
                <li><Link href="https://buymeacoffee.com/nermalcat69" className="hover:text-neutral-900">Buy me a Coffee</Link></li>
                <li><Link href="https://discord.gg/cW5Twgmyrt" className="hover:text-neutral-900">Discord Server</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-neutral-900">Socials</h3>
              <ul className="space-y-2 underline text-neutral-600 font-medium">
                <li><a href="https://x.com/arjvnz" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">X(Twitter)</a></li>
                <li><a href="https://github.com/nermalcat69" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">GitHub</a></li>
                <li><a href="https://hardcover.app/@arjunaditya" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">Hardcover</a></li>
                <li><a href="https://www.linkedin.com/in/nermalcat69/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900">LinkedIn</a></li>
              </ul>
            </div>
          </div>
            <p className="pt-5"> 🇮🇳 India &bull; {currentTime} IST</p>
          </div>
          <div>
            <div className="max-w-md">
              <h2 className="text-md font-bold mb-4 text-neutral-800">Send a Message</h2>
              <p className="mb-6 text-neutral-800">Drop a message directly to my Discord server(this is a webhook).</p>
              
              <form onSubmit={handleSubmit} className="w-full max-w-xs">
                <div className="relative border-none bg-white">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={5}
                    className="w-full h-full p-3 text-sm resize-none focus:outline-none border-neutral-400 focus:border-red-950 text-neutral-800"
                    maxLength={300}
                  />
                </div>
                {showSuccess && (
                  <div className="mt-2 p-2 bg-green-100 text-green-700 text-sm rounded">
                    Message sent successfully! Thanks for reaching out.
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-neutral-800 text-white py-2 mt-2 hover:bg-neutral-700 transition-colors"
                  aria-label="Submit message"
                >
                  Submit
                </button>
                <p className="mt-2 text-xs text-neutral-500">
                  Max 300 characters.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
