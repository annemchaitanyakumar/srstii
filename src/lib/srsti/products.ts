import ghee from "@/assets/product-ghee.webp";
import groundnut from "@/assets/product-groundnut.webp";
import coconut from "@/assets/product-coconut.webp";
import sesame from "@/assets/product-sesame.webp";

export interface Product {
  id: string;
  name: string;
  short: string;
  image: string;
  price: number;
  volume: string;
  smokePoint: string;
  notes: string[];
  description: string;
  trace: {
    farm: string;
    region: string;
    harvested: string;
    pressed: string;
    batch: string;
    method: string;
  };
  lab: { label: string; value: string }[];
}

export const PRODUCTS: Product[] = [
  {
    id: "ghee",
    name: "A2 Gir Cow Cultured Ghee",
    short: "Bilona Ghee",
    image: ghee,
    price: 1890,
    volume: "500 ml",
    smokePoint: "250°C",
    notes: ["Cultured curd", "Toasted brioche", "Wild honey"],
    description:
      "Hand-churned by the bilona method from cultured curd of free-grazing Gir cows. Granular, aromatic and slow-simmered over wood fire.",
    trace: {
      farm: "Gaushala Shyam Vatika",
      region: "Junagadh, Gujarat",
      harvested: "Winter milk, Oct 2026",
      pressed: "Churned 28 Oct 2026",
      batch: "SRS-GH-2610-07",
      method: "Bilona, wood-fire clarified",
    },
    lab: [
      { label: "Moisture", value: "0.12%" },
      { label: "Free fatty acids", value: "0.8%" },
      { label: "Vegetable fat (BR test)", value: "Not detected" },
      { label: "A2 beta-casein", value: "Confirmed" },
    ],
  },
  {
    id: "groundnut",
    name: "Cold-Pressed Groundnut Oil",
    short: "Groundnut",
    image: groundnut,
    price: 690,
    volume: "1 L",
    smokePoint: "225°C",
    notes: ["Roasted peanut", "Sweet earth", "Buttery finish"],
    description:
      "Bold, nutty and deeply golden — pressed from sun-dried Kadiri heirloom groundnuts in a neem-wood ghani turning at 12 rpm.",
    trace: {
      farm: "Reddy Family Farms",
      region: "Anantapur, Andhra Pradesh",
      harvested: "Kharif harvest, Sep 2026",
      pressed: "Wood-pressed 04 Nov 2026",
      batch: "SRS-GN-2611-02",
      method: "Kachi ghani, neem wood",
    },
    lab: [
      { label: "Extraction temp.", value: "31°C" },
      { label: "Hexane residue", value: "Not detected" },
      { label: "Peroxide value", value: "1.4 meq/kg" },
      { label: "Argemone oil", value: "Not detected" },
    ],
  },
  {
    id: "coconut",
    name: "Virgin Wood-Pressed Coconut Oil",
    short: "Coconut",
    image: coconut,
    price: 840,
    volume: "500 ml",
    smokePoint: "177°C",
    notes: ["Fresh coconut milk", "Vanilla", "Clean"],
    description:
      "Crystal-clear and gently fragrant. Pressed from sun-dried copra of tall West Coast palms within 48 hours of harvest.",
    trace: {
      farm: "Thekkumkara Grove",
      region: "Kasaragod, Kerala",
      harvested: "Monsoon copra, Aug 2026",
      pressed: "Wood-pressed 21 Oct 2026",
      batch: "SRS-CO-2610-11",
      method: "Kachi ghani, acacia wood",
    },
    lab: [
      { label: "Lauric acid", value: "49.2%" },
      { label: "Moisture", value: "0.08%" },
      { label: "Paraffin / mineral oil", value: "Not detected" },
      { label: "Free fatty acids", value: "0.2%" },
    ],
  },
  {
    id: "sesame",
    name: "Black Sesame Oil",
    short: "Black Sesame",
    image: sesame,
    price: 760,
    volume: "500 ml",
    smokePoint: "210°C",
    notes: ["Toasted seed", "Jaggery", "Gentle bitterness"],
    description:
      "Pressed with a sliver of palm jaggery, the old Tamil way. Rich in sesamin — cherished for abhyanga and slow-cooked kuzhambu.",
    trace: {
      farm: "Kaveri Delta Collective",
      region: "Thanjavur, Tamil Nadu",
      harvested: "Rabi harvest, Mar 2026",
      pressed: "Wood-pressed 30 Oct 2026",
      batch: "SRS-SE-2610-04",
      method: "Kachi ghani with jaggery",
    },
    lab: [
      { label: "Extraction temp.", value: "33°C" },
      { label: "Sesamin", value: "0.62%" },
      { label: "Hexane residue", value: "Not detected" },
      { label: "Peroxide value", value: "1.1 meq/kg" },
    ],
  },
];

export function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
