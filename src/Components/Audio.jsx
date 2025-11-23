import { useEffect, useRef, useState } from "react";

export default function LoopingImageAudio({
    imgSrc,
    audioSrc,
    alt = "Audio trigger",
}) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Auto-load audio when component mounts
    useEffect(() => {
        const audio = new Audio(audioSrc);
        audio.loop = true;
        audio.preload = "auto";
        audioRef.current = audio;

        return () => {
            // Cleanup on unmount
            audio.pause();
            audioRef.current = null;
        };
    }, [audioSrc]);

    const handleClick = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        try {
            if (!isPlaying) {
                await audio.play();
            } else {
                audio.pause();
                audio.currentTime = 0;
            }

            setIsPlaying(!isPlaying);
        } catch (err) {
            console.error("Audio playback failed:", err);
        }
    };

    return (
        <>
            <style>
                {`
                    @keyframes cartoonBounce {
                        0%, 100% {
                            transform: scale(1, 1);
                        }
                        25% {
                            transform: scale(1.04, 0.96);
                        }
                        50% {
                            transform: scale(0.97, 1.03);
                        }
                        75% {
                            transform: scale(1.02, 0.98);
                        }
                    }
                `}
            </style>
            <img
                src={imgSrc}
                alt={alt}
                onClick={handleClick}
                style={{
                    cursor: "pointer",
                    animation: isPlaying ? "cartoonBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite" : "none",
                }}
            />
        </>
    );
}