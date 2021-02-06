const GENRE_EMOJI_MAP = {
  'Shit': '💩',
  'Weeby': '🍣',
  'Action': '🎬',
  'Comedy': '🤣',
  'Kung Fu': '🥋',
  'Ghibli': '🐹',
  'Horror': '🧟',
  'Suspense': '😨',
  'Drama': '🎭',
  'Wes': '🦊'
}
const GENRE_EMOJI_UNKNOWN = '🍿';

const GENRE_COLOR_MAP = {
  /*
  'Shit': '#ffedd6',
  'Weeby': '#ffd4f4',
  'Action': '#ffe6e6',
  'Comedy': '#e8ffd6',
  'Kung Fu': '#d6fff5',
  'Ghibli': '#f9d6ff',
  'Horror': '#b0b0b0',
  'Suspense': '#e6e7ff',
  'Drama': '#d6fff8'
  */
}
const GENRE_COLOR_UNKNOWN = '#eee';

export function genre_emoji(genre: string): string {
  let emoji: string = GENRE_EMOJI_MAP[genre];

  if(emoji === undefined) {
    emoji = GENRE_EMOJI_UNKNOWN;
  }

  return emoji;
}

export function genre_color(genre: string): string {
  let color: string = GENRE_COLOR_MAP[genre];

  if(color === undefined) {
    color = GENRE_COLOR_UNKNOWN;
  }

  return color;
}
