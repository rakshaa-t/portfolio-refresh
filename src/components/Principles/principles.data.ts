// All principle card data in one place
export interface PrincipleData {
  id: number;
  text: string;
  rotation: number; // degrees
  position: {
    mobile: number;   // top position in px
    tablet: number;   // top position in px
    desktop: number;  // top position in px
  };
  width: {
    mobile: string;      // e.g., "85%"
    mobileMax: string;   // e.g., "420px"
    tablet: string;      // e.g., "90%"
    tabletMax: string;   // e.g., "500px"
    desktop: string;     // e.g., "533.407px" (fixed)
  };
  background: string;  // Tailwind bg class or CSS
  textColor: string;   // text-white, text-black
  shadow?: string;     // shadow classes
  isFlipped?: boolean; // scale-y-[-1]
}

export const principlesData: PrincipleData[] = [
  {
    id: 1,
    text: "My team is my fuel, if I work with you I respect you all the way",
    rotation: 4,
    position: { mobile: 138, tablet: 167, desktop: 167 },
    width: { mobile: "85%", mobileMax: "420px", tablet: "90%", tabletMax: "500px", desktop: "533.407px" },
    background: "bg-gradient-to-l from-[rgba(255,255,255,0.32)] to-[rgba(40,63,228,0.32)]",
    textColor: "text-black",
    isFlipped: true,
  },
  {
    id: 2,
    text: "Make every function aesthetic and make every aesthetic serve a function",
    rotation: -4, // 356deg = -4deg
    position: { mobile: 205, tablet: 271, desktop: 271 },
    width: { mobile: "90%", mobileMax: "480px", tablet: "95%", tabletMax: "620px", desktop: "682.088px" },
    background: "bg-[#283fe4]",
    textColor: "text-white",
    shadow: "shadow-[0px_379px_106px_0px_rgba(74,93,229,0),0px_242px_97px_0px_rgba(74,93,229,0.03),0px_136px_82px_0px_rgba(74,93,229,0.11),0px_61px_61px_0px_rgba(74,93,229,0.19),0px_15px_33px_0px_rgba(74,93,229,0.22)]",
  },
  {
    id: 3,
    text: "If there's no value exchange - it's theft. Create value, serve a purpose",
    rotation: 4,
    position: { mobile: 272, tablet: 390, desktop: 390 },
    width: { mobile: "88%", mobileMax: "450px", tablet: "92%", tabletMax: "570px", desktop: "616.784px" },
    background: "bg-[rgba(255,255,255,0.96)]",
    textColor: "text-black",
    isFlipped: true,
  },
  {
    id: 4,
    text: "Top-Tier communication, no assumptions",
    rotation: -4,
    position: { mobile: 339, tablet: 505, desktop: 505 },
    width: { mobile: "85%", mobileMax: "400px", tablet: "88%", tabletMax: "480px", desktop: "500.788px" },
    background: "bg-[rgba(0,0,0,0.64)]",
    textColor: "text-white",
    shadow: "shadow-[0px_379px_106px_0px_rgba(0,0,0,0),0px_242px_97px_0px_rgba(0,0,0,0.03),0px_136px_82px_0px_rgba(0,0,0,0.06),0px_61px_61px_0px_rgba(0,0,0,0.08),0px_15px_33px_0px_rgba(0,0,0,0.12)]",
  },
  {
    id: 5,
    text: "Work only with ethical and high integrity people",
    rotation: 4,
    position: { mobile: 406, tablet: 600, desktop: 600 },
    width: { mobile: "85%", mobileMax: "410px", tablet: "88%", tabletMax: "490px", desktop: "509.437px" },
    background: "bg-[rgba(255,255,255,0.72)]",
    textColor: "text-black",
    isFlipped: true,
  },
  {
    id: 6,
    text: "Reverse engineer everything",
    rotation: -4,
    position: { mobile: 473, tablet: 698, desktop: 698 },
    width: { mobile: "70%", mobileMax: "280px", tablet: "75%", tabletMax: "300px", desktop: "311.843px" },
    background: "bg-[rgba(255,255,255,0.22)]",
    textColor: "text-black",
  },
  {
    id: 7,
    text: "Be allergic to Mediocracy",
    rotation: 4,
    position: { mobile: 540, tablet: 783, desktop: 783 },
    width: { mobile: "75%", mobileMax: "320px", tablet: "78%", tabletMax: "350px", desktop: "369.17px" },
    background: "bg-[rgba(255,255,255,0.44)]",
    textColor: "text-black",
    isFlipped: true,
  },
  {
    id: 8,
    text: "NO bloated MVPs",
    rotation: -4,
    position: { mobile: 607, tablet: 876, desktop: 876 },
    width: { mobile: "72%", mobileMax: "290px", tablet: "75%", tabletMax: "320px", desktop: "330.007px" },
    background: "bg-[rgba(0,0,0,0.6)]",
    textColor: "text-white",
  },
  {
    id: 9,
    text: "Details. Details. Details >>",
    rotation: 4,
    position: { mobile: 674, tablet: 968, desktop: 968 },
    width: { mobile: "70%", mobileMax: "280px", tablet: "72%", tabletMax: "310px", desktop: "321.324px" },
    background: "bg-[rgba(255,255,255,0.72)]",
    textColor: "text-black",
    isFlipped: true,
  },
];

