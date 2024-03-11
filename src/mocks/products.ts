export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  quantity: number;
}

export const productsMock: Product[] = [
  {
    _id: "1",
    name: "Backpack",
    price: 250,
    description:
      "Conquer your day with the ultimate tech backpack. This organized powerhouse keeps your gear protected and ready, with dedicated compartments for laptops, tablets, and more. Built tough for the daily grind, it boasts comfy carrying and a sleek design that goes anywhere. Even charge on the move with a built-in USB port (battery not included). It's your mobile tech haven, ready for anything.",
    image: "backpack",
    category: "bag",
    quantity: 10,
  },
  {
    _id: "2",
    name: "Desktop",
    price: 1750,
    description:
      "Unleash your potential with this powerhouse desktop.  This sleek machine boasts lightning-fast performance, letting you conquer demanding tasks and creative projects with ease.  Upgrade and customize to your heart's content, creating the perfect desktop for you.",
    image: "desktop",
    category: "computer",
    quantity: 10,
  },
  {
    _id: "3",
    name: "Gaming Headphones",
    price: 175,
    description:
      "\n" +
      "Viper headset: Level up your audio. Crystal-clear sound puts you in the zone, plush memory foam keeps you comfy, and a noise-canceling mic ensures flawless teamwork. Victory never sounded (or looked) so good.",
    image: "gaming-headphones",
    category: "headphones",
    quantity: 10,
  },
  {
    _id: "4",
    name: "Headphones",
    price: 1250,
    description:
      "\n" +
      "Unveiled sound. The Muse headphones unveil every detail, every instrument, every nuance of your music. Premium drivers deliver unparalleled clarity, while luxurious materials ensure lasting comfort. Immerse yourself in the purest listening experience.",
    image: "headphones",
    category: "headphones",
    quantity: 10,
  },
  {
    _id: "5",
    name: "Microphone",
    price: 550,
    description:
      "Capture your voice in pristine detail with the Nova Studio Microphone. This professional-grade condenser mic delivers unmatched clarity and warmth, perfect for recording vocals, instruments, and podcasts.  Its tight pickup pattern isolates your sound, minimizing background noise for studio-quality results. Unleash your sonic potential with Nova.",
    image: "microphone",
    category: "audio",
    quantity: 10,
  },
  {
    _id: "6",
    name: "Phone Charging Alarm",
    price: 75,
    description:
      "Rise and shine (with a full battery)! This nifty clock wakes you up and charges your phone all at once. No more morning scramble - just a fully charged phone and a refreshed you, ready to conquer the day.",
    image: "phone-charging-alarm",
    category: "electronics",
    quantity: 10,
  },
  {
    _id: "7",
    name: "Raspberry Pi",
    price: 60,
    description:
      "Tinker. Learn. Create. The Raspberry Pi: Your pocket-sized computer powerhouse.  Endless projects await with this versatile board -  from robotics to media centers, it fuels your imagination.",
    image: "raspberry-pi",
    category: "electronics",
    quantity: 10,
  },
  {
    _id: "8",
    name: "Screen Reader",
    price: 125,
    description:
      "See the web. Hear the story. Screen readers unlock your digital world, transforming text on screens into clear voices.  Empowering independence and information access for all, one sentence at a time.",
    image: "screen-reader",
    category: "electronics",
    quantity: 10,
  },
  {
    _id: "9",
    name: "Smartphone",
    price: 1250,
    description:
      "Pocket-sized power. The world at your fingertips. This smartphone captures stunning photos, connects you instantly, and keeps you entertained on the go.  It's your lifeline to information, creativity, and connection.",
    image: "smartphone",
    category: "electronics",
    quantity: 10,
  },
  {
    _id: "10",
    name: "Speakers",
    price: 1500,
    description:
      "Studio truth revealed. These pristine monitors deliver uncolored audio, letting you craft sonic masterpieces with confidence. Hear every detail, trust your ears, and mix with clarity",
    image: "speakers",
    category: "audio",
    quantity: 10,
  },
  {
    _id: "11",
    name: "Tech Card",
    price: 25,
    description:
      "Forget the paper chase. This digital tech card keeps your info fresh and connections instant.  Showcase your skills, share your story, and make a lasting impression - all with a tap. Networking, streamlined.",
    image: "tech-card",
    category: "electronics",
    quantity: 10,
  },
  {
    _id: "12",
    name: "Watch",
    price: 450,
    description:
      "Time redefined. This smartwatch isn't just about ticking seconds. It's your health hub, notification center, and stylish companion, all on your wrist. Stay connected, informed, and on track - elevate your everyday.",
    image: "watch",
    category: "electronics",
    quantity: 10,
  },
];
