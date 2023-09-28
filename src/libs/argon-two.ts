import { hash, verify } from "argon2";

export class ArgonTwo {
  constructor(private readonly secret: string) {}

  async hash(value: string) {
    return hash(value, { secret: new Buffer(this.secret) });
  }

  async compare(value: string, hash: string) {
    return verify(hash, value, { secret: new Buffer(this.secret) });
  }
}
