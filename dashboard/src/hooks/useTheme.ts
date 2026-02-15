import { useContext } from "react";

import { ThemeContext } from "../ThemeContext";
import type { Theme } from "../ThemeContext";

export const useTheme = (): {
  theme: Theme;
  setTheme: (t: Theme) => void;
} => useContext(ThemeContext);
