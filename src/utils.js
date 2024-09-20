import os from "os";

export async function getCmd() {
  const platform = os.platform();

  if (platform === "win32") {
    return "start";
  } else if (platform === "darwin") {
    return "open";
  } else if (platform === "linux") {
    return "xdg-open";
  } else {
    throw new Error("cannot recognise OS");
  }
}
