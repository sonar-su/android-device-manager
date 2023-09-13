import {DeviceInfoFromLocalFile} from "./source/deviceInfoFromLocalFile";
import {PortSource} from "../../../../types/port";

export class DeviceDbManager extends DeviceInfoFromLocalFile {
  private static instance: PortSource
  private constructor() {
    super();
  }
  static getInstance() {
    if (!DeviceDbManager.instance) {
      DeviceDbManager.instance = new DeviceDbManager()
    }
    return DeviceDbManager.instance
  }
}
