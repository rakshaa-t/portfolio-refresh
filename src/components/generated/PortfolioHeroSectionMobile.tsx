import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Menu, X } from "lucide-react";

type RakshaPortfolioMobileProps = Record<string, never>;

const SUGGESTION_PILLS = [{
  id: 1,
  text: "tell me more about ova"
}, {
  id: 2,
  text: "what is your design process?"
}, {
  id: 3,
  text: "what tools do you use?"
}] as const;

const PROJECT_CARDS = [{
  id: 1,
  title: "ova : period tracking app",
  gradient: "from-blue-100 via-purple-100 to-pink-100",
  bgGradient: "from-blue-200 to-purple-200"
}, {
  id: 2,
  title: "greex : defi trading platform",
  gradient: "from-gray-800 to-gray-900",
  bgGradient: "from-gray-700 to-black"
}, {
  id: 3,
  title: "ioc : vendor management app",
  gradient: "from-white to-gray-100",
  bgGradient: "from-gray-50 to-gray-200"
}, {
  id: 4,
  title: "dealdoc : deal management...",
  gradient: "from-blue-400 to-blue-600",
  bgGradient: "from-blue-500 to-blue-700"
}] as const;

export const RakshaPortfolioMobile = (props: RakshaPortfolioMobileProps) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#D8D4E8] overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute w-[800px] h-[400px] -left-[100px] top-[150px] bg-[rgba(0,132,255,0.1)] rounded-[4444px] blur-[100px] pointer-events-none" />
      <div className="absolute w-[800px] h-[400px] left-[200px] top-[400px] bg-white rounded-[4444px] blur-[100px] pointer-events-none" />

      {/* Mobile Header */}
      <div className="relative z-50 px-5 pt-6 pb-3">
        <div className="flex items-center justify-between">
          <div className="text-[20px] font-semibold text-[#4F5CFF]">
            <span>raks</span>
          </div>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/60" 
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-[#4F5CFF]" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5 text-[#4F5CFF]" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-16 left-4 right-4 z-40 bg-white/80 backdrop-blur-md rounded-3xl border border-white/60 shadow-xl p-6"
        >
          <div className="flex flex-col gap-4">
            <button className="text-left text-[16px] font-medium text-gray-900 py-2">
              <span>chat</span>
            </button>
            <button className="text-left text-[16px] font-medium text-gray-900/50 py-2">
              <span>inbox</span>
            </button>
            <button className="text-left text-[16px] font-medium text-gray-900/50 py-2">
              <span>calendar</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Content Container */}
      <div className="relative w-full px-5 pt-4">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-6"
        >
          <h1 className="text-[22px] leading-[1.3] font-bold text-[#4F5CFF] mb-2 px-2">
            <span>End-To-End Product Design, Frontend development and Branding.</span>
          </h1>
          <p className="text-[13px] leading-[1.5] text-gray-600 font-normal px-2">
            <span>Visually stunning apps, softwares and websites with functionality at it's core.</span>
          </p>
        </motion.div>

        {/* Chat Interface Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative w-full bg-gradient-to-b from-[#E9E8FF] to-[#EFF4EC] rounded-[28px] border-2 border-white overflow-hidden mb-6"
          style={{ boxShadow: '0px 40px 80px rgba(0, 0, 0, 0.08)' }}
        >
          {/* Inner Background Blurs */}
          <div className="absolute w-[300px] h-[200px] left-1/2 bottom-[-50px] -translate-x-1/2 translate-x-[100px] bg-[rgba(101,73,255,0.14)] rounded-[4444px] blur-[60px] pointer-events-none" />
          <div className="absolute w-[350px] h-[200px] left-1/2 top-[100px] -translate-x-1/2 -translate-x-[80px] bg-gradient-to-r from-[rgba(255,255,255,0.88)] to-[rgba(255,255,255,0.1936)] rounded-[4444px] blur-[60px] pointer-events-none" />

          <div className="relative px-4 py-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[15px] leading-[22px] font-light text-black" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                <span>hey i'm raks</span>
              </span>
              <span className="text-[11px] leading-[16px] font-normal text-black/[0.22]" style={{ fontFamily: 'Nexa, system-ui, sans-serif' }}>
                <span>contact@rakshaaa.com</span>
              </span>
            </div>

            {/* First Chat Bubble - White */}
            <div className="relative">
              <svg width="100%" height="auto" viewBox="0 0 572 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="whiteBubbleFilterMobile" x="0" y="0" width="770" height="486" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="15" />
                    <feGaussianBlur stdDeviation="17" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.04 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="62" />
                    <feGaussianBlur stdDeviation="31" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.03 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="139" />
                    <feGaussianBlur stdDeviation="42" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.02 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="248" />
                    <feGaussianBlur stdDeviation="49.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.01 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow" result="effect4_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow" result="shape" />
                  </filter>
                </defs>
                <g filter="url(#whiteBubbleFilterMobile)">
                  <path d="M0 88C0 46.5164 0 25.7746 12.887 12.8873C25.775 0 46.516 0 88 0H512C526.884 0 534.326 0 540.396 1.7823C554.763 6.0009 565.999 17.2365 570.218 31.6038C572 37.6738 572 45.1158 572 60C572 74.8842 572 82.326 570.218 88.396C565.999 102.763 554.763 113.999 540.396 118.218C534.326 120 526.884 120 512 120H0V88Z" fill="white" />
                </g>
              </svg>
              
              {/* Message Content Overlay */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center px-4 gap-3">
                <div className="relative w-[48px] h-[48px] flex-shrink-0 rounded-full overflow-hidden bg-[#D9D9D9]">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Profile" className="absolute w-full h-full object-cover" />
                </div>
                <p className="flex-1 text-[13px] leading-[19px] font-extralight text-black" style={{ fontFamily: 'Nexa Text, system-ui, sans-serif' }}>
                  <span>you can ask me here about my design process, my past projects or just get to know me better!</span>
                </p>
              </div>
            </div>

            {/* Second Chat Bubble - Dark */}
            <div className="relative ml-auto max-w-[85%]">
              <svg width="100%" height="auto" viewBox="0 0 492 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="darkBubbleFilterMobile" x="0" y="0" width="690" height="436" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="15" />
                    <feGaussianBlur stdDeviation="17" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.04 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="62" />
                    <feGaussianBlur stdDeviation="31" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.03 0" />
                    <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="139" />
                    <feGaussianBlur stdDeviation="42" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.02 0" />
                    <feBlend mode="normal" in2="effect2_dropShadow" result="effect3_dropShadow" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="248" />
                    <feGaussianBlur stdDeviation="49.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.156863 0 0 0 0 0.247059 0 0 0 0 0.894118 0 0 0 0.01 0" />
                    <feBlend mode="normal" in2="effect3_dropShadow" result="effect4_dropShadow" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow" result="shape" />
                  </filter>
                </defs>
                <g filter="url(#darkBubbleFilterMobile)">
                  <path d="M0 35C0 15.67 15.67 0 35 0H448C472.301 0 492 19.6995 492 44V70H35C15.67 70 0 54.33 0 35Z" fill="black" fillOpacity="0.79" />
                </g>
              </svg>
              
              {/* Text overlay */}
              <div className="absolute top-0 left-0 w-full h-[70px] flex items-center justify-center px-5">
                <p className="text-[13px] leading-[18px] font-light text-white text-center" style={{ fontFamily: 'Nexa Text, system-ui, sans-serif' }}>
                  <span>Hi raksha can u tell me a bit about yourself</span>
                </p>
              </div>
            </div>

            {/* Bottom Section - Suggestions + Input */}
            <div className="flex flex-col items-center gap-3 pt-2">
              {/* Suggestion Pills */}
              <div className="w-full flex flex-wrap items-center justify-center gap-2 px-1">
                {SUGGESTION_PILLS.map(pill => {
                  return (
                    <button 
                      key={pill.id} 
                      className="relative hover:opacity-80 transition-opacity px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                    >
                      <span className="text-[11px] leading-[16px] font-normal text-black/[0.64] text-center whitespace-nowrap" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        <span>{pill.text}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Input Bar */}
              <div 
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-full border border-white/60" 
                style={{
                  background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.44) 100%)',
                  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.08)'
                }}
              >
                {/* Left: Sparkle Icon + "Talk 2 me" */}
                <div className="flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="sparkleGrad" x1="13.1508" y1="41.999" x2="12.8493" y2="16.0008" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#283FE4" stopOpacity="0.38" />
                        <stop offset="1" stopColor="white" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M16.6562 25.2121L14.3939 19.5118C13.893 18.2498 12.1067 18.2496 11.6056 19.5116L9.34196 25.2121C9.31836 25.2714 9.27155 25.3182 9.21228 25.3418L3.51087 27.6058C2.24898 28.1069 2.24898 29.8929 3.51087 30.394L9.21228 32.658C9.27155 32.6816 9.31836 32.7284 9.34196 32.7876L11.6055 38.4882C12.1067 39.7502 13.8929 39.75 14.3939 38.4879L16.6562 32.7876C16.6799 32.7282 16.7273 32.6815 16.7868 32.658L22.4888 30.394C23.7507 29.893 23.7507 28.1068 22.4888 27.6058L16.7868 25.3418C16.7273 25.3183 16.6799 25.2716 16.6562 25.2121Z" 
                      fill="url(#sparkleGrad)" 
                      transform="scale(0.42) translate(3, -28)" 
                    />
                  </svg>

                  <span className="text-[13px] leading-[19px] font-normal text-black/[0.44]" style={{ fontFamily: 'system-ui, sans-serif' }}>
                    <span>Talk 2 me</span>
                  </span>
                </div>

                {/* Right: Send Button */}
                <button 
                  className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center hover:shadow-lg transition-shadow flex-shrink-0" 
                  style={{ boxShadow: '-10px 12px 8px rgba(40, 63, 228, 0.04)' }} 
                  aria-label="Send message"
                >
                  <ArrowUp className="w-[18px] h-[18px] text-[#283FE4]" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 gap-4 pb-8"
        >
          {PROJECT_CARDS.map(project => {
            return (
              <div 
                key={project.id} 
                className="group relative bg-white/30 backdrop-blur-sm border border-white/60 rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-[14px] text-gray-900 font-normal leading-[20px]">
                      <span>{project.title}</span>
                    </h2>
                    <button 
                      className="w-[32px] h-[32px] bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/40 transition-colors flex-shrink-0" 
                      aria-label={`View ${project.title}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="#4F5CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className={`w-full aspect-[4/3] bg-gradient-to-br ${project.gradient} rounded-[20px] border border-white/40 overflow-hidden`}>
                    <div className={`w-full h-full bg-gradient-to-br ${project.bgGradient}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

