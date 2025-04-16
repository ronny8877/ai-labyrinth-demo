type SentenceTemplate = (thought: string) => string;

export class Babbler {
  private sentenceTemplates: SentenceTemplate[] = [];
  private transitions: string[] = [];
  private thoughts: string[] = [];

  constructor() {
    this.transitions = [
      "Also, ",
      "Anyway, ",
      "So yeah, ",
      "Uhh, ",
      "Honestly, ",
      "Idk but ",
      "By the way, ",
      "Right? And ",
      "lol ",
      "",
    ];

    this.sentenceTemplates = [
      (t) => `Honestly, ${t} just makes so much sense.`,
      (t) => `You ever think about how ${t}? Because, like, same.`,
      (t) => `Not to be dramatic, but ${t} kinda changed everything for me.`,
      (t) => `So, basically, ${t}, right? Wild.`,
      (t) => `Anyway, ${t}. Thought you should know.`,
      (t) => `I was literally just thinking about ${t} the other day.`,
      (t) => `${t} is lowkey underrated. Highkey, actually.`,
      (t) => `Okay but… ${t}. Hear me out.`,
      (t) => `Real talk: ${t}.`,
      (t) => `Like, ${t}, and now I can't unsee it.`,

      // 🔥 New templates
      (t) => `I'm not saying ${t}, but I'm also not *not* saying it.`,
      (t) => `Tell me why ${t} sounds like a conspiracy and a fact.`,
      (t) => `Every time I hear ${t}, a neuron somewhere misfires.`,
      (t) =>
        `There's a version of me in a parallel universe that already solved ${t}.`,
      (t) => `If ${t} isn't the plot of a Black Mirror episode, it should be.`,
      (t) => `Sometimes I wake up and just think: ${t}.`,
      (t) => `If you squint hard enough, ${t} starts to make sense.`,
      (t) => `Dead serious, ${t} lives rent-free in my brain.`,
      (t) => `Can't tell if ${t} is genius or just caffeine talking.`,
      (t) => `The fact that ${t} is real should terrify you.`,
    ];

    this.thoughts = [
      "time isn't even real",
      "JavaScript is basically duct tape for the internet",
      "no one actually knows what they're doing",
      "hot take: tabs are better than spaces",
      "AI is just a mirror with autocorrect",
      "we're all just winging it tbh",
      "code is poetry, but like, in Comic Sans",
      "every meeting could've been an email",
      "cats are better than dogs and you know it",
      "the universe runs on caffeine and chaos",
      "I swear TypeScript gaslights me daily",
      "the cloud is just someone else's computer",
      "the only constant is change, except in legacy code",
      "the best part of coding is the memes",
    ];
  }

  private randomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  public addTemplate(template: SentenceTemplate) {
    this.sentenceTemplates.push(template);
  }

  public addThought(thought: string) {
    this.thoughts.push(thought);
  }

  public babble(paragraphs: number = 1): string {
    const output: string[] = [];

    for (let i = 0; i < paragraphs; i++) {
      const sentences = Math.floor(Math.random() * 3) + 2;
      const paragraph: string[] = [];
      let prevThought = "";

      for (let j = 0; j < sentences; j++) {
        let thought = this.randomItem(this.thoughts);
        while (thought === prevThought)
          thought = this.randomItem(this.thoughts);

        const sentence =
          this.randomItem(this.transitions) +
          this.randomItem(this.sentenceTemplates)(thought);

        paragraph.push(sentence);
        prevThought = thought;
      }

      output.push(paragraph.join(" "));
    }

    return output.join("\n\n");
  }
}

// Example usage:
const babbler = new Babbler();
console.log(babbler.babble(2));
console.log(babbler.babble(3));
console.log(babbler.babble(1));
