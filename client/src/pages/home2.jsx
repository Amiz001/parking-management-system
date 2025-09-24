import { useState } from 'react';
import { Menu, X, Zap, Users } from 'lucide-react';

export default function DigitalAgencyLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="relative z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">DigitalX</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Business</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
            </nav>

            <div className="hidden md:block">
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
                Login
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="px-6 py-4 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Business</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">Features</a>
              <a href="#" className="block text-gray-700 hover:text-blue-600 font-medium">About</a>
              <button className="w-full bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium mt-4">
                Login
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Building<br />
                  Brands for the<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
                    Digital World
                  </span>
                </h1>
                
                <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                  We help brands grow through innovative design, 
                  cutting-edge development, and strategic digital 
                  marketing.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-colors">
                  Get Started
                </button>
                <button className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-3 rounded-full font-medium transition-colors bg-white/50 backdrop-blur-sm">
                  More Details
                </button>
              </div>

              {/* Service Tags */}
              <div className="bg-gray-900 rounded-3xl p-8 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                  <button className="border border-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    UI/UX Design
                  </button>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                    Web Design
                  </button>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                    Social Media
                  </button>
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors">
                    Mobile Apps
                  </button>
                  <button className="border border-gray-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    E-commerce
                  </button>
                  <button className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                    Analytics
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="relative">
              {/* Main Card with VR Person */}
              <div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl overflow-hidden h-96 lg:h-[500px]">
                {/* Discover Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                    <span>DISCOVER THE MAGIC OF VR</span>
                  </div>
                </div>

                {/* VR Person Image Placeholder */}
                <div className="absolute bottom-0 right-8 w-80 h-80 lg:w-96 lg:h-96">
                  <div className="w-full h-full bg-gradient-to-t from-gray-800/20 to-transparent rounded-t-full flex items-end justify-center">
                    {/* Person silhouette with VR headset */}
                    <div className="w-48 h-64 lg:w-56 lg:h-72 bg-gray-800/70 rounded-t-full relative mb-8">
                      {/* VR Headset */}
                      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gray-700 rounded-xl">
                        <div className="absolute inset-2 bg-gray-600 rounded-lg"></div>
                        <div className="absolute top-2 left-4 w-6 h-3 bg-blue-400 rounded-sm"></div>
                        <div className="absolute top-2 right-4 w-6 h-3 bg-blue-400 rounded-sm"></div>
                      </div>
                      
                      {/* Head */}
                      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-200 rounded-full"></div>
                      
                      {/* Hair */}
                      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-amber-800 rounded-t-full"></div>
                      
                      {/* Body */}
                      <div className="absolute top-40 left-1/2 transform -translate-x-1/2 w-24 h-32 bg-gray-900 rounded-t-2xl"></div>
                      
                      {/* Arms */}
                      <div className="absolute top-44 left-6 w-6 h-20 bg-amber-200 rounded-full transform -rotate-12"></div>
                      <div className="absolute top-44 right-6 w-6 h-20 bg-amber-200 rounded-full transform rotate-12"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-8 left-8">
                  <div className="grid grid-cols-8 gap-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white/30 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute -bottom-8 -left-8 bg-gray-900 text-white rounded-2xl p-6 shadow-xl">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="text-2xl font-bold">5100+</div>
                    <div className="text-gray-400 text-sm">New Users</div>
                  </div>
                  
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
                    Join now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}