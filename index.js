#!/usr/bin/env node

import inquirer from "inquirer";
import { exec } from "child_process";
import { getEpisode, getMovie, getSeason, getSeries } from "./src/api.js";
import { getCmd } from "./src/utils.js";
import { exit } from "process";

async function main() {
  try {
    const CMD = await getCmd();

    const { choice } = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "what do you want to watch?",
        choices: ["movie", "series", "exit"],
      },
    ]);

    if (choice === "movie") {
      const { query } = await inquirer.prompt([
        {
          type: "input",
          name: "query",
          message: "enter movie name:",
        },
      ]);
      const id = await getMovie(query);

      const STREAM_URL = `https://vidsrc.icu/embed/movie/${id}`;
      exec(`${CMD} ${STREAM_URL}`, (error, stdout, stderr) => {
        if (error || stderr) {
          console.error("error opening stream:", error || stderr);
          exit(1);
        }
        console.log(stdout);
      });
    } else if (choice === "series") {
      const { query } = await inquirer.prompt([
        {
          type: "input",
          name: "query",
          message: "enter series name:",
        },
      ]);
      const id = await getSeries(query);
      const season = await getSeason(id);
      const episode = await getEpisode(id, season);

      const STREAM_URL = `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
      exec(`${CMD} ${STREAM_URL}`, (error, stdout, stderr) => {
        if (error || stderr) {
          console.error("error opening stream:", error || stderr);
          exit(1);
        }
        console.log(stdout);
      });
    } else if (choice === "exit") {
      console.log("exiting...");
      exit(0);
    }
  } catch (error) {
    console.error("an error occurred:", error.message);
    exit(1);
  }
}

await main();
