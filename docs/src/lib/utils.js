export async function formatData(res) {
  return res.data.results
    .map((result) => ({
      name: result?.title || result?.original_title,
      release: result?.release_date || "",
      poster: result?.backdrop_path || result?.poster_path,
      rating: result?.vote_average || 0,
      value: result?.id,
    }))
    .filter((choice) => choice.release !== "");
}
