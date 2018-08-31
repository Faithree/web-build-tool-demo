declare let num: number;
declare function numfun(s: string): void;
declare namespace obj {
  let a: number;
  function abc(s: string): void;
}
declare function getWidget(s: number): void;
declare function getWidget(s: string): void;

interface GreetingSettings {
  greeting: string;
  duration: number;
  color?: string;
}
declare function getWidget(s: GreetingSettings): void;

type abc = string | number;

declare function greet(s: abc): void;

declare class Greeter {
  constructor();
  greeting: number;
  reduce(s: number): void;
}
