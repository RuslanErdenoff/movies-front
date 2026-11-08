import "./youtube-player.css";

export function YoutubePlayer({ videoKey, title = "Трейлер" }: { videoKey: string; title?: string }) {
    return (
        <div className="youtube-player">
            <iframe
                className="youtube-player-iframe"
                src={`https://www.youtube.com/embed/${videoKey}?rel=0`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
}
