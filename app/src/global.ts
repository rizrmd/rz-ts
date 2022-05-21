import type importGot from "got";

declare global {
  const got: typeof importGot;
}
