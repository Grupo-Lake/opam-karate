import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/brand-image";

export const alt = "OPAM KARATE — Karate Shorin Ryu em Itaquera, São Paulo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await logoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6f3ee",
          color: "#17130f",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt=""
            width={96}
            height={96}
            style={{ borderRadius: 48, objectFit: "cover" }}
          />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800 }}>
            OPAM&nbsp;<span style={{ color: "#d4232a" }}>KARATE</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 4,
              color: "#d4232a",
            }}
          >
            MATRÍCULAS ABERTAS
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            Comece sua jornada no karatê.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#5a5249" }}>
          <span>Karate Shorin Ryu · Filiado SHINSHUKAN</span>
          <span>Itaquera · São Paulo</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: "#d4232a",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
