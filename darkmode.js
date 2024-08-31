const el = document.getElementById("darkModeIcon");

var nightwind = {
  beforeTransition: () => {
    const doc = document.documentElement;
    const onTransitionDone = () => {
      doc.classList.remove("nightwind");
      doc.removeEventListener("transitionend", onTransitionDone);
    };
    doc.addEventListener("transitionend", onTransitionDone);
    if (!doc.classList.contains("nightwind")) {
      doc.classList.add("nightwind");
    }
  },

  toggle: () => {
    nightwind.beforeTransition();
    if (!document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("nightwind-mode", "dark");

      el.classList.value = "fa-solid fa-moon";
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("nightwind-mode", "light");

      el.classList.value = "fa-regular fa-sun";
    }
  },

  enable: (dark) => {
    const mode = dark ? "dark" : "light";
    const opposite = dark ? "light" : "dark";

    nightwind.beforeTransition();

    if (document.documentElement.classList.contains(opposite)) {
      document.documentElement.classList.remove(opposite);
    }
    document.documentElement.classList.add(mode);
    window.localStorage.setItem("nightwind-mode", mode);
  },
};

function setup() {
  function getInitialColorMode() {
    const persistedColorPreference =
      window.localStorage.getItem("nightwind-mode");
    const hasPersistedPreference = typeof persistedColorPreference === "string";
    if (hasPersistedPreference) {
      return persistedColorPreference;
    }
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
      return mql.matches ? "dark" : "light";
    }
    return "light";
  }

  const initialMode = getInitialColorMode();
  if (initialMode == "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  initialMode == "light"
    ? (el.classList.value = "fa-regular fa-sun")
    : (el.classList.value = "fa-solid fa-moon");
}

setup();
