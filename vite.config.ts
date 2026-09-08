import { defineConfig } from 'vite';
import {defaultsAPI} from './scripts/defaults-api.mjs';
import solid from 'vite-plugin-solid';
import { resolve } from 'node:path';
export default defineConfig({
 base:'./', plugins:[solid(),{name:'supernool-defaults',configureServer(server){server.middlewares.use(defaultsAPI(process.cwd()));}}], server:{host:'127.0.0.1',port:3100,strictPort:true,watch:{ignored:['**/public/settings/**','**/.cache/**']}},
 assetsInclude:['**/*.m4a','**/*.wav','**/*.glb'],
 build:{target:'esnext',rollupOptions:{input:Object.fromEntries([
 'index.html','explorations/index.html','explorations/019-inhabited-trees/index.html','explorations/019-inhabited-trees/canopy.html','explorations/019-inhabited-trees/canopy-growth.html','explorations/019-inhabited-trees/shadow.html',
 ...['index.html','symbols.html','notes.html','avatar-review.html','audio-review.html'].map(p=>'explorations/018-painted-ground/'+p)
 ].map(p=>[p,resolve(__dirname,p)]))}}
});
