
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Play, Youtube, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface VideoShort {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  duration: string;
  trending: boolean;
}

export const SpotlightsSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const shorts: VideoShort[] = [
    {
      id: "1",
      title: "Epic Cricket Shot Compilation",
      thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "1.2M",
      duration: "0:58",
      trending: true
    },
    {
      id: "2",
      title: "Football Skills Training",
      thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "890K",
      duration: "0:45",
      trending: false
    },
    {
      id: "3",
      title: "Tennis Ace Moments",
      thumbnail: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "654K",
      duration: "1:12",
      trending: true
    },
    {
      id: "4",
      title: "Basketball Dunks Highlights",
      thumbnail: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "2.1M",
      duration: "0:52",
      trending: true
    },
    {
      id: "5",
      title: "Swimming Technique Tips",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "456K",
      duration: "1:05",
      trending: false
    },
    {
      id: "6",
      title: "Badminton Smash Compilation",
      thumbnail: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "723K",
      duration: "0:38",
      trending: true
    },
    {
      id: "7",
      title: "Hockey Speed Training",
      thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "332K",
      duration: "0:41",
      trending: false
    },
    {
      id: "8",
      title: "Golf Perfect Swing",
      thumbnail: "https://images.unsplash.com/photo-1587174486073-ae5e5cec4691?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      views: "287K",
      duration: "0:35",
      trending: true
    }
  ];

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    window.open("https://www.youtube.com/@khelmanch_official/shorts", "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Khelmanch Shorts</h2>
        <Badge variant="secondary" className="text-xs bg-red-500/20 text-red-400 border-red-500/30 flex items-center gap-1">
          <Youtube className="h-3 w-3" />
          Trending
        </Badge>
      </div>

      {/* Horizontal scrollable container */}
      <div className="relative">
        <div 
          className="overflow-x-auto pb-4 -mx-4 px-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <style>
            {`
              .shorts-horizontal-container::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div className="flex gap-3 shorts-horizontal-container" style={{ minWidth: "max-content" }}>
            {shorts.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0 w-32 cursor-pointer group"
                onClick={() => handleVideoClick(video.id)}
              >
                {/* Thumbnail */}
                <div className="relative w-32 h-44 rounded-lg overflow-hidden mb-2">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" fill="currentColor" />
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/70 text-white border-0 text-xs px-1 py-0 h-auto">
                      {video.duration}
                    </Badge>
                  </div>

                  {/* Trending Badge */}
                  {video.trending && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500/80 text-white border-0 text-xs flex items-center gap-1 px-1 py-0 h-auto">
                        <TrendingUp className="h-2 w-2" />
                      </Badge>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="space-y-1">
                  <h3 className="text-white font-medium text-xs line-clamp-2 leading-tight">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{video.views} views</span>
                    <div className="flex items-center space-x-1">
                      <Youtube className="h-2.5 w-2.5 text-red-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
