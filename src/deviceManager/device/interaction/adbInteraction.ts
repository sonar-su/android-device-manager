import adb from "adbkit"
import {AbsInteraction} from "./absInteraction";

export class AdbInteraction extends AbsInteraction {
  private client
  private constructor() {
    super();
  }
  private static instance: AdbInteraction
  static getInstance() {
    if (!AdbInteraction.instance) {
      AdbInteraction.instance = new AdbInteraction()
    }
    return AdbInteraction.instance
  }

  initClient() {
    this.client = adb.createClient({host: "0.0.0.0"});
  }

  getClient() {
    return this.client
  }
  alertDevice(deviceId: string) {
    this.client.shell(deviceId, "input keyevent 82")
  }
}
