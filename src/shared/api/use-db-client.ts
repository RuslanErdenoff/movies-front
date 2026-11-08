import { Firestore } from "firebase/firestore";
import { db } from "./firebase";

// Можно вызывать и внутри React-хуков, и на сервере в layout.tsx
export function useDbClient(): Firestore {
    return db;
}