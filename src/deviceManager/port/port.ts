import {PortDict, PortSource} from "../../../types/port";
import {DeviceInfoFromApi} from "../api/device/source/deviceInfoFromApi";
import {EXCLUDEDPORT, STARTPORT} from "../constants/port";
import {DeviceStatusEnum} from "../constants/device";
import {DeviceDbManager} from "../api/device/deviceDbManager";
import {DeviceInfo} from "../../../types/device";

export class PortManager {

  static getDevicePort = () => {
    const portDict = DeviceDbManager.getInstance().fetchPortDict()
    return portDict
  }

  static allocatePort = (serial: string, ports: PortDict) => {
    const startPort = STARTPORT
    const portDict = ports
    console.log(portDict)
    if (serial in portDict) {
      return portDict[serial]
    }
    const portList = Object.values(ports)
    let nextAvailablePort = startPort + 1
    while (EXCLUDEDPORT.includes(nextAvailablePort) || portList.includes(nextAvailablePort)) {
      nextAvailablePort += 1
    }
    return nextAvailablePort
  }
}


