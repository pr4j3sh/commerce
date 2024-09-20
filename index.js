#!/usr/bin/env node

import inquirer from "inquirer";
import { exec } from "child_process";
import { getEpisode, getMovie, getSeason, getSeries } from "./src/api.js";
import { getCmd } from "./src/utils.js";
import { exit } from "process";

async function main() {
  try {
    const CMD = await getCmd();

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "what do you want to watch?",
        choices: ["movie", "series", "exit"],
      },
    ]);

    if (!answer) {
      throw new Error("cannot handle prompt");
    }

    const choice = answer.choice;

    if (choice === "movie") {
      const query = await inquirer.prompt([
        {
          type: "input",
          name: "query",
          message: "enter movie name:",
        },
      ]);
      const id = await getMovie(query.query);

      const STREAM_URL = `https://vidsrc.icu/embed/movie/${id}`;
      exec(`${CMD} ${STREAM_URL}`, (error, stdout, stderr) => {
        if (error) {
          throw new Error(error);
        }
        if (stderr) {
          throw new Error(error);
        }
        console.log(stdout);
      });
    } else if (choice === "series") {
      // call series func
      const query = await inquirer.prompt([
        {
          type: "input",
          name: "query",
          message: "enter series name:",
        },
      ]);
      const id = await getSeries(query.query);
      const season = await getSeason(id);
      const episode = await getEpisode(id, season);

      const STREAM_URL = `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`;
      exec(`${CMD} ${STREAM_URL}`, (error, stdout, stderr) => {
        if (error) {
          throw new Error(error);
        }
        if (stderr) {
          throw new Error(error);
        }
        console.log(stdout);
      });
    } else if (choice === "exit") {
      exit();
    }
  } catch (error) {
    console.log(error);
    exit(1);
  }
}

await main();
