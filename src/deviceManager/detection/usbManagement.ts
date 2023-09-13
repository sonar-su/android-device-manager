import {AdbKitUsbDetection} from "./usbDetection/adbKitUsbDetection";
import {Detection} from "../../../types/detection";

export const registerUsb = (biz: string) => {
  const detection: Detection = new AdbKitUsbDetection()
  detection.registerUsb(biz)
}
