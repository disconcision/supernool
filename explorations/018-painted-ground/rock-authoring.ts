import type {Group} from 'three';
import type {RockPlacement} from '../../scene-tools/schema';
export type RockAuthoring={list:()=>Group[];capture:()=>RockPlacement[];apply:(rocks:RockPlacement[])=>void;refresh:()=>void};
export let rockAuthoring:RockAuthoring|undefined;
export function registerRockAuthoring(api:RockAuthoring){rockAuthoring=api;document.dispatchEvent(new Event('scene-rocks-ready'));}
