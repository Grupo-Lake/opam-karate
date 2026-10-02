import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/brand-image";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  const logo = await logoDataUri();
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt=""
        width={512}
        height={512}
        style={{ borderRadius: "50%", objectFit: "cover" }}
      />
    ),
    { ...size },
  );
}
