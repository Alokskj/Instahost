export interface FunnyToastMessage {
  title: string;
  description: string;
}

export const funnyToastMessages: FunnyToastMessage[] = [
  {
    title: "🚀 Deploy Like a Pro!",
    description: "Star us on GitHub and your deployments will be 42% faster* (*not scientifically proven, but feels true!)"
  },
  {
    title: "☕ Coffee Break?",
    description: "While your site deploys, why not share InstaHost with your dev friends? They'll thank you later!"
  },
  {
    title: "🎭 Fun Fact!",
    description: "Developers who star our repo have reported 100% more happiness. Coincidence? We think not!"
  },
  {
    title: "🌟 Be a Star!",
    description: "GitHub stars are like hugs for developers. Give us one and spread the love by sharing!"
  },
  {
    title: "🎪 Did You Know?",
    description: "Every GitHub star you give plants a virtual tree in our digital forest. Help us grow! 🌳"
  },
  {
    title: "🎯 Pro Tip!",
    description: "The best way to thank free software? Star the repo and tell your friends. We accept both! ⭐"
  },
  {
    title: "🎸 Rock On!",
    description: "Rockstars give stars! ⭐ Show some love on GitHub and share InstaHost with your squad!"
  },
  {
    title: "🎨 Art of Sharing",
    description: "Good projects are meant to be shared. Star us on GitHub and make a developer's day!"
  },
  {
    title: "🍕 Pizza Logic",
    description: "You share pizza with friends, right? Share InstaHost too! And don't forget that GitHub star! 🌟"
  },
  {
    title: "🦄 Unicorn Mode",
    description: "Legends say that starring our repo unlocks magical deployment powers. Give it a try! ✨"
  },
  {
    title: "🎮 Achievement Unlocked!",
    description: "Star our GitHub repo to unlock the 'Awesome Person' achievement. Share for bonus XP!"
  },
  {
    title: "🧙‍♂️ Wizard Wisdom",
    description: "Even Gandalf would star our repo. Be a wizard, not a muggle! Share the magic! ⚡"
  },
  {
    title: "🌈 Rainbow Connection",
    description: "Every star brings color to our day! 🌟 Share InstaHost and spread the rainbow!"
  },
  {
    title: "🎪 Show Time!",
    description: "Your GitHub star is the applause we live for! Share with friends and bring them to the show! 👏"
  },
  {
    title: "🚁 Helicopter View",
    description: "From up here, we can see all the awesome devs! Give us a star so we can spot you! ⭐"
  },
  {
    title: "🎭 Plot Twist!",
    description: "The real treasure was the GitHub stars we made along the way. Help us collect more! 🏴‍☠️"
  },
  {
    title: "🌙 Night Shift",
    description: "Late night coding? Star our repo and share with your fellow night owls! We're in this together! 🦉"
  },
  {
    title: "🎪 Circus Act",
    description: "We juggle code, containers, and deployments. Give us a star and share if you're impressed! 🤹"
  },
  {
    title: "🎯 Bulls-eye!",
    description: "You found an awesome deployment platform! Now help others find it too. Star & share! 🎯"
  },
  {
    title: "🎺 Jazz Hands!",
    description: "Nothing says 'I appreciate free software' like a GitHub star! Share the jazz with friends! 🎷"
  }
];

export const getRandomToastMessage = (): FunnyToastMessage => {
  const randomIndex = Math.floor(Math.random() * funnyToastMessages.length);
  return funnyToastMessages[randomIndex];
};
