import { ref } from "vue";

export default function () {
  const ready = ref<boolean>(false);
  const emitKey: string = "@ready";

  const isReady = (): boolean => {
    return ready.value;
  };
  const fetched = (emit: any): void => {
    ready.value = true;
    emit(emitKey);
  };
  return {
    emitKey,
    isReady,
    fetched,
  };
}
