import firebase from "firebase/compat";

export const findById: any = (resources: any[], id: string) =>
  resources.find((r) => r.id === id);

export const upsert = (resources: any[], resource: any) => {
  const index = resources.findIndex((r) => r.id === resource.id);
  if (resource.id && index !== -1) {
    resources[index] = resource;
  } else {
    resources.push(resource);
  }
};

export async function fetch<T>(
  id: string,
  resource: string,
  resources: T[]
): Promise<T> {
  return new Promise<T>((resolve) => {
    firebase
      .firestore()
      .collection(resource)
      .doc(id)
      .onSnapshot((snapshot) => {
        console.log(snapshot.id);
        const item = { ...snapshot.data(), id: snapshot.id };
        upsert(resources, item);
        resolve(item as any);
      });
  });
}

export function fetchMultiple<T>(
  ids: string[],
  resource: string,
  resources: T[]
): Promise<T[]> {
  if (ids.length === 0) {
    return new Promise<T[]>((resolve) => resolve([]));
  }

  return new Promise<T[]>((resolve) => {
    firebase
      .firestore()
      .collection(resource)
      .where(firebase.firestore.FieldPath.documentId(), "in", ids)
      .get()
      .then((snapshot) => {
        console.log("snapshot");
        const items = [] as any[];
        snapshot.forEach((doc) => {
          const item = { ...doc.data(), id: doc.id };
          upsert(resources, item);
          items.push(item);
        });
        resolve(items);
      });
  });
}

export function fetchAll<T>(resource: string, resources: T[]): Promise<T[]> {
  return new Promise<T[]>((resolve) => {
    firebase
      .firestore()
      .collection(resource)
      .get()
      .then((snapshot) => {
        const items = [] as any[];
        snapshot.forEach((doc) => {
          const item = { ...doc.data(), id: doc.id };
          items.push(item);
          upsert(resources, item);
        });
        resolve(items);
      });
  });
}
