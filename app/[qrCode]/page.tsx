import HomePage from "../components/brandini/home/home-page";

// This tells Next.js which QR codes exist for static export
export function generateStaticParams() {
  return [
    { qrCode: "atla-vine" },
    // { qrCode: "gold-vine" },
    // { qrCode: "green-vine" },
    // { qrCode: "purple-vine" },
    // { qrCode: "red-vine" },
  ];
}

export default function QRPage() {
  return <HomePage />;
}
