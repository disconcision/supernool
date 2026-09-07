import type {Object3D} from 'three';
import type {RockPlacement} from '../../scene-tools/schema';
export type RockAuthoring={list:()=>Object3D[];capture:()=>RockPlacement[];apply:(rocks:RockPlacement[])=>void;refresh:()=>void};
export let rockAuthoring:RockAuthoring|undefined;
export function registerRockAuthoring(api:RockAuthoring){rockAuthoring=api;document.dispatchEvent(new Event('scene-rocks-ready'));}
