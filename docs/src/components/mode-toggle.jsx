import { MaterialSymbolsDarkModeOutlineRounded } from "../assets/icons/dark-mode";
import { MaterialSymbolsLightModeOutlineRounded } from "../assets/icons/light-mode";
import { useTheme } from "../contexts/theme-context";

export default function ModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        <MaterialSymbolsLightModeOutlineRounded />
      ) : (
        <MaterialSymbolsDarkModeOutlineRounded />
      )}
    </button>
  );
}
