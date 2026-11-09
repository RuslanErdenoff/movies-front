export function YoutubePlayer({ videoKey, title = "Трейлер" }: { videoKey: string; title?: string }) {
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#09090B] border border-[#27272A]">
            <iframe
                className="w-full h-full border-none block"
                src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
