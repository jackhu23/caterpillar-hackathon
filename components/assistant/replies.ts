// Scripted replies for the Cat AI Assistant (ADR 0001: no live model).
// Parts, serial number and order questions hand off to parts.cat.com (ADR 0002).

export type Reply = {
  text: string;
  link?: { label: string; href: string };
};

export const SUGGESTED_PROMPTS = [
  "What can you do?",
  "Open roles near me",
  "Life at Cat",
  "What does Caterpillar do?",
  "Our sustainability goals",
  "Find a dealer",
] as const;

const REPLIES: Record<(typeof SUGGESTED_PROMPTS)[number], Reply> = {
  "What can you do?": {
    text: "I can tell you what Caterpillar builds, which industries we serve, what it's like to work here, and help you find open roles or your nearest dealer. For parts, orders and serial numbers, Cat Parts has its own assistant.",
  },
  "Open roles near me": {
    text: "We hire engineers, technicians, manufacturing teams, software developers and business professionals in more than 40 countries, plus internships and co-ops for students. Search by location and team to see what's open near you.",
    link: { label: "Search open roles", href: "https://careers.caterpillar.com" },
  },
  "Life at Cat": {
    text: "About 110,000 people work at Caterpillar. Teams build and test machines at proving grounds, run factories, write the software behind autonomous haul trucks and support customers worldwide. Employees get development programs, tuition help and employee resource groups from their first year.",
    link: { label: "See life at Cat", href: "https://careers.caterpillar.com" },
  },
  "What does Caterpillar do?": {
    text: "Since 1925 Caterpillar has built construction and mining equipment, off-highway diesel and natural gas engines, industrial gas turbines and diesel-electric locomotives. Cat dealers sell, rent and service that equipment in more than 190 countries.",
  },
  "Our sustainability goals": {
    text: "We're helping customers cut emissions with battery-electric machines, hybrid power systems, autonomy that burns less fuel, and engines that run on lower-carbon fuels like renewable diesel and hydrogen blends.",
    link: {
      label: "Read about sustainability",
      href: "https://www.caterpillar.com/en/company/sustainability.html",
    },
  },
  "Find a dealer": {
    text: "Cat dealers sell, rent and service equipment close to where you work. Enter your location in the dealer locator to find the nearest one.",
    link: {
      label: "Open the dealer locator",
      href: "https://www.cat.com/en_US/support/dealer-locator.html",
    },
  },
};

const PARTS_HANDOFF: Reply = {
  text: "Parts, serial numbers and order status are handled on Cat Parts, where you can sign in and see your equipment and orders.",
  link: { label: "Go to Cat Parts", href: "https://parts.cat.com/en/catcorp" },
};

const FALLBACK: Reply = {
  text: "I can answer questions about Caterpillar as a company and about careers here. Try asking about open roles, what we build, our sustainability goals or finding a dealer.",
};

const KEYWORDS: [RegExp, Reply][] = [
  [/\b(part|parts|serial|order|shipping|warranty|filter|track)\b/i, PARTS_HANDOFF],
  [/\b(job|jobs|career|careers|role|roles|hiring|hire|intern|internship|apply|position)\b/i, REPLIES["Open roles near me"]],
  [/\b(culture|benefit|benefits|work at|working at|life|team|salary|employee)\b/i, REPLIES["Life at Cat"]],
  [/\b(sustain\w*|emission\w*|electric|battery|hydrogen|climate|carbon|green)\b/i, REPLIES["Our sustainability goals"]],
  [/\b(dealer|dealers|buy|rent|rental|near me|location)\b/i, REPLIES["Find a dealer"]],
  [/\b(history|founded|products?|machines?|build|make|engines?|about|company|caterpillar)\b/i, REPLIES["What does Caterpillar do?"]],
  [/\b(hi|hello|hey|help|can you|what do you)\b/i, REPLIES["What can you do?"]],
];

export function getReply(question: string): Reply {
  const exact = REPLIES[question.trim() as keyof typeof REPLIES];
  if (exact) return exact;
  for (const [pattern, reply] of KEYWORDS) {
    if (pattern.test(question)) return reply;
  }
  return FALLBACK;
}
