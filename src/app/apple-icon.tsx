import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await logoDataUri();
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt="" width={180} height={180} style={{ objectFit: "cover" }} />
    ),
    { ...size },
  );
}
