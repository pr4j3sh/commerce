import { Helmet } from "react-helmet";

export default function Head({ site }) {
  return (
    <Helmet>
      <meta charset="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{site?.TITLE}</title>
      <meta name="title" content={site?.TITLE} />
      <meta name="description" content={site?.DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={site?.URL} />
      <meta property="og:title" content={site?.TITLE} />
      <meta property="og:description" content={site?.CONTENT} />
      <meta property="og:image" content="/banner.jpg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={site?.URL} />
      <meta property="twitter:title" content={site?.TITLE} />
      <meta property="twitter:description" content={site?.DESCRIPTION} />
      <meta
        property="twitter:image"
        content={
          site?.URL
            ? new URL("/banner.jpg", site.URL).toString()
            : "/banner.jpg"
        }
      />
    </Helmet>
  );
}
