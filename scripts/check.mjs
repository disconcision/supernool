import {build} from 'esbuild';
import {mkdir,rm} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
await mkdir('.cache',{recursive:true});
for(const name of ['check','associativity-check','root-base-check','encounter-sequence-check','surface-pruning-check','problems-check']){
 const outfile=`.cache/${name}.cjs`;
 await build({entryPoints:[`explorations/018-painted-ground/${name}.ts`],bundle:true,platform:'node',format:'cjs',outfile});
 execFileSync(process.execPath,[outfile],{stdio:'inherit'});
 await rm(outfile);
}

execFileSync(process.execPath,['explorations/018-painted-ground/idle-catch-check.cjs'],{stdio:'inherit'});

execFileSync(process.execPath,['explorations/018-painted-ground/finger-walk-check.cjs'],{stdio:'inherit'});

execFileSync(process.execPath,['explorations/018-painted-ground/idle-roam-check.cjs'],{stdio:'inherit'});

execFileSync(process.execPath,['explorations/018-painted-ground/sound-lifecycle-check.cjs'],{stdio:'inherit'});
