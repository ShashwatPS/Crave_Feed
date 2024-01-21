import { useSelector , useDispatch , useStore } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import type { RootState , AppDispatch , AppStore} from "./store"

// We will use this instead of 'useDipatch' use 'useSelector' in our application so that we dont have to define type again and again for these hooks

export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore : () => AppStore = useStore;