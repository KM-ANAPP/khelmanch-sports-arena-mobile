
export const SpotlightsSection = () => {
  const videos = [
    { id: 1, thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211" },
    { id: 2, thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211" },
    { id: 3, thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211" },
    { id: 4, thumbnail: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211" },
  ];

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Spotlights Archive</h2>
      <div className="grid grid-cols-2 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <img src={video.thumbnail} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
