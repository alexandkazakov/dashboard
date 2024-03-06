import { useTheme } from "../components/Theme";

type ColorText = "#000" | "#fff";

export const useColorIcons = (): ColorText => {
  const color: ColorText = useTheme().theme === "light" ? "#000" : "#fff";
  return color;
};
