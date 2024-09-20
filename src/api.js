import axios from "axios";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import config from "../config.js";

export async function getMovie(query) {
  const spinner = createSpinner("fetching movies...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      config,
    );

    const data = res.data.results;

    const choices = data
      .filter((result) => result.media_type === "movie")
      .map((result) => ({
        name: `${result.title || result.original_title} (${result.release_date.split("-")[0]})`,
        value: JSON.stringify({
          title: result.title || result.original_title,
          year: result.release_date.split("-")[0],
          id: result.id,
        }),
      }));

    spinner.success({ text: "movies fetched" });

    const movie = await inquirer.prompt([
      {
        type: "list",
        name: "movie",
        message: "Choose your movie:",
        choices,
      },
    ]);

    const { id } = JSON.parse(movie.movie);

    if (!id) {
      throw new Error("movie not found");
    }

    return id;
  } catch (error) {
    spinner.error({ text: "failed to fetch movies" });
    throw new Error("unable to get the movie", error);
  }
}
