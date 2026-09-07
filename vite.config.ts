import {sceneStorage} from './scene-tools/storage';
import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { resolve } from 'node:path';
export default defineConfig({
 base:'./', plugins:[solid(),sceneStorage()], server:{host:'127.0.0.1',port:3100,strictPort:true,watch:{ignored:['**/scenes/**']}},
 assetsInclude:['**/*.m4a','**/*.wav','**/*.glb'],
 build:{target:'esnext',rollupOptions:{input:Object.fromEntries([
 'index.html','explorations/index.html',
 ...['index.html','symbols.html','notes.html','avatar-review.html'].map(p=>'explorations/018-painted-ground/'+p)
 ].map(p=>[p,resolve(__dirname,p)]))}}
});
