import { IIndexable } from "@/types";

export function checkObjAHasObjBKeyValue(objA: IIndexable | undefined, objB: IIndexable) {

    let count = 0;
    for (const [key, value] of Object.entries(objB)) {
      if (value.trim() === (objA as IIndexable)[key]) {
        count += 1;
      }
    }

    if (count === Object.keys(objB).length) return true;
    return false;
}

