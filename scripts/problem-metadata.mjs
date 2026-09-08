import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
await build({entryPoints:['explorations/018-painted-ground/generate-references.ts'],bundle:true,platform:'node',format:'cjs',outfile:'.cache/generate-references.cjs'});
execFileSync(process.execPath,['.cache/generate-references.cjs'],{stdio:'inherit'});
