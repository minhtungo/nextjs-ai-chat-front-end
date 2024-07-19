import { atom, useAtom } from "jotai";

const LOCAL_STORAGE_KEY = "sidebar";

const sidebarStateAtom = atom({
  isOpen: window.localStorage.getItem(LOCAL_STORAGE_KEY) || true,
  isLoading: true,
});

const sidebarToggleAtom = atom(null, (get, set) => {
  const sidebarState = get(sidebarStateAtom);
  const newState = !sidebarState.isOpen;

  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  set(sidebarStateAtom, { isOpen: newState, isLoading: false });
});

// Custom hook for using sidebar state
export const useSidebar = () => {
  const [{ isOpen, isLoading }] = useAtom(sidebarStateAtom);
  const [_, toggleSidebar] = useAtom(sidebarToggleAtom);

  return { isSidebarOpen: isOpen, toggleSidebar, isLoading };
};
