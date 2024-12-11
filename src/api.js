import axios from "axios";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import config from "./lib/config.js";
import { exit } from "process";

// Fetch movie
export async function getMovie(query) {
  const spinner = createSpinner("fetching movies...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      config,
    );

    const data = res.data.results.filter(
      (item) => item.release_date && item.release_date != "",
    );

    const choices = data.map((result) => ({
      name: `${result?.title || result?.original_title} | ${result?.release_date?.split("-")[0]}`,
      value: result?.id,
    }));

    spinner.success({ text: "movies fetched" });

    const { movie } = await inquirer.prompt([
      {
        type: "list",
        name: "movie",
        message: "choose a movie:",
        choices,
      },
    ]);

    if (!movie) {
      spinner.error({ text: "movie not found" });
      exit(1);
    }

    return movie;
  } catch (error) {
    console.error(error.message);
    spinner.error({ text: "failed to fetch movies" });
    exit(1);
  }
}

// Fetch series
export async function getSeries(query) {
  const spinner = createSpinner("fetching series...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
      config,
    );

    const choices = res.data.results.map((result) => ({
      name: `${result?.name || result?.original_name} | ${result?.first_air_date?.split("-")[0]}`,
      value: result?.id,
    }));

    spinner.success({ text: "series fetched" });

    const { series } = await inquirer.prompt([
      {
        type: "list",
        name: "series",
        message: "choose a series:",
        choices,
      },
    ]);

    if (!series) {
      spinner.error({ text: "series not found" });
      exit(1);
    }

    return series;
  } catch (error) {
    console.error(error.message);
    spinner.error({ text: "failed to fetch series" });
    exit(1);
  }
}

// Fetch season
export async function getSeason(id) {
  const spinner = createSpinner("fetching seasons...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/tv/${id}?append_to_response=external_ids`,
      config,
    );

    const choices = res.data.seasons
      .filter((season) => season.season_number !== 0)
      .map((season) => ({
        name: `Season - ${season?.season_number} | ${season?.name}`,
        value: season?.season_number,
      }));

    spinner.success({ text: "seasons fetched" });

    const { season } = await inquirer.prompt([
      {
        type: "list",
        name: "season",
        message: "choose a season:",
        choices,
      },
    ]);

    if (!season) {
      spinner.error({ text: "season not found" });
      exit(1);
    }

    return season;
  } catch (error) {
    console.error(error.message);
    spinner.error({ text: "failed to fetch season" });
    exit(1);
  }
}

// Fetch episode
export async function getEpisode(id, season) {
  const spinner = createSpinner("fetching episodes...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/tv/${id}/season/${season}`,
      config,
    );

    const choices = res.data.episodes.map((episode) => ({
      name: `Episode - ${episode?.episode_number} | ${episode?.name}`,
      value: episode?.episode_number,
    }));

    spinner.success({ text: "episodes fetched" });

    const { episode } = await inquirer.prompt([
      {
        type: "list",
        name: "episode",
        message: "choose an episode:",
        choices,
      },
    ]);

    if (!episode) {
      spinner.error({ text: "episode not found" });
      exit(1);
    }

    return episode;
  } catch (error) {
    console.error(error.message);
    spinner.error({ text: "failed to fetch episode" });
    exit(1);
  }
}
