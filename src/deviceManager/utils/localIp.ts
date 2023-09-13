import * as os from "os";
import {EXCLUDEDIP} from "../constants/ip";

export const getLocalIPAddress = () =>{
  const ifaces = os.networkInterfaces();
  let ipAddress = null;
  let foundAddress;

  try {
    Object.keys(ifaces).forEach(function (ifname) {
      ifaces[ifname].forEach(function (iface) {
        if (iface.family !== "IPv4" || iface.internal !== false) {
          return;
        }
        ipAddress = iface.address;
        if (EXCLUDEDIP.includes(Number(iface.address))) {
          throw new Error("Found matching IP address: " + iface.address);
        }
      });
    });
  } catch (e) {
    if (e.message.indexOf("Found matching IP address") !== -1) {
      foundAddress = e.message.replace("Found matching IP address: ", "");
    } else {
      throw e;
    }
  }

  if (foundAddress) {
    console.log("Matching IP address found: " + foundAddress);
  } else {
    console.log("No matching IP address found");
  }

  return ipAddress
}
