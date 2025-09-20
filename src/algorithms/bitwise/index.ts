export enum Flag {
  User = 0b1,
  Moderator = 0b10,
  Admin = 0b100,
  Owner = 0b1000,
}

export class FileDescriptor {
  descriptor: number;

  constructor(descriptor: number) {
    this.descriptor = descriptor;
  }

  addFlag(flag: Flag) {
    this.descriptor = this.descriptor | flag;
    return this.descriptor;
  }

  removeFlag(flag: Flag) {
    if (this.hasFlag(flag)) {
      this.descriptor = this.descriptor ^ flag;
      return this.descriptor;
    }
  }

  hasFlag(flag: Flag) {
    return (this.descriptor & flag) === flag;
  }
}
