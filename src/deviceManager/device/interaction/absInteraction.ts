import {Interaction} from "../../../../types/device";

export abstract class AbsInteraction implements Interaction {
  constructor() {
    this.initClient()
  }
  abstract initClient(): void
  abstract alertDevice(deviceId: string): void
  abstract getClient(): any

}
