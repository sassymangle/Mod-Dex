const incidents = [
  {
    id: "spam",
    title: "Spam",
    category: "Chat Flow",
    severity: 1,
    color: "yellow",

    evidence: [
  "spam-burst",
  "repeat"
    ],

    keywords: [
      "spam",
      "caps",
      "flood",
      "copy pasta",
      "repeated message",
      "emote spam"
    ],

    examples: [
      "Repeating the same message multiple times",
      "Walls of emotes",
      "Caps spam during normal conversation"
    ],

    signs: [
      "Messages appear rapidly",
      "Chat becomes difficult to read",
      "Same content repeated"
    ],

    actions: [
      "Give a warning",
      "Delete repeated messages",
      "Enable slow mode if widespread"
    ],

    command: "/slow 10",

    beginnerTip:
      "Don't confuse excitement with malicious spam. Context matters."
  },

  {
    id: "harassment",
    title: "Harassment",
    category: "Safety",
    severity: 3,
    color: "orange",

    evidence: [
  "repeat",
  "threats"
    ],

    keywords: [
      "harassment",
      "bullying",
      "targeted insults",
      "attacking user",
      "mocking"
    ],

    examples: [
      "Repeated insults toward another chatter",
      "Targeting a viewer",
      "Continuing after being asked to stop"
    ],

    signs: [
      "One person is being singled out",
      "Behavior is repeated",
      "Creates hostility in chat"
    ],

    actions: [
      "Delete message",
      "Issue timeout",
      "Escalate if severe"
    ],

    command: "/timeout username 600",

    beginnerTip:
      "Protect the target first. Avoid getting drawn into arguments."
  },

  {
    id: "hate",
    title: "Hate Speech / Slurs",
    category: "Critical Safety",
    severity: 4,
    color: "red",

    evidence: [
  "threats",
  "repeat"
    ],

    keywords: [
      "slur",
      "hate speech",
      "bigotry",
      "racism",
      "homophobia",
      "transphobia"
    ],

    examples: [
      "Using slurs",
      "Targeting protected groups",
      "Disguising hate as a joke"
    ],

    signs: [
      "Identity-based attacks",
      "Dehumanizing language",
      "Immediate disruption"
    ],

    actions: [
      "Delete immediately",
      "Ban immediately",
      "Inform streamer/admin"
    ],

    command: "/ban username",

    beginnerTip:
      "Do not debate hateful comments in chat. Remove and move on."
  },

  {
    id: "trauma",
    title: "Trauma Dumping",
    category: "Boundaries",
    severity: 2,
    color: "orange",

    evidence: [
  "emotional-pressure",
  "repeat"
    ],

    keywords: [
      "trauma",
      "crisis",
      "oversharing",
      "graphic story",
      "emotional dumping"
    ],

    examples: [
      "Posting graphic personal experiences",
      "Turning chat into a support session",
      "Repeated emotional dumping"
    ],

    signs: [
      "Streamer appears uncomfortable",
      "Chat focus shifts completely",
      "Audience becomes distressed"
    ],

    actions: [
      "Acknowledge briefly",
      "Redirect to resources",
      "Timeout if repeated"
    ],

    command: "/timeout username 600",

    beginnerTip:
      "Be compassionate, but moderators are not counselors."
  },

  {
    id: "raid",
    title: "Bot Raid",
    category: "Emergency",
    severity: 4,
    color: "red",

    evidence: [
  "new-account",
  "spam-burst",
  "repeat"
    ],

    keywords: [
      "raid",
      "hate raid",
      "bot",
      "spam burst",
      "follow bot"
    ],

    examples: [
      "Sudden flood of accounts",
      "Repeated identical messages",
      "Large spam attack"
    ],

    signs: [
      "New accounts appear simultaneously",
      "Messages move too quickly",
      "Identical content repeated"
    ],

    actions: [
      "Enable follower mode",
      "Enable slow mode",
      "Enable emote only mode",
      "Ban obvious bots"
    ],

    command:
`/followers 10m
/slow 30
/emoteonly`,

    beginnerTip:
      "Stabilize chat first. Cleanup can happen afterward."
  },

  {
    id: "doxxing",
    title: "Doxxing / Personal Information",
    category: "Emergency",
    severity: 4,
    color: "red",

    evidence: [
  "personal-info",
  "threats"
    ],

    keywords: [
      "doxxing",
      "address",
      "phone number",
      "personal info",
      "private information"
    ],

    examples: [
      "Posting an address",
      "Sharing personal phone numbers",
      "Threatening to reveal information"
    ],

    signs: [
      "Private information appears in chat",
      "Threats involving exposure",
      "Safety concerns"
    ],

    actions: [
      "Delete immediately",
      "Ban immediately",
      "Notify streamer/admin"
    ],

    command: "/ban username",

    beginnerTip:
      "Act immediately and never repeat the information publicly."
  },

  {
    id: "promo",
    title: "Self Promotion",
    category: "Etiquette",
    severity: 1,
    color: "yellow",

    evidence: [
  "promo-links",
  "repeat",
  "new-account"
    ],

    keywords: [
      "self promo",
      "advertising",
      "my stream",
      "follow me",
      "discord invite"
    ],

    examples: [
      "Advertising a channel",
      "Posting social links repeatedly",
      "Promoting without permission"
    ],

    signs: [
      "Message is mainly promotional",
      "User isn't participating normally",
      "Repeated advertising"
    ],

    actions: [
      "Warn user",
      "Delete message",
      "Timeout if repeated"
    ],

    command: "/timeout username 300",

    beginnerTip:
      "Many first-time chatters simply don't know the rules."
  },

  {
    id: "parasocial",
    title: "Parasocial Boundary Issues",
    category: "Boundaries",
    severity: 2,
    color: "orange",

    evidence: [
  "emotional-pressure",
  "repeat"
    ],

    keywords: [
      "parasocial",
      "boundary",
      "notice me",
      "reply to me",
      "guilt"
    ],

    examples: [
      "You never reply anymore",
      "Guilt-tripping the streamer",
      "Demanding emotional attention"
    ],

    signs: [
      "Streamer seems uncomfortable",
      "Repeated emotional dependency",
      "Boundary crossing"
    ],

    actions: [
      "Redirect gently",
      "Remind about boundaries",
      "Timeout if repeated"
    ],

    command: "/timeout username 600",

    beginnerTip:
      "Support the streamer's boundaries without escalating drama."
  },

  {
    id: "backseating",
    title: "Backseating",
    category: "Gameplay Etiquette",
    severity: 1,
    color: "green",

    evidence: [
  "spoilers",
  "repeat"
    ],

    keywords: [
      "backseating",
      "spoiler",
      "game help",
      "tips",
      "advice"
    ],

    examples: [
      "Telling streamer what to do",
      "Spoiling puzzle solutions",
      "Unsolicited game advice"
    ],

    signs: [
      "May be well-intentioned",
      "Can frustrate streamer",
      "Depends on channel rules"
    ],

    actions: [
      "Remind user of channel policy",
      "Warn if repeated",
      "Timeout if necessary"
    ],

    command: "/timeout username 300",

    beginnerTip:
      "Always follow the streamer's preference on backseating."
  }
];
