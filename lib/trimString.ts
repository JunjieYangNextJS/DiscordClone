import { IIndexable } from "@/types";


  // this works on any level of nesting
export function customTrim(o: IIndexable) {
    for (const [k, v] of Object.entries(o)) {
      if (Object(v) === v) customTrim(v);
      else if (typeof v === "string") o[k] = v.trim();
    }
    return o;
  }