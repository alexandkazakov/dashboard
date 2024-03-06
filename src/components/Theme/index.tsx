import {
  useEffect,
  createContext,
  useState,
  useContext,
  ReactNode,
  FC,
} from "react";

import { SunIcon } from "../common/icons/SumIcon";
import { MoonIcon } from "../common/icons/MoonIcon";
import { CircleButton } from "../common/CircleButton";

type Themes = "light" | "dark";
type ThemeContextType = {
  theme: Themes;
  setTheme: (theme: Themes) => void;
};

interface Props {
  children: ReactNode;
}

interface SwitcherProps {
  className?: string;
}

interface ParentComposition {
  Switcher?: typeof Switcher;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme: () => ThemeContextType = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.',
    );
  }

  return context;
};

function Theme({ children }: Props & ParentComposition): JSX.Element {
  const savedTheme = localStorage.getItem("features-color-theme") as Themes;

  const [theme, setTheme] = useState<Themes>(savedTheme || "light");

  useEffect(() => {
    localStorage.setItem("features-color-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

const Switcher: FC<SwitcherProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <CircleButton
      className={className}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </CircleButton>
  );
};

Theme.Switcher = Switcher;

export default Theme;
