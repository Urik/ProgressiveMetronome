declare module "*.wav";

declare module "rolex" {
  export default function rolex (interval: number, repetitions: number, callback: () => void);

  export = Rolex;
};