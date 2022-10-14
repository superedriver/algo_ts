type Flag = 0b000 | 0b001 | 0b010 | 0b100;

export class FlagConverter {
  descriptor: number;

  constructor(descriptor: number = 0) {
    this.descriptor = descriptor;
  }

  setFlag(flag: Flag) {
    this.descriptor |= flag;
    this.descriptor;
  }

  checkFlag(flag: Flag) {
    return (this.descriptor & flag) === flag;
  }

  removeFlag(flag: Flag) {
    this.descriptor ^= flag;
    return this.descriptor;
  }
}
