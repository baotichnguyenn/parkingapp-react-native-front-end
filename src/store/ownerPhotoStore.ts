// // store/photoStore.ts
// import { create } from "zustand";

// type PhotoState = {
//   coverPhoto: string | null;
//   additionalPhotos: string[];
//   setCoverPhoto: (photo: string) => void;
//   setAdditionalPhotos: (photos: string[]) => void;
//   updateAdditionalPhoto: (index: number, photo: string) => void;
//   clearPhotos: () => void;
// };

// export const usePhotoStore = create<PhotoState>((set) => ({
//   coverPhoto: null,
//   additionalPhotos: ["", "", "", "", ""],
//   setCoverPhoto: (photo) => set({ coverPhoto: photo }),
//   setAdditionalPhotos: (photos) => set({ additionalPhotos: photos }),
//   updateAdditionalPhoto: (index, photo) =>
//     set((state) => {
//       const updated = [...state.additionalPhotos];
//       updated[index] = photo;
//       return { additionalPhotos: updated };
//     }),
//   clearPhotos: () =>
//     set({ coverPhoto: null, additionalPhotos: ["", "", "", "", ""] }),
// }));
import { create } from "zustand";

// Type representing a photo with uri, name, and type
type Photo = {
  uri: string;
  name: string;
  type: string;
};

type PhotoState = {
  coverPhoto: Photo | null;
  additionalPhotos: (Photo | null)[];
  setCoverPhoto: (photo: Photo) => void;
  setAdditionalPhotos: (photos: (Photo | null)[]) => void;
  updateAdditionalPhoto: (index: number, photo: Photo) => void;
  clearPhotos: () => void;
};

export const usePhotoStore = create<PhotoState>((set) => ({
  coverPhoto: null,
  additionalPhotos: [null, null, null, null, null], // 5 placeholders

  setCoverPhoto: (photo) => set({ coverPhoto: photo }),

  setAdditionalPhotos: (photos) => set({ additionalPhotos: photos }),

  updateAdditionalPhoto: (index, photo) =>
    set((state) => {
      const updated = [...state.additionalPhotos];
      updated[index] = photo;
      return { additionalPhotos: updated };
    }),

  clearPhotos: () =>
    set({ coverPhoto: null, additionalPhotos: [null, null, null, null, null] }),
}));
