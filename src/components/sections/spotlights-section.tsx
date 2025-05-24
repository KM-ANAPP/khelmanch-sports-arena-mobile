
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Youtube, Zap, TrendingUp } from "lucide-react";
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
    }
  ];

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
    // Open YouTube Shorts channel
    window.open("https://www.youtube.com/@khelmanch_official/shorts", "_blank");
  };

  const handleChannelVisit = () => {
    window.open("https://www.youtube.com/@khelmanch_official/shorts", "_blank");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Khelmanch Shorts</h2>
          <p className="text-gray-300 text-sm">Watch our latest sports highlights and moments</p>
        </div>
        <Button
          onClick={handleChannelVisit}
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 flex items-center space-x-2 transition-all duration-300"
        >
          <Youtube className="h-4 w-4" />
          <span className="text-sm font-semibold">Visit Channel</span>
          <ExternalLink className="h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {shorts.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group cursor-pointer"
            onClick={() => handleVideoClick(video.id)}
          >
            {/* Video Container */}
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              {/* Thumbnail */}
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              
              {/* Modern Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Trending Badge */}
              {video.trending && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500/90 text-white border-0 flex items-center gap-1 font-bold text-xs">
                    <TrendingUp className="h-3 w-3" />
                    Trending
                  </Badge>
                </div>
              )}
              
              {/* Duration */}
              <div className="absolute top-3 right-3">
                <Badge className="bg-black/70 text-white border-0 text-xs font-medium backdrop-blur-sm">
                  {video.duration}
                </Badge>
              </div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300"
                >
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </motion.div>
              </div>
              
              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-gray-300">
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Youtube className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-gray-300">Shorts</span>
                  </div>
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Subscribe CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-6"
      >
        <Button
          onClick={handleChannelVisit}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-8 py-3 font-semibold transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
          <div className="flex items-center space-x-2 relative z-10">
            <Youtube className="h-5 w-5" />
            <span>Subscribe to Khelmanch</span>
            <Zap className="h-4 w-4" />
          </div>
        </Button>
      </motion.div>
    </motion.section>
  );
};
