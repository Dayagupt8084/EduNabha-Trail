import { useState, useEffect, useRef } from "react";

// 🎥 Video Item type
interface VideoItem {
  id: string;
  title: string;
  url: string;
}

// 📑 Video List (all in one file)
const videoList: VideoItem[] = [
  {
    id: "1",
    title: "Video 1",
    url: "/Testing.mp4", // sample mp4 for demo
  },
  {
    id: "2",
    title: "Video 2",
    url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4", // sample mp4
  },
  {
    id: "3",
    title: "Video 3",
    url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
  },
  {
    id: "4",
    title: "Video 4",
    url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: "5",
    title: "Video 5",
    url: "https://youtu.be/c6lyE9Wbusw?si=whbVDhHn3EzIGXv5",
  },
];

// 🎬 Video Player Component
export const VideoPlayer = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Load last watched video from localStorage
  useEffect(() => {
    const savedVideoId = localStorage.getItem("lastWatchedVideo");
    if (savedVideoId) {
      const savedVideo = videoList.find((v) => v.id === savedVideoId);
      if (savedVideo) {
        setCurrentVideo(savedVideo);
        return;
      }
    }
    // Default: first video
    setCurrentVideo(videoList[0]);
  }, []);

  // Save current video when changed
  useEffect(() => {
    if (currentVideo) {
      localStorage.setItem("lastWatchedVideo", currentVideo.id);
    }
  }, [currentVideo]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-2">🎬 Video Player</h2>

      {currentVideo && (
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            src={currentVideo.url}
            controls
            className="w-full h-full bg-black"
          />
        </div>
      )}

      {/* Continue Watching */}
      {currentVideo && (
        <div className="bg-muted p-3 rounded-lg shadow">
          <p className="text-sm text-muted-foreground">
            Continue Watching:{" "}
            <span className="font-semibold">{currentVideo.title}</span>
          </p>
        </div>
      )}

      {/* Playlist */}
      <div>
        <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
        <ul className="space-y-2">
          {videoList.map((video) => (
            <li key={video.id}>
              <button
                onClick={() => setCurrentVideo(video)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition ${
                  currentVideo?.id === video.id
                    ? "bg-primary text-white"
                    : "hover:bg-accent"
                }`}
              >
                {video.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};






// import { useState, useEffect, useRef } from "react";

// // 🎥 Video Item type
// interface VideoItem {
//   id: string;
//   title: string;
//   url: string;
// }

// // 📑 Video List
// const videoList: VideoItem[] = [
//   {
//     id: "1",
//     title: "Mathematics Intro (YouTube)",
//     url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
//   },
//   {
//     id: "2",
//     title: "Algebra Basics (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "3",
//     title: "Geometry Lesson (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "4",
//     title: "Science Demo (MP4)",
//     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
//   },
//   {
//     id: "5",
//     title: "English Grammar (YouTube)",
//     url: "https://youtu.be/c6lyE9Wbusw?si=whbVDhHn3EzIGXv5",
//   },
// ];

// // ✅ Convert YouTube URL → Embed (no forced autoplay)
// const getEmbedUrl = (url: string) => {
//   let videoId = "";

//   if (url.includes("youtu.be/")) {
//     videoId = url.split("youtu.be/")[1].split("?")[0];
//   } else if (url.includes("watch?v=")) {
//     videoId = url.split("watch?v=")[1].split("&")[0];
//   }

//   // Removed autoplay param to avoid pause issue
//   return `https://www.youtube.com/embed/${videoId}?rel=0`;
// };

// export const VideoPlayer = () => {
//   const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Load last watched video from localStorage
//   useEffect(() => {
//     const savedVideoId = localStorage.getItem("lastWatchedVideo");
//     if (savedVideoId) {
//       const savedVideo = videoList.find((v) => v.id === savedVideoId);
//       if (savedVideo) {
//         setCurrentVideo(savedVideo);
//         return;
//       }
//     }
//     // Default: first video
//     setCurrentVideo(videoList[0]);
//   }, []);

//   // Save current video when changed
//   useEffect(() => {
//     if (currentVideo) {
//       localStorage.setItem("lastWatchedVideo", currentVideo.id);

//       // Handle MP4 autoplay smoothly
//       if (videoRef.current && !currentVideo.url.includes("youtu")) {
//         const video = videoRef.current;

//         const tryPlay = () => {
//           video
//             .play()
//             .catch(() => {
//               console.log("Autoplay blocked, waiting for user action");
//             });
//         };

//         if (video.readyState >= 3) {
//           tryPlay();
//         } else {
//           video.addEventListener("canplay", tryPlay, { once: true });
//         }
//       }
//     }
//   }, [currentVideo]);

//   const isYouTube = currentVideo?.url.includes("youtu");

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       {/* Changed Title */}
//       <h2 className="text-2xl font-bold mb-2">📘 Subject Videos</h2>

//       {currentVideo && (
//         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
//           {isYouTube ? (
//             <iframe
//               width="100%"
//               height="100%"
//               src={getEmbedUrl(currentVideo.url)}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <video
//               ref={videoRef}
//               controls
//               autoPlay
//               muted
//               className="w-full h-full bg-black"
//             >
//               <source src={currentVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       )}

//       {/* Continue Watching */}
//       {currentVideo && (
//         <div className="bg-gray-100 p-3 rounded-lg shadow">
//           <p className="text-sm text-gray-600">
//             Continue Watching:{" "}
//             <span className="font-semibold">{currentVideo.title}</span>
//           </p>
//         </div>
//       )}

//       {/* Playlist */}
//       <div>
//         <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
//         <ul className="space-y-2">
//           {videoList.map((video) => (
//             <li key={video.id}>
//               <button
//                 onClick={() => setCurrentVideo(video)}
//                 className={`w-full text-left px-3 py-2 rounded-lg border transition ${
//                   currentVideo?.id === video.id
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {video.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };


// import { useState, useEffect, useRef } from "react";

// // 🎥 Video Item type
// interface VideoItem {
//   id: string;
//   title: string;
//   url: string;
// }

// // 📑 Video List
// const videoList: VideoItem[] = [
//   {
//     id: "1",
//     title: "Mathematics Intro (YouTube)",
//     url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
//   },
//   {
//     id: "2",
//     title: "Algebra Basics (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "3",
//     title: "Geometry Lesson (MP4)",
//     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
//   },
// ];

// // ✅ Convert YouTube URL → Embed with resume support
// const getEmbedUrl = (url: string, startTime: number) => {
//   let videoId = "";

//   if (url.includes("youtu.be/")) {
//     videoId = url.split("youtu.be/")[1].split("?")[0];
//   } else if (url.includes("watch?v=")) {
//     videoId = url.split("watch?v=")[1].split("&")[0];
//   }

//   return `https://www.youtube.com/embed/${videoId}?rel=0&start=${Math.floor(
//     startTime
//   )}`;
// };

// export const VideoPlayer = () => {
//   const [currentVideo, setCurrentVideo] = useState<VideoItem | null>(null);
//   const [resumeTime, setResumeTime] = useState<number>(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Load last watched video & time
//   useEffect(() => {
//     const savedVideoId = localStorage.getItem("lastWatchedVideo");
//     const savedTime = localStorage.getItem("lastWatchedTime");

//     if (savedVideoId) {
//       const savedVideo = videoList.find((v) => v.id === savedVideoId);
//       if (savedVideo) {
//         setCurrentVideo(savedVideo);
//         setResumeTime(savedTime ? parseFloat(savedTime) : 0);
//         return;
//       }
//     }
//     setCurrentVideo(videoList[0]);
//   }, []);

//   // Save current video ID
//   useEffect(() => {
//     if (currentVideo) {
//       localStorage.setItem("lastWatchedVideo", currentVideo.id);
//       setResumeTime(
//         parseFloat(localStorage.getItem("lastWatchedTime") || "0")
//       );
//     }
//   }, [currentVideo]);

//   // Save progress for MP4
//   useEffect(() => {
//     if (videoRef.current && currentVideo && !currentVideo.url.includes("youtu")) {
//       const video = videoRef.current;

//       // Restore time
//       const handleLoaded = () => {
//         if (resumeTime > 0 && resumeTime < video.duration) {
//           video.currentTime = resumeTime;
//         }
//         video.play().catch(() => {
//           console.log("Autoplay blocked, wait for user action");
//         });
//       };

//       // Track progress
//       const handleTimeUpdate = () => {
//         localStorage.setItem("lastWatchedTime", video.currentTime.toString());
//       };

//       video.addEventListener("loadedmetadata", handleLoaded);
//       video.addEventListener("timeupdate", handleTimeUpdate);

//       return () => {
//         video.removeEventListener("loadedmetadata", handleLoaded);
//         video.removeEventListener("timeupdate", handleTimeUpdate);
//       };
//     }
//   }, [currentVideo, resumeTime]);

//   const isYouTube = currentVideo?.url.includes("youtu");

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-2xl font-bold mb-2">📘 Subject Videos</h2>

//       {currentVideo && (
//         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
//           {isYouTube ? (
//             <iframe
//               width="100%"
//               height="100%"
//               src={getEmbedUrl(currentVideo.url, resumeTime)}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <video
//               ref={videoRef}
//               controls
//               autoPlay
//               muted
//               className="w-full h-full bg-black"
//             >
//               <source src={currentVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       )}

//       {/* Continue Watching */}
//       {currentVideo && (
//         <div className="bg-gray-100 p-3 rounded-lg shadow">
//           <p className="text-sm text-gray-600">
//             Continue Watching:{" "}
//             <span className="font-semibold">{currentVideo.title}</span>
//           </p>
//         </div>
//       )}

//       {/* Playlist */}
//       <div>
//         <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
//         <ul className="space-y-2">
//           {videoList.map((video) => (
//             <li key={video.id}>
//               <button
//                 onClick={() => {
//                   setCurrentVideo(video);
//                   setResumeTime(0); // Reset if new video
//                   localStorage.setItem("lastWatchedTime", "0");
//                 }}
//                 className={`w-full text-left px-3 py-2 rounded-lg border transition ${
//                   currentVideo?.id === video.id
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {video.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// import { useState, useEffect, useRef } from "react";

// // 🎥 Video Item type
// interface VideoItem {
//   id: string;
//   title: string;
//   url: string;
// }

// const videoList: VideoItem[] = [
//   {
//     id: "1",
//     title: "Mathematics Intro (YouTube)",
//     url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
//   },
//   {
//     id: "2",
//     title: "Algebra Basics (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "3",
//     title: "Geometry Lesson (MP4)",
//     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
//   },
// ];

// // ✅ Convert YouTube URL → Embed
// const getEmbedUrl = (url: string) => {
//   let videoId = "";
//   if (url.includes("youtu.be/")) {
//     videoId = url.split("youtu.be/")[1].split("?")[0];
//   } else if (url.includes("watch?v=")) {
//     videoId = url.split("watch?v=")[1].split("&")[0];
//   }
//   return `https://www.youtube.com/embed/${videoId}?rel=0`;
// };

// export const VideoPlayer = () => {
//   const [currentVideo, setCurrentVideo] = useState<VideoItem>(videoList[0]);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Load last watched video
//   useEffect(() => {
//     const savedVideoId = localStorage.getItem("lastWatchedVideo");
//     if (savedVideoId) {
//       const savedVideo = videoList.find((v) => v.id === savedVideoId);
//       if (savedVideo) setCurrentVideo(savedVideo);
//     }
//   }, []);

//   // Save last watched
//   useEffect(() => {
//     if (currentVideo) {
//       localStorage.setItem("lastWatchedVideo", currentVideo.id);
//     }
//   }, [currentVideo]);

//   const isYouTube = currentVideo?.url.includes("youtu");

//   // ✅ For MP4: ensure smooth autoplay
//   useEffect(() => {
//     if (videoRef.current && !isYouTube) {
//       const video = videoRef.current;

//       const handleCanPlay = () => {
//         video.play().catch(() => {
//           console.log("Autoplay blocked, user must click play");
//         });
//       };

//       video.addEventListener("canplay", handleCanPlay);

//       return () => {
//         video.removeEventListener("canplay", handleCanPlay);
//       };
//     }
//   }, [currentVideo]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-2xl font-bold mb-2">📘 Subject Videos</h2>

//       {currentVideo && (
//         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
//           {isYouTube ? (
//             <iframe
//               width="100%"
//               height="100%"
//               src={getEmbedUrl(currentVideo.url)}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <video
//               ref={videoRef}
//               key={currentVideo.id} // ✅ re-render only on video change
//               controls
//               autoPlay
//               muted={false}
//               preload="auto"
//               className="w-full h-full bg-black"
//             >
//               <source src={currentVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       )}

//       {/* Playlist */}
//       <div>
//         <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
//         <ul className="space-y-2">
//           {videoList.map((video) => (
//             <li key={video.id}>
//               <button
//                 onClick={() => setCurrentVideo(video)}
//                 className={`w-full text-left px-3 py-2 rounded-lg border transition ${
//                   currentVideo?.id === video.id
//                     ? "bg-blue-600 text-white"
//                     : "hover:bg-gray-200"
//                 }`}
//               >
//                 {video.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };


// import { useState, useEffect, useRef } from "react";

// interface VideoItem {
//   id: string;
//   title: string;
//   url: string;
// }

// const videoList: VideoItem[] = [
//   {
//     id: "1",
//     title: "Mathematics Intro (YouTube)",
//     url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
//   },
//   {
//     id: "2",
//     title: "Algebra Basics (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "3",
//     title: "Geometry Lesson (MP4)",
//     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
//   },
// ];

// // Convert YouTube URL → Embed
// const getEmbedUrl = (url: string) => {
//   let videoId = "";
//   if (url.includes("youtu.be/")) {
//     videoId = url.split("youtu.be/")[1].split("?")[0];
//   } else if (url.includes("watch?v=")) {
//     videoId = url.split("watch?v=")[1].split("&")[0];
//   }
//   return `https://www.youtube.com/embed/${videoId}?rel=0`;
// };

// export const VideoPlayer = () => {
//   const [currentVideo, setCurrentVideo] = useState<VideoItem>(videoList[0]);
//   const [resumeTime, setResumeTime] = useState<number>(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Load last watched video and position
//   useEffect(() => {
//     const savedVideoId = localStorage.getItem("lastWatchedVideo");
//     const savedTime = localStorage.getItem("lastWatchedTime");

//     if (savedVideoId) {
//       const savedVideo = videoList.find((v) => v.id === savedVideoId);
//       if (savedVideo) setCurrentVideo(savedVideo);
//     }

//     if (savedTime) setResumeTime(parseFloat(savedTime));
//   }, []);

//   // Save last watched video and position every 1s
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (videoRef.current && !currentVideo.url.includes("youtu")) {
//         localStorage.setItem("lastWatchedVideo", currentVideo.id);
//         localStorage.setItem("lastWatchedTime", videoRef.current.currentTime.toString());
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentVideo]);

//   const isYouTube = currentVideo.url.includes("youtu");

//   // Play MP4 and resume
//   useEffect(() => {
//     if (videoRef.current && !isYouTube) {
//       const video = videoRef.current;

//       const handleCanPlay = () => {
//         if (resumeTime > 0) {
//           video.currentTime = resumeTime;
//         }
//         video.play().catch(() => console.log("Autoplay blocked"));
//       };

//       video.addEventListener("canplay", handleCanPlay);
//       return () => {
//         video.removeEventListener("canplay", handleCanPlay);
//       };
//     }
//   }, [currentVideo, resumeTime, isYouTube]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-2xl font-bold mb-2">📘 Subject Videos</h2>

//       {currentVideo && (
//         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
//           {isYouTube ? (
//             <iframe
//               width="100%"
//               height="100%"
//               src={getEmbedUrl(currentVideo.url)}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <video
//               ref={videoRef}
//               key={currentVideo.id} // re-render only on video change
//               controls
//               autoPlay
//               muted={false}
//               preload="auto"
//               className="w-full h-full bg-black"
//             >
//               <source src={currentVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       )}

//       <div>
//         <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
//         <ul className="space-y-2">
//           {videoList.map((video) => (
//             <li key={video.id}>
//               <button
//                 onClick={() => {
//                   setResumeTime(0); // reset resume for new video
//                   setCurrentVideo(video);
//                 }}
//                 className={`w-full text-left px-3 py-2 rounded-lg border transition ${
//                   currentVideo.id === video.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"
//                 }`}
//               >
//                 {video.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// import { useState, useEffect, useRef } from "react";

// interface VideoItem {
//   id: string;
//   title: string;
//   url: string;
// }

// const videoList: VideoItem[] = [
//   {
//     id: "1",
//     title: "Mathematics Intro (YouTube)",
//     url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
//   },
//   {
//     id: "2",
//     title: "Algebra Basics (MP4)",
//     url: "https://res.cloudinary.com/dxxvvpdul/video/upload/v1758305579/lessons/videos/1758305571408-reel1.mp4",
//   },
//   {
//     id: "3",
//     title: "Geometry Lesson (MP4)",
//     url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
//   },
// ];

// // Convert YouTube URL → Embed
// const getEmbedUrl = (url: string) => {
//   let videoId = "";
//   if (url.includes("youtu.be/")) {
//     videoId = url.split("youtu.be/")[1].split("?")[0];
//   } else if (url.includes("watch?v=")) {
//     videoId = url.split("watch?v=")[1].split("&")[0];
//   }
//   return `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
// };

// export const VideoPlayer = () => {
//   const [currentVideo, setCurrentVideo] = useState<VideoItem>(videoList[0]);
//   const [resumeTime, setResumeTime] = useState<number>(0);
//   const videoRef = useRef<HTMLVideoElement | null>(null);

//   // Load last watched video and time
//   useEffect(() => {
//     const savedVideoId = localStorage.getItem("lastWatchedVideo");
//     const savedTime = localStorage.getItem("lastWatchedTime");

//     if (savedVideoId) {
//       const savedVideo = videoList.find((v) => v.id === savedVideoId);
//       if (savedVideo) setCurrentVideo(savedVideo);
//     }
//     if (savedTime) setResumeTime(parseFloat(savedTime));
//   }, []);

//   // Save current video & playback time every second
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (videoRef.current && !currentVideo.url.includes("youtu")) {
//         localStorage.setItem("lastWatchedVideo", currentVideo.id);
//         localStorage.setItem("lastWatchedTime", videoRef.current.currentTime.toString());
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [currentVideo]);

//   const isYouTube = currentVideo.url.includes("youtu");

//   // Play MP4 and resume
//   useEffect(() => {
//     if (videoRef.current && !isYouTube) {
//       const video = videoRef.current;

//       const handleCanPlay = () => {
//         if (resumeTime > 0) {
//           video.currentTime = resumeTime;
//         }
//         video.play().catch(() => console.log("Autoplay blocked"));
//       };

//       video.addEventListener("canplay", handleCanPlay);
//       return () => {
//         video.removeEventListener("canplay", handleCanPlay);
//       };
//     }
//   }, [currentVideo, resumeTime, isYouTube]);

//   return (
//     <div className="max-w-4xl mx-auto p-4 space-y-6">
//       <h2 className="text-2xl font-bold mb-2">📘 Subject Videos</h2>

//       {currentVideo && (
//         <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
//           {isYouTube ? (
//             <iframe
//               width="100%"
//               height="100%"
//               src={getEmbedUrl(currentVideo.url)}
//               title={currentVideo.title}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           ) : (
//             <video
//               ref={videoRef}
//               key={currentVideo.id}
//               controls
//               autoPlay
//               muted={false}
//               preload="auto"
//               className="w-full h-full bg-black"
//             >
//               <source src={currentVideo.url} type="video/mp4" />
//               Your browser does not support the video tag.
//             </video>
//           )}
//         </div>
//       )}

//       <div>
//         <h3 className="text-xl font-semibold mb-3">📑 Playlist</h3>
//         <ul className="space-y-2">
//           {videoList.map((video) => (
//             <li key={video.id}>
//               <button
//                 onClick={() => {
//                   setResumeTime(0); // Reset resume for new video
//                   setCurrentVideo(video);
//                 }}
//                 className={`w-full text-left px-3 py-2 rounded-lg border transition ${
//                   currentVideo.id === video.id ? "bg-blue-600 text-white" : "hover:bg-gray-200"
//                 }`}
//               >
//                 {video.title}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
