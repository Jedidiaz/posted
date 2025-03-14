import { type Metadata } from "next";

interface ITempMetadata {
  title: string;
  description: string;
}

export const generatePageMetadata = (tempMetadata: ITempMetadata): Metadata => {
  const metadata: Metadata = {
    title: tempMetadata.title,
    description: tempMetadata.description,
    openGraph: {
      title: tempMetadata.title,
      description: tempMetadata.description,
      url: `https://posted.jedidiazfagundez.com`,
      type: "website",
      images: {
        url: "social-media.jpg",
        width: "1200",
        height: "630",
        alt: "Posted cover",
      },
      siteName: "Posted",
    },
    twitter: {
      title: tempMetadata.title,
      description: tempMetadata.description,
      images: {
        url: "social-media.jpg",
        width: "1200",
        height: "630",
      },
      card: "summary_large_image",
    },
  };
  return metadata;
};
