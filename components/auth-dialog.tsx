"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthDialog({ isOpen, onClose }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    onClose()
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: "", email: "", password: "" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-5xl h-[700px] transform transition-all">
          {/* Background Image - Full Width */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
              src="/about.jpg"
              alt="Hotel Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/40 via-stone-800/30 to-transparent" />
          </div>

          {/* Left Side Content */}
          <div className="absolute left-0 top-0 h-full w-1/2 flex flex-col justify-center p-16 text-white z-10">
            <div className="flex items-center mb-12">
              <div className="w-10 h-8 border-2 border-white rounded mr-4 flex items-center justify-center">
                <div className="w-6 h-4 bg-white rounded-sm opacity-80" />
              </div>
              <span className="text-xl font-medium tracking-widest">ANAVRIN STAYS</span>
            </div>

            <h1 className="text-6xl font-light leading-tight">
              {"Let's book your"}
              <br />
              {"perfect stay"}
            </h1>
          </div>

          {/* Curved White Overlay Form */}
          <div className="absolute right-0 top-0 h-full w-2/3 z-20 rounded-sm">
            {/* SVG Curved Shape */}
            <svg className="absolute inset-0 w-full h-full rounded-lg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <clipPath id="curvedClip">
                  <path d="M 25,0 Q 15,20 20,40 Q 12,60 25,80 Q 20,90 30,100 L 100,100 L 100,0 Z" />
                </clipPath>
              </defs>
              <rect width="100%" height="100%" fill="white" clipPath="url(#curvedClip)" />
            </svg>

            {/* Form Content */}
            <div className="absolute inset-0 flex items-center justify-center rounded-sm">
              <div className="w-full max-w-sm px-8 py-12 ml-16 rounded-sm">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-30"
                >
                  <X size={24} className="text-gray-600" />
                </button>

                <div className="space-y-8">
                  <div>
                    <h2 className="text-4xl font-semibold text-gray-900 mb-12">{isLogin ? "Log In" : "Sign Up"}</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    {!isLogin && (
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 text-gray-700 placeholder-gray-500 focus:border-gray-700 focus:outline-none text-lg font-light"
                          required={!isLogin}
                        />
                      </div>
                    )}

                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 text-gray-700 placeholder-gray-500 focus:border-gray-700 focus:outline-none text-lg font-light"
                        required
                      />
                    </div>

                    <div className="relative">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full border-0 border-b-2 border-gray-300 rounded-none bg-transparent px-0 py-4 text-gray-700 placeholder-gray-500 focus:border-gray-700 focus:outline-none text-lg font-light"
                        required
                      />
                    </div>

                    <div className="pt-8">
                      <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        {isLogin ? "Log In" : "Sign Up"}
                      </button>
                    </div>
                  </form>

                  <div className="text-center pt-4">
                    <p className="text-gray-600 text-base">
                      {isLogin ? "Don't have an account? " : "Already have an account? "}
                      <button
                        onClick={toggleMode}
                        className="text-amber-600 hover:text-amber-700 font-medium transition-colors underline-offset-2 hover:underline"
                      >
                        {isLogin ? "Sign Up" : "Log in"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
