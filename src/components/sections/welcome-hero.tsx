
import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export function WelcomeHero() {
  return (
    <div className="space-y-6">
      {/* User Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-500">Hello,</h1>
          <h2 className="text-xl font-semibold">Jatin!</h2>
        </div>
      </div>

      {/* Featured Tournament Card */}
      <Link 
        to="/tournaments/respawn-cup"
        className="block relative overflow-hidden rounded-2xl bg-[#1E2539] h-48"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E2539] to-transparent z-10" />
        <div className="relative z-20 p-6 flex flex-col h-full justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-white text-xs">
              Featured Tournament
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">
              ReSpawn Cup 2.0
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Vasant Kunj, New Delhi
            </p>
          </div>
          
          <button className="self-start px-4 py-2 rounded-lg bg-[#DFE61C] text-[#1E2539] text-sm font-medium">
            View Details
          </button>
        </div>
        
        {/* Tournament Winner Image */}
        <div className="absolute right-4 bottom-4 z-20">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#DFE61C]">
            <img 
              src="/lovable-uploads/c76e1b08-2001-4139-b4b8-fe8e25d22399.png" 
              alt="Tournament Winner"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
