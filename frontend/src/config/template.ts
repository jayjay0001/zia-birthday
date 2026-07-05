export const TEMPLATE_CONFIG = {
  theme: {
    name: 'Princess Kingdom',
    colors: {
      primary: 'princess-gold', // Refers to tailwind config
      secondary: 'princess-rose',
      background: 'princess-dark',
    },
    // The main crest or logo
    crestEmoji: '👑',
  },
  
  hero: {
    guestNamePlaceholder: 'Emma', // Demo guest personalization
    greeting: "Hi there! I'm so happy you're here!",
    subtitle: "I have something special to show you.",
    buttonText: "Begin My Story →"
  },

  welcome: {
    title: "You're Invited",
    subtitle: "To celebrate my seventh birthday!",
  },

  star: {
    name: "Elaiza Zia Colleen",
    age: "7",
    favoriteColor: "Pink & Gold",
    favoriteFood: "Cupcakes 🧁",
    dream: "To be a magical fairy 🧚‍♀️",
    favoritePrincess: "Ariel 🧜‍♀️",
    hobby: "Singing & Dancing 💃",
  },

  storybook: [
    { id: 1, image: "baby", caption: "This was my first birthday." },
    { id: 2, image: "toddler", caption: "I love going to the beach." },
    { id: 3, image: "six", caption: "Starting first grade!" },
    { id: 4, image: "ballet", caption: "My first ballet recital." },
    { id: 5, image: "seven", caption: "Ready to turn seven!" }
  ],

  dressCode: {
    option1: {
      title: "Princess Gown",
      icon: "👗",
      description: "Elegant dresses fit for a royal palace."
    },
    option2: {
      title: "Royal Suit",
      icon: "👔",
      description: "Dashing attire for princes and knights."
    }
  },

  eventDetails: {
    date: "Saturday, August 15th",
    time: "2:00 PM - 5:00 PM",
    venue: "Grand Ballroom",
    address: "123 Royal Castle St.",
    mapsUrl: "https://maps.google.com/?q=123+Royal+Castle+St",
    calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Zia%27s+7th+Birthday&dates=20260815T140000/20260815T170000&details=Royal+Ball+Birthday+Party&location=123+Royal+Castle+St"
  },

  countdown: {
    targetDate: "2026-08-15T14:00:00"
  },

  goodbye: {
    title: "Thank you for visiting my invitation.",
    subtitle: "I hope to celebrate with you."
  },

  assets: {
    // These would be real URLs in production
    audio: {
      ambient: "/audio/ambient.mp3",
      buttonClick: "/audio/click.mp3",
      sparkle: "/audio/sparkle.mp3",
      pageTurn: "/audio/page_turn.mp3"
    },
    voice: {
      greeting: "/audio/voice_greeting.mp3",
      welcome: "/audio/voice_welcome.mp3",
      storybook1: "/audio/voice_story1.mp3",
      storybook2: "/audio/voice_story2.mp3",
      goodbye: "/audio/voice_goodbye.mp3"
    }
  }
};
