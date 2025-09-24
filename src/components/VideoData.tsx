// videoData.ts
export interface VideoItem {
  id: string;
  title: string;
  url: string;
}

export const videoList: VideoItem[] = [
  {
    id: "1",
    title: "Video 1",
    url: "https://youtu.be/-8C_2BBVWk8?si=UYBVbKeytPOK_OZ9",
  },
  {
    id: "2",
    title: "Video 2",
    url: "https://www.youtube.com/watch?v=jNC1vasXSkE&list=RDjNC1vasXSkE&start_radio=1",
  },
  {
    id: "3",
    title: "Video 3",
    url: "https://youtu.be/W1y8blwMLxY?si=lJTpvrjD9MU1UaYh",
  },
  {
    id: "4",
    title: "Video 4",
    url: "https://youtu.be/QUzZJ-pLlbo?si=w4BOcH11c3YG3Ag8",
  },
  {
    id: "5",
    title: "Video 5",
    url: "https://youtu.be/c6lyE9Wbusw?si=whbVDhHn3EzIGXv5",
  },
];
