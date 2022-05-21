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
    outfile,
  });
  await exec(["-t", "node16", outfile, "--output", outdir]);
})();
