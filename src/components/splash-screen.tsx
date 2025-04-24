
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function SportySplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress((prev) => Math.min(prev + 1, 100))
      } else {
        setTimeout(() => {
          setLoading(false)
          if (onComplete) onComplete()
        }, 500)
      }
    }, 30)

    return () => clearTimeout(timer)
  }, [progress, onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-600 to-blue-700 z-50"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
        >
          <div className="relative w-full max-w-md flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.5 },
              }}
              className="relative mb-8"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-white/20"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.2, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10 bg-white rounded-full p-6 shadow-xl">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M12 2L4 6V12C4 15.31 7.58 20 12 22C16.42 20 20 15.31 20 12V6L12 2Z"
                    stroke="#0284c7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M12 11C10.9 11 10 11.9 10 13C10 14.1 10.9 15 12 15C13.1 15 14 14.1 14 13C14 11.9 13.1 11 12 11Z"
                    fill="#0284c7"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                </svg>
              </div>
            </motion.div>

            <div className="mb-8 text-center">
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                KHEL<span className="text-yellow-300">MANCH</span>
              </motion.h1>
              <motion.p
                className="text-white/80 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Your ultimate sports destination
              </motion.p>
            </div>

            <motion.div
              className="w-64 h-1.5 bg-white/20 rounded-full overflow-hidden mb-4"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "16rem", opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-yellow-300 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.div
              className="flex items-center text-white/80 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              <span>Loading experience {progress}%</span>
            </motion.div>

            <div className="absolute inset-0 pointer-events-none">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-white/30"
                  style={{
                    width: Math.random() * 60 + 20,
                    height: Math.random() * 60 + 20,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{
                    scale: 0,
                    opacity: 0,
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                  }}
                  animate={{
                    scale: Math.random() * 0.4 + 0.6,
                    opacity: Math.random() * 0.3 + 0.1,
                    x: Math.random() * 200 - 100,
                    y: Math.random() * 200 - 100,
                  }}
                  transition={{
                    duration: Math.random() * 5 + 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
