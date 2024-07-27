export const textTracks = [
  // Subtitles
  {
    src: '/video/english.vtt',
    label: 'English',
    language: 'en-US',
    kind: 'subtitles',
    default: true,
  },
  {
    src: '/video/french.vtt',
    label: 'French',
    language: 'fr-FR',
    kind: 'subtitles',
  },
  // Chapters
  {
    src: '/video/chapters.vtt',
    kind: 'chapters',
    language: 'en-US',
    default: true,
  },
] as const;
