import { useState } from 'react';
import { Car, MapPin, Clock, Shield, Users, ChevronRight, ChevronDown, Star, Menu, X } from 'lucide-react';
import Logo from '../assets/parkbay.png'

export default function ParkingLandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Can I modify my parking reservation?",
      answer: "Yes, you can modify your parking reservation up to 2 hours before your scheduled time through our app or website."
    },
    {
      question: "Is there an education discount?",
      answer: "We offer special rates for students and educational institutions. Contact our support team for more details."
    },
    {
      question: "Can we add users later?",
      answer: "Absolutely! You can add or remove users from your account at any time through the admin dashboard."
    },
    {
      question: "How are payments processed?",
      answer: "We use secure payment processing with multiple options including credit cards, digital wallets, and monthly billing."
    },
    {
      question: "How do I get support?",
      answer: "Our support team is available 24/7 through live chat, email, or phone. Premium users get priority support."
    },
    {
      question: "Do I need to upgrade?",
      answer: "You can start with our free plan and upgrade as your parking needs grow. We'll recommend the best plan for your usage."
    }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="bg-gray-900 text-white h-100">
        <div className="absolute z-0 -top-200 w-screen h-300 bg-[radial-gradient(circle_at_center,_rgba(79,70,229,0.6),_rgba(59,130,246,0.4),_transparent_50%)]"></div>
        <div className="relative z-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8 text-lg">
              <div className="flex items-center space-x-2 mr-70">
                <img src={Logo} className="w-30"></img>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" className="hover:text-blue-400 transition-colors">Solutions</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Pricing</a>
                <a href="#" className="hover:text-blue-400 transition-colors">Resources</a>
                <a href="#" className="hover:text-blue-400 transition-colors">About</a>
              </nav>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-white hover:text-blue-400 transition-colors cursor-pointer mr-10 text-lg">Log In</button>
              <button className="bg-gradient-to-r from-indigo-600 to-blue-500 px-6 py-2 rounded-lg font-medium transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-57 mb-27 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Redefining How{' '}
                <span className="text-indigo-400">Parking</span>{' '}
                Gets Done
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                AI-Powered Smart Parking with Real-Time Availability, 
                Making Your Business Operations Faster And More Efficient.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center space-x-2">
                <span>Get Started</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <div className=" rounded-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img src='/images/car2.png' className="w-600 ml-20 mb-5"></img>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Partner Logos 
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {['Mall Corp', 'Office Plus', 'City Parks', 'Metro Station', 'Hotel Chain', 'Airport Hub'].map((name, index) => (
              <div key={index} className="text-center">
                <div className="h-8 bg-gray-400 rounded mb-2"></div>
                <span className="text-sm text-gray-600">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>*/}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                25,000+ Trusted Parking Spaces Built on Results
              </h2>
              <p className="text-gray-600 mb-8">
                Trusted by over 25,000 of the world's most successful 
                businesses, our smart parking management 
                solutions help drive business results.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                View Case Studies
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-3xl font-bold text-indigo-600 mb-2">24k+</div>
                <div className="text-gray-600">Daily Reservations</div>
              </div>
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 mb-2">390+</div>
                <div className="text-gray-600">Parking Locations</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                <div className="text-gray-600">Occupancy Rate</div>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600 mb-2">99%</div>
                <div className="text-gray-600">System Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Our Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $0<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium mb-6 hover:bg-gray-800 transition-colors">
                Start for free
              </button>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Up to 10 parking spaces
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Basic mobile app access
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Standard traffic rate projects
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Real reporting
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Integrations
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  API Access
                </li>
              </ul>
            </div>

            {/* Pro Plan - Featured */}
            <div className="bg-gray-900 text-white rounded-2xl p-8 border-2 border-indigo-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-indigo-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="text-4xl font-bold mb-6">
                $9<span className="text-lg font-normal text-gray-300">/month</span>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium mb-6 transition-colors">
                Get started
              </button>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Up to 100 parking spaces
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Advanced mobile app features
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Premium support
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Real storage
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Integrations
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Priority support
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Advanced Analytics
                </li>
              </ul>
            </div>

            {/* Business Plan */}
            <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">
                $19<span className="text-lg font-normal text-gray-600">/month</span>
              </div>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium mb-6 transition-colors">
                Get started
              </button>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Unlimited parking spaces
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Full mobile app access
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  24/7 support
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Advanced account manager
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Premium integrations
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  Custom analytics
                </li>
                <li className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  White-label options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Driving Growth Through Innovation And Expertise
              </h2>
              <p className="text-gray-600 mb-8">
                From smart sensor integration to mobile app development, 
                we deliver end-to-end parking solutions that help 
                businesses grow and thrive in today's fast-paced 
                environment.
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-indigo-600" />
                  <span className="font-medium">Smart Sensor Installation</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Shield className="h-6 w-6 text-indigo-600" />
                  <span className="font-medium">API Integration</span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
              <div className="pl-10 pb-4">
                <p className="text-gray-600 text-sm">
                  Seamless integration with your existing systems through our comprehensive API, 
                  enabling real-time data sync and automated operations.
                </p>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                  <span className="font-medium">Mobile App Development</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-indigo-600" />
                  <span className="font-medium">Custom Analytics Dashboard</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm mb-6">
                Why Satisfied Customers
              </button>
              <h2 className="text-4xl font-bold mb-8">
                Hear From Those We've Helped Grow
              </h2>
              <p className="text-gray-300 mb-8">
                Discover how our solutions have helped businesses 
                streamline their parking operations, reduce costs, and 
                improve customer satisfaction.
              </p>
              <div className="w-16 h-1 bg-indigo-600 rounded"></div>
            </div>
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Chen",
                  role: "Operations Manager",
                  company: "Downtown Mall",
                  content: "ParkSmart reduced our parking management costs by 40% while improving customer satisfaction. The real-time availability feature is a game-changer."
                },
                {
                  name: "Mike Rodriguez",
                  role: "Facility Director", 
                  company: "TechCorp HQ",
                  content: "Implementation was seamless and the support team was incredibly helpful. Our employees love the mobile app reservation system."
                },
                {
                  name: "Lisa Park",
                  role: "Property Manager",
                  company: "Metro Apartments",
                  content: "The analytics dashboard gives us insights we never had before. We can now optimize our parking allocation based on real usage data."
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold">{testimonial.name}</h4>
                        <span className="text-indigo-400">•</span>
                        <span className="text-gray-400 text-sm">{testimonial.role}</span>
                      </div>
                      <p className="text-gray-300 mb-3">{testimonial.content}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Innovate. <span className="text-indigo-400">Deliver</span>. Grow.
              </h2>
              <p className="text-gray-300 mb-6">
                Transform your parking operations with our smart management 
                system. Join thousands of businesses already growing with 
                our solution.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-4">Pages</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Home</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Solutions</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4">Other Pages</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms and Conditions</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Support</a></li>
                  <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2024 ParkSmart. All rights reserved.</p>
          </div>
        </div>
      </section>
    </div>
  );
}