import esbuild from "esbuild";
import { tmpdir } from "os";
import { join } from "path";
import { ensureDir, readJson, remove } from "fs-extra";
import { exec } from "pkg";

(async () => {
  const project = await readJson(join(process.cwd(), "package.json"));
  const outdir = join(process.cwd(), "build");
  const outfile = join(outdir, project.name + ".js");

  await remove(outdir);
  await ensureDir(outdir);
  await esbuild.build({
    entryPoints: [join(process.cwd(), "sys", "server", "src", "index.ts")],
    bundle: true,
    platform: "node",
    outfile,
  });
  await exec([
    "-t",
    "node16-win-x64,node16-macos-arm64",
    outfile,
    "--out-path",
    outdir,
  ]);
})();
