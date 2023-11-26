import { api } from "@/data/api";
import { Product } from "@/data/types/product";
import { env } from "@/lib/env";
import { ImageResponse } from "next/og";
import colors from "tailwindcss/colors";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  });
  const products = await response.json();
  return products;
}

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const product = await getProduct(params.slug);

  const productImageURL = new URL(product.image, env.APP_URL).toString();

  return new ImageResponse(
    (
      <div
        style={{
          background: colors.zinc[950],
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={productImageURL}
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
