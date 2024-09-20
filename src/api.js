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
        message: "choose a movie:",
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

export async function getSeries(query) {
  const spinner = createSpinner("fetching series...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      config,
    );

    const data = res.data.results;

    const choices = data
      .filter((result) => result.media_type === "tv")
      .map((result) => ({
        name: `${result.name || result.original_name} (${result.first_air_date.split("-")[0]})`,
        value: JSON.stringify({
          title: result.name || result.original_name,
          year: result.first_air_date.split("-")[0],
          id: result.id,
        }),
      }));

    spinner.success({ text: "series fetched" });

    const series = await inquirer.prompt([
      {
        type: "list",
        name: "series",
        message: "choose a series:",
        choices,
      },
    ]);

    const { id } = JSON.parse(series.series);

    if (!id) {
      throw new Error("series not found");
    }

    return id;
  } catch (error) {
    spinner.error({ text: "failed to fetch series" });
    throw new Error("unable to get the series", error);
  }
}

export async function getSeason(id) {
  const spinner = createSpinner("fetching seasons...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/tv/${id}?append_to_response=external_ids`,
      config,
    );

    const data = res.data.seasons;

    const choices = data
      .filter((result) => result.season_number !== 0)
      .map((result) => ({
        name: `${result.name} (${result.air_date})`,
        value: JSON.stringify({
          title: result.name,
          date: result.air_date,
          season: result.season_number,
        }),
      }));

    spinner.success({ text: "seasons fetched" });

    const series = await inquirer.prompt([
      {
        type: "list",
        name: "season",
        message: "choose a season:",
        choices,
      },
    ]);

    const { season } = JSON.parse(series.season);

    if (!season) {
      throw new Error("season not found");
    }

    return season;
  } catch (error) {
    spinner.error({ text: "failed to fetch season" });
    throw new Error("unable to get the season", error);
  }
}

export async function getEpisode(id, season) {
  const spinner = createSpinner("fetching episodes...").start();
  try {
    const res = await axios.get(
      `https://api.tmdb.org/3/tv/${id}/season/${season}`,
      config,
    );

    const data = res.data.episodes;

    const choices = data.map((result) => ({
      name: `${result.name} (${result.air_date})`,
      value: JSON.stringify({
        title: result.name,
        date: result.air_date,
        episode: result.episode_number,
      }),
    }));

    spinner.success({ text: "episodes fetched" });

    const series = await inquirer.prompt([
      {
        type: "list",
        name: "episode",
        message: "choose an episode:",
        choices,
      },
    ]);

    const { episode } = JSON.parse(series.episode);

    if (!episode) {
      throw new Error("episode not found");
    }

    return episode;
  } catch (error) {
    spinner.error({ text: "failed to fetch episode" });
    throw new Error("unable to get the episode", error);
  }
}
