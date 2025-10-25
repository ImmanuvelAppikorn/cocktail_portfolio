import HomePage from "../components/vite_colte/home/home-page";


// This tells Next.js which QR codes exist for static export
export function generateStaticParams() {
  return [
    // { qrCode: "rose-vine" },
    // { qrCode: "gold-vine" },
    // { qrCode: "green-vine" },
    // { qrCode: "purple-vine" },
    // { qrCode: "red-vine" },
    // vite_clote
    { qrCode: "red-vine-vite" },
    { qrCode: "ferrarisagricola" },
    { qrCode: "scarpa-vine" },
  ];
}

export default function QRPage() {
  return <HomePage />;
}
