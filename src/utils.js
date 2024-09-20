import os from "os";
import { createSpinner } from "nanospinner";
import { exit } from "process";

export async function getCmd() {
  const spinner = createSpinner("fetching os...").start();
  const platform = os.platform();

  if (platform) {
    spinner.success({ text: "os fetched" });
  }

  if (platform === "win32") {
    return "start";
  } else if (platform === "darwin") {
    return "open";
  } else if (platform === "linux") {
    return "xdg-open";
  } else {
    spinner.error({ text: "failed to fetch os" });
    exit(1);
  }
}
