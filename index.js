import inquirer from "inquirer";
import { exec } from "child_process";
import { getMovie } from "./src/api.js";
import { getCmd } from "./src/utils.js";

async function main() {
  try {
    const CMD = await getCmd();

    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "what do you want to watch?",
        choices: ["movie", "series", "anime"],
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
      const id = await getId(choice);
    } else if (choice === "anime") {
      // call anime func
      const id = await getId(choice);
    }
  } catch (error) {
    console.log(error);
  }
}

main();
