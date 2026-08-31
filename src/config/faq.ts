import { MARKETS } from "@/config/markets";

export interface FaqItem {
  question: string;
  answer: string;
  /** Which pages this question belongs on. */
  tags: ("general" | "blueprint" | "packages" | "international" | "automation")[];
}

const marketList = MARKETS.filter((m) => m.enabled)
  .map((m) => m.name)
  .join(", ")
  .replace(/, ([^,]*)$/, " and $1");

export const FAQS: FaqItem[] = [
  {
    question: "Do I need to subscribe after the $150 blueprint?",
    answer:
      "No. There is no obligation to continue. Plenty of people run the blueprint, take the plan and execute it themselves.",
    tags: ["general", "blueprint"],
  },
  {
    question: "Do I keep the research?",
    answer:
      "Yes. The strategy is yours whether or not you work with us afterwards. We do not hold it back, redact it, or make it conditional on a retainer.",
    tags: ["general", "blueprint"],
  },
  {
    question: "Can you work with one location?",
    answer:
      "Yes. The calculator works from a single location, and one location gets the same research process as a hundred.",
    tags: ["general", "packages"],
  },
  {
    question: "Can you support 100+ locations?",
    answer:
      "Yes. Above 100 locations we would rather talk about network pricing than have a calculator guess at it.",
    tags: ["general", "packages"],
  },
  {
    question: "Can you work across multiple countries?",
    answer:
      "Yes. The operating system is centralized, while strategy and execution are adapted market by market. A London plan is not a renamed Dallas plan.",
    tags: ["general", "international"],
  },
  {
    question: "Which countries do you serve?",
    answer: `${marketList}.`,
    tags: ["general", "international"],
  },
  {
    question: "Do you work in local languages?",
    answer:
      "The platform and service model are designed for localization. Availability of fully localized production is confirmed by market and scope, and translations are human reviewed before anything is published.",
    tags: ["general", "international"],
  },
  {
    question: "Is ad spend included?",
    answer:
      "No. Ad spend is always separate and paid directly by you. Management is what you buy from us.",
    tags: ["general", "packages"],
  },
  {
    question: "Can I choose only SEO?",
    answer:
      "Yes. Every module in the package builder is optional. Take one, take all of them, or take none and use your own team.",
    tags: ["general", "packages"],
  },
  {
    question: "Can individual locations use different packages?",
    answer:
      "Yes, although network-wide standards are recommended. Divergence is manageable; it is just more expensive to run and harder to compare.",
    tags: ["general", "packages"],
  },
  {
    question: "Do you replace our internal marketing team?",
    answer:
      "Sometimes. In other cases we work alongside it, usually taking the production load so the internal team can do the things only they can do.",
    tags: ["general"],
  },
  {
    question: "Are backlinks guaranteed?",
    answer:
      "Monthly link deliverables are based on agreed package scope. Premium and editorial opportunities are approved individually, because genuinely good placements can cost substantially more than a tier price.",
    tags: ["general", "packages"],
  },
  {
    question: "Do you use AI for content?",
    answer:
      "We use automation and AI internally where it helps. Every deliverable is still governed by strategy, data, quality control and your business objectives. You are buying finished work, not model output.",
    tags: ["general"],
  },
  {
    question: "Can you build custom automation?",
    answer:
      "Yes. We baseline what the current process costs, calculate the measurable saving, agree the scope, then agree the price. In that order.",
    tags: ["general", "automation"],
  },
  {
    question: "How long does a blueprint take?",
    answer:
      "One working day of analysis per location. A single location is quick. A thirty-location network is a scheduled piece of work, and we will tell you the date before you pay.",
    tags: ["blueprint"],
  },
  {
    question: "What if the blueprint says we should not spend more?",
    answer:
      "Then that is what it says. A plan that recommends fixing conversion before increasing spend is more useful than one that recommends whatever we happen to sell.",
    tags: ["blueprint"],
  },
];

export const faqsFor = (tag: FaqItem["tags"][number]): FaqItem[] =>
  FAQS.filter((f) => f.tags.includes(tag));
