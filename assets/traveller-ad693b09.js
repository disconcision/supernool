import{at as uo,au as Bt,av as Ht,a as mn,C as Ye,aw as ma,k as yt,ax as po,ay as it,az as Ze,aA as qi,aB as Ki,W as Vt,ar as tn,aC as $t,aD as rt,h as Pt,aE as bt,aF as _n,aG as ho,a3 as Xe,J as Ln,B as xn,r as Ei,aH as mo,M as xt,O as Ii,aI as nt,aJ as _o,aK as Pn,a1 as Mt,aL as go,aM as Jn,aN as zt,aO as dn,aP as gn,aQ as In,U as sn,aR as vo,Z as _a,aS as vn,z as vt,aT as Wn,V as z,ad as So,aU as xo,aV as Eo,aW as Mo,g as qt,m as St,d as Wt,aX as Gn,ab as To,aY as Xt,aZ as Rn,a_ as Qt,N as Gt,a$ as Ao,b0 as Di,b1 as Ui,b2 as Yi,b3 as Mn,b4 as bo,b5 as Ro,a6 as wo,a8 as Co,a7 as Po,b6 as yo,b7 as Lo,b8 as Io,b9 as Do,ba as Uo,bb as No,bc as Fo,bd as Oo,be as Bo,bf as Go,bg as Ho,bh as Vo,a4 as ko,bi as ji,bj as Zi,ai as $i,a5 as Hn,bk as zo,bl as Qi,bm as Wo,bn as Xn,bo as ga,bp as va,bq as wn,br as Vn,bs as Xo,bt as qo,bu as Ko,bv as Yo,bw as jo,bx as Zo,by as Sa,bz as xa,bA as Ea,bB as Ma,bC as qn,bD as Ta,bE as Aa,bF as Yn,q as wt,bG as Mi,v as ba,bH as Ra,bI as wa,bJ as Ca,bK as $o,bL as ei,bM as ti,bN as Dn,bO as Sn,bP as Pa,bQ as ya,bR as La,bS as Ia,A as Da,bT as Ua,bU as Na,bV as Fa,bW as Qo,bX as Ji,bY as Jo,bZ as es,as as ts,a0 as un,b_ as er,b$ as Lt,c0 as ns,c1 as is,c2 as rs,c3 as as,c4 as os,c5 as ss,a9 as Oa,c6 as ni,c7 as ii,c8 as ri,c9 as ai,ca as tr,cb as nr,cc as ir,cd as rr,ce as ar,cf as or,cg as sr,ch as cr,ci as lr,cj as Ti,ck as fr,cl as ur,cm as dr,cn as pr,co as hr,cp as mr,cq as _r,cr as gr,cs as vr,ct as Sr,cu as xr,cv as Er,cw as Mr,cx as Tr,cy as Ar,cz as br,cA as Rr,cB as wr,cC as Cr,cD as Pr,cE as Ai,cF as yr,cG as Et,i as Jt,cH as cs,cI as ls,cJ as Lr,cK as fs,cL as us,cM as ds,cN as ps,cO as hs,cP as ms,K as _s,cQ as gs,cR as Ba,cS as vs,cT as Ss,cU as xs,cV as Es,cW as Ms,cX as Ts,cY as bi,Q as Ge,j as Ne,cZ as As,c_ as Ri,c$ as Ga,d0 as bs,d1 as yn,d2 as Ha,d3 as Rs,P as ws,D as Cs,d4 as kt,f as Ps,ao as ys,p as Va,$ as Ls,d5 as Is,d6 as Ds,d7 as Us,d8 as oi,L as Ns,c as Ni,d9 as Fs,da as Kn,db as Os,t as Bs,dc as Gs,x as Hs,G as At,dd as Vs,de as ks,df as kn,dg as ka,dh as zs,di as Ws,dj as Ir,dk as Dr,dl as Ur,dm as Xs,l as za,Y as qs,E as si,e as Fn,dn as Ks,I as Nr,u as Ys,R as js,aa as Wa,dp as Zs}from"./three.core-6dc3b9eb.js";/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Xa(){let e=null,n=!1,t=null,i=null;function a(r,o){t(r,o),i=e.requestAnimationFrame(a)}return{start:function(){n!==!0&&t!==null&&e!==null&&(i=e.requestAnimationFrame(a),n=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),n=!1},setAnimationLoop:function(r){t=r},setContext:function(r){e=r}}}function $s(e){const n=new WeakMap;function t(s,l){const c=s.array,_=s.usage,h=c.byteLength,d=e.createBuffer();e.bindBuffer(l,d),e.bufferData(l,c,_),s.onUploadCallback();let m;if(c instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=e.HALF_FLOAT;else if(c instanceof Uint16Array)s.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=e.SHORT;else if(c instanceof Uint32Array)m=e.UNSIGNED_INT;else if(c instanceof Int32Array)m=e.INT;else if(c instanceof Int8Array)m=e.BYTE;else if(c instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:s.version,size:h}}function i(s,l,c){const _=l.array,h=l.updateRanges;if(e.bindBuffer(c,s),h.length===0)e.bufferSubData(c,0,_);else{h.sort((m,x)=>m.start-x.start);let d=0;for(let m=1;m<h.length;m++){const x=h[d],T=h[m];T.start<=x.start+x.count+1?x.count=Math.max(x.count,T.start+T.count-x.start):(++d,h[d]=T)}h.length=d+1;for(let m=0,x=h.length;m<x;m++){const T=h[m];e.bufferSubData(c,T.start*_.BYTES_PER_ELEMENT,_,T.start,T.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(s){return s.isInterleavedBufferAttribute&&(s=s.data),n.get(s)}function r(s){s.isInterleavedBufferAttribute&&(s=s.data);const l=n.get(s);l&&(e.deleteBuffer(l.buffer),n.delete(s))}function o(s,l){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const _=n.get(s);(!_||_.version<s.version)&&n.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const c=n.get(s);if(c===void 0)n.set(s,t(s,l));else if(c.version<s.version){if(c.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,s,l),c.version=s.version}}return{get:a,remove:r,update:o}}var Qs=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Js=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ec=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tc=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,nc=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ic=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,rc=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ac=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oc=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,sc=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cc=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lc=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fc=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,uc=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,dc=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,pc=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,mc=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_c=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Sc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xc=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ec=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mc=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tc=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ac=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bc=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rc=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wc=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Cc="gl_FragColor = linearToOutputTexel( gl_FragColor );",Pc=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,yc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Lc=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Ic=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Dc=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Uc=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Nc=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Fc=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Oc=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Bc=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gc=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Hc=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Vc=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kc=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zc=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Wc=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Xc=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,qc=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Kc=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Yc=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jc=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Zc=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$c=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Qc=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jc=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,el=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,tl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nl=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,il=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rl=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,al=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ol=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sl=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cl=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ll=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fl=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ul=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dl=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pl=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hl=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,ml=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_l=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,gl=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,vl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Sl=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xl=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,El=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ml=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tl=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Al=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bl=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Rl=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wl=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Cl=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Pl=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yl=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ll=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Il=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dl=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ul=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Nl=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Fl=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ol=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bl=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gl=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hl=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Vl=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,kl=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zl=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wl=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xl=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ql=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Kl=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Yl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zl=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$l=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ql=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jl=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,af=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,of=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ff=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,df=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_f=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ef=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Af=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Cf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,He={alphahash_fragment:Qs,alphahash_pars_fragment:Js,alphamap_fragment:ec,alphamap_pars_fragment:tc,alphatest_fragment:nc,alphatest_pars_fragment:ic,aomap_fragment:rc,aomap_pars_fragment:ac,batching_pars_vertex:oc,batching_vertex:sc,begin_vertex:cc,beginnormal_vertex:lc,bsdfs:fc,iridescence_fragment:uc,bumpmap_pars_fragment:dc,clipping_planes_fragment:pc,clipping_planes_pars_fragment:hc,clipping_planes_pars_vertex:mc,clipping_planes_vertex:_c,color_fragment:gc,color_pars_fragment:vc,color_pars_vertex:Sc,color_vertex:xc,common:Ec,cube_uv_reflection_fragment:Mc,defaultnormal_vertex:Tc,displacementmap_pars_vertex:Ac,displacementmap_vertex:bc,emissivemap_fragment:Rc,emissivemap_pars_fragment:wc,colorspace_fragment:Cc,colorspace_pars_fragment:Pc,envmap_fragment:yc,envmap_common_pars_fragment:Lc,envmap_pars_fragment:Ic,envmap_pars_vertex:Dc,envmap_physical_pars_fragment:Wc,envmap_vertex:Uc,fog_vertex:Nc,fog_pars_vertex:Fc,fog_fragment:Oc,fog_pars_fragment:Bc,gradientmap_pars_fragment:Gc,lightmap_pars_fragment:Hc,lights_lambert_fragment:Vc,lights_lambert_pars_fragment:kc,lights_pars_begin:zc,lights_toon_fragment:Xc,lights_toon_pars_fragment:qc,lights_phong_fragment:Kc,lights_phong_pars_fragment:Yc,lights_physical_fragment:jc,lights_physical_pars_fragment:Zc,lights_fragment_begin:$c,lights_fragment_maps:Qc,lights_fragment_end:Jc,lightprobes_pars_fragment:el,logdepthbuf_fragment:tl,logdepthbuf_pars_fragment:nl,logdepthbuf_pars_vertex:il,logdepthbuf_vertex:rl,map_fragment:al,map_pars_fragment:ol,map_particle_fragment:sl,map_particle_pars_fragment:cl,metalnessmap_fragment:ll,metalnessmap_pars_fragment:fl,morphinstance_vertex:ul,morphcolor_vertex:dl,morphnormal_vertex:pl,morphtarget_pars_vertex:hl,morphtarget_vertex:ml,normal_fragment_begin:_l,normal_fragment_maps:gl,normal_pars_fragment:vl,normal_pars_vertex:Sl,normal_vertex:xl,normalmap_pars_fragment:El,clearcoat_normal_fragment_begin:Ml,clearcoat_normal_fragment_maps:Tl,clearcoat_pars_fragment:Al,iridescence_pars_fragment:bl,opaque_fragment:Rl,packing:wl,premultiplied_alpha_fragment:Cl,project_vertex:Pl,dithering_fragment:yl,dithering_pars_fragment:Ll,roughnessmap_fragment:Il,roughnessmap_pars_fragment:Dl,shadowmap_pars_fragment:Ul,shadowmap_pars_vertex:Nl,shadowmap_vertex:Fl,shadowmask_pars_fragment:Ol,skinbase_vertex:Bl,skinning_pars_vertex:Gl,skinning_vertex:Hl,skinnormal_vertex:Vl,specularmap_fragment:kl,specularmap_pars_fragment:zl,tonemapping_fragment:Wl,tonemapping_pars_fragment:Xl,transmission_fragment:ql,transmission_pars_fragment:Kl,uv_pars_fragment:Yl,uv_pars_vertex:jl,uv_vertex:Zl,worldpos_vertex:$l,background_vert:Ql,background_frag:Jl,backgroundCube_vert:ef,backgroundCube_frag:tf,cube_vert:nf,cube_frag:rf,depth_vert:af,depth_frag:of,distance_vert:sf,distance_frag:cf,equirect_vert:lf,equirect_frag:ff,linedashed_vert:uf,linedashed_frag:df,meshbasic_vert:pf,meshbasic_frag:hf,meshlambert_vert:mf,meshlambert_frag:_f,meshmatcap_vert:gf,meshmatcap_frag:vf,meshnormal_vert:Sf,meshnormal_frag:xf,meshphong_vert:Ef,meshphong_frag:Mf,meshphysical_vert:Tf,meshphysical_frag:Af,meshtoon_vert:bf,meshtoon_frag:Rf,points_vert:wf,points_frag:Cf,shadow_vert:Pf,shadow_frag:yf,sprite_vert:Lf,sprite_frag:If},he={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new z},probesMax:{value:new z},probesResolution:{value:new z}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Ot={basic:{uniforms:Et([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Et([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Et([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Et([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Et([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ye(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Et([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Et([he.points,he.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Et([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Et([he.common,he.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Et([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Et([he.sprite,he.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:Et([he.common,he.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:Et([he.lights,he.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};Ot.physical={uniforms:Et([Ot.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const On={r:0,b:0,g:0},Df=new yt,qa=new Xe;qa.set(-1,0,0,0,1,0,0,0,1);function Uf(e,n,t,i,a,r){const o=new Ye(0);let s=a===!0?0:1,l,c,_=null,h=0,d=null;function m(b){let C=b.isScene===!0?b.background:null;if(C&&C.isTexture){const S=b.backgroundBlurriness>0;C=n.get(C,S)}return C}function x(b){let C=!1;const S=m(b);S===null?p(o,s):S&&S.isColor&&(p(S,1),C=!0);const A=e.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(e.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function T(b,C){const S=m(C);S&&(S.isCubeTexture||S.mapping===Yn)?(c===void 0&&(c=new xt(new wt(1,1,1),new qt({name:"BackgroundCubeMaterial",uniforms:Mi(Ot.backgroundCube.uniforms),vertexShader:Ot.backgroundCube.vertexShader,fragmentShader:Ot.backgroundCube.fragmentShader,side:bt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Df.makeRotationFromEuler(C.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(qa),c.material.toneMapped=rt.getTransfer(S.colorSpace)!==nt,(_!==S||h!==S.version||d!==e.toneMapping)&&(c.material.needsUpdate=!0,_=S,h=S.version,d=e.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new xt(new ba(2,2),new qt({name:"BackgroundMaterial",uniforms:Mi(Ot.background.uniforms),vertexShader:Ot.background.vertexShader,fragmentShader:Ot.background.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=rt.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(_!==S||h!==S.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,_=S,h=S.version,d=e.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,C){b.getRGB(On,Ra(e)),t.buffers.color.setClear(On.r,On.g,On.b,C,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,C=1){o.set(b),s=C,p(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(b){s=b,p(o,s)},render:x,addToRenderList:T,dispose:f}}function Nf(e,n){const t=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=d(null);let r=a,o=!1;function s(y,N,$,Z,O){let X=!1;const D=h(y,Z,$,N);r!==D&&(r=D,c(r.object)),X=m(y,Z,$,O),X&&x(y,Z,$,O),O!==null&&n.update(O,e.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,S(y,N,$,Z),O!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,n.get(O).buffer))}function l(){return e.createVertexArray()}function c(y){return e.bindVertexArray(y)}function _(y){return e.deleteVertexArray(y)}function h(y,N,$,Z){const O=Z.wireframe===!0;let X=i[N.id];X===void 0&&(X={},i[N.id]=X);const D=y.isInstancedMesh===!0?y.id:0;let B=X[D];B===void 0&&(B={},X[D]=B);let ee=B[$.id];ee===void 0&&(ee={},B[$.id]=ee);let j=ee[O];return j===void 0&&(j=d(l()),ee[O]=j),j}function d(y){const N=[],$=[],Z=[];for(let O=0;O<t;O++)N[O]=0,$[O]=0,Z[O]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:$,attributeDivisors:Z,object:y,attributes:{},index:null}}function m(y,N,$,Z){const O=r.attributes,X=N.attributes;let D=0;const B=$.getAttributes();for(const ee in B)if(B[ee].location>=0){const J=O[ee];let oe=X[ee];if(oe===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(oe=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(oe=y.instanceColor)),J===void 0||J.attribute!==oe||oe&&J.data!==oe.data)return!0;D++}return r.attributesNum!==D||r.index!==Z}function x(y,N,$,Z){const O={},X=N.attributes;let D=0;const B=$.getAttributes();for(const ee in B)if(B[ee].location>=0){let J=X[ee];J===void 0&&(ee==="instanceMatrix"&&y.instanceMatrix&&(J=y.instanceMatrix),ee==="instanceColor"&&y.instanceColor&&(J=y.instanceColor));const oe={};oe.attribute=J,J&&J.data&&(oe.data=J.data),O[ee]=oe,D++}r.attributes=O,r.attributesNum=D,r.index=Z}function T(){const y=r.newAttributes;for(let N=0,$=y.length;N<$;N++)y[N]=0}function p(y){f(y,0)}function f(y,N){const $=r.newAttributes,Z=r.enabledAttributes,O=r.attributeDivisors;$[y]=1,Z[y]===0&&(e.enableVertexAttribArray(y),Z[y]=1),O[y]!==N&&(e.vertexAttribDivisor(y,N),O[y]=N)}function b(){const y=r.newAttributes,N=r.enabledAttributes;for(let $=0,Z=N.length;$<Z;$++)N[$]!==y[$]&&(e.disableVertexAttribArray($),N[$]=0)}function C(y,N,$,Z,O,X,D){D===!0?e.vertexAttribIPointer(y,N,$,O,X):e.vertexAttribPointer(y,N,$,Z,O,X)}function S(y,N,$,Z){T();const O=Z.attributes,X=$.getAttributes(),D=N.defaultAttributeValues;for(const B in X){const ee=X[B];if(ee.location>=0){let j=O[B];if(j===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(j=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(j=y.instanceColor)),j!==void 0){const J=j.normalized,oe=j.itemSize,ae=n.get(j);if(ae===void 0)continue;const Ae=ae.buffer,ue=ae.type,q=ae.bytesPerElement,se=ue===e.INT||ue===e.UNSIGNED_INT||j.gpuType===wa;if(j.isInterleavedBufferAttribute){const re=j.data,Pe=re.stride,De=j.offset;if(re.isInstancedInterleavedBuffer){for(let Le=0;Le<ee.locationSize;Le++)f(ee.location+Le,re.meshPerAttribute);y.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Le=0;Le<ee.locationSize;Le++)p(ee.location+Le);e.bindBuffer(e.ARRAY_BUFFER,Ae);for(let Le=0;Le<ee.locationSize;Le++)C(ee.location+Le,oe/ee.locationSize,ue,J,Pe*q,(De+oe/ee.locationSize*Le)*q,se)}else{if(j.isInstancedBufferAttribute){for(let re=0;re<ee.locationSize;re++)f(ee.location+re,j.meshPerAttribute);y.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let re=0;re<ee.locationSize;re++)p(ee.location+re);e.bindBuffer(e.ARRAY_BUFFER,Ae);for(let re=0;re<ee.locationSize;re++)C(ee.location+re,oe/ee.locationSize,ue,J,oe*q,oe/ee.locationSize*re*q,se)}}else if(D!==void 0){const J=D[B];if(J!==void 0)switch(J.length){case 2:e.vertexAttrib2fv(ee.location,J);break;case 3:e.vertexAttrib3fv(ee.location,J);break;case 4:e.vertexAttrib4fv(ee.location,J);break;default:e.vertexAttrib1fv(ee.location,J)}}}}b()}function A(){E();for(const y in i){const N=i[y];for(const $ in N){const Z=N[$];for(const O in Z){const X=Z[O];for(const D in X)_(X[D].object),delete X[D];delete Z[O]}}delete i[y]}}function R(y){if(i[y.id]===void 0)return;const N=i[y.id];for(const $ in N){const Z=N[$];for(const O in Z){const X=Z[O];for(const D in X)_(X[D].object),delete X[D];delete Z[O]}}delete i[y.id]}function w(y){for(const N in i){const $=i[N];for(const Z in $){const O=$[Z];if(O[y.id]===void 0)continue;const X=O[y.id];for(const D in X)_(X[D].object),delete X[D];delete O[y.id]}}}function g(y){for(const N in i){const $=i[N],Z=y.isInstancedMesh===!0?y.id:0,O=$[Z];if(O!==void 0){for(const X in O){const D=O[X];for(const B in D)_(D[B].object),delete D[B];delete O[X]}delete $[Z],Object.keys($).length===0&&delete i[N]}}}function E(){P(),o=!0,r!==a&&(r=a,c(r.object))}function P(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:s,reset:E,resetDefaultState:P,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:g,releaseStatesOfProgram:w,initAttributes:T,enableAttribute:p,disableUnusedAttributes:b}}function Ff(e,n,t){let i;function a(l){i=l}function r(l,c){e.drawArrays(i,l,c),t.update(c,i,1)}function o(l,c,_){_!==0&&(e.drawArraysInstanced(i,l,c,_),t.update(c,i,_))}function s(l,c,_){if(_===0)return;n.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,_);let d=0;for(let m=0;m<_;m++)d+=c[m];t.update(d,i,1)}this.setMode=a,this.render=r,this.renderInstances=o,this.renderMultiDraw=s}function Of(e,n,t,i){let a;function r(){if(a!==void 0)return a;if(n.has("EXT_texture_filter_anisotropic")===!0){const w=n.get("EXT_texture_filter_anisotropic");a=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function o(w){return!(w!==zt&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(w){const g=w===tn&&(n.has("EXT_color_buffer_half_float")||n.has("EXT_color_buffer_float"));return!(w!==Bt&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Qt&&!g)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const _=l(c);_!==c&&(Ze("WebGLRenderer:",c,"not supported, using",_,"instead."),c=_);const h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&n.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),b=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),C=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),A=e.getParameter(e.MAX_SAMPLES),R=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:s,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:m,maxVertexTextures:x,maxTextureSize:T,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:b,maxVaryings:C,maxFragmentUniforms:S,maxSamples:A,samples:R}}function Bf(e){const n=this;let t=null,i=0,a=!1,r=!1;const o=new So,s=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||i!==0||a;return a=d,i=h.length,m},this.beginShadows=function(){r=!0,_(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=_(h,d,0)},this.setState=function(h,d,m){const x=h.clippingPlanes,T=h.clipIntersection,p=h.clipShadows,f=e.get(h);if(!a||x===null||x.length===0||r&&!p)r?_(null):c();else{const b=r?0:i,C=b*4;let S=f.clippingState||null;l.value=S,S=_(x,d,C,m);for(let A=0;A!==C;++A)S[A]=t[A];f.clippingState=S,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),n.numPlanes=i,n.numIntersection=0}function _(h,d,m,x){const T=h!==null?h.length:0;let p=null;if(T!==0){if(p=l.value,x!==!0||p===null){const f=m+T*4,b=d.matrixWorldInverse;s.getNormalMatrix(b),(p===null||p.length<f)&&(p=new Float32Array(f));for(let C=0,S=m;C!==T;++C,S+=4)o.copy(h[C]).applyMatrix4(b,s),o.normal.toArray(p,S),p[S+3]=o.constant}l.value=p,l.needsUpdate=!0}return n.numPlanes=T,n.numIntersection=0,p}}const en=4,Fr=[.125,.215,.35,.446,.526,.582],on=20,Gf=256,Tn=new Ii,Or=new Ye;let ci=null,li=0,fi=0,ui=!1;const Hf=new z;class Br{constructor(n){this._renderer=n,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(n,t=0,i=.1,a=100,r={}){const{size:o=256,position:s=Hf}=r;ci=this._renderer.getRenderTarget(),li=this._renderer.getActiveCubeFace(),fi=this._renderer.getActiveMipmapLevel(),ui=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(n,i,a,l,s),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(n,t=null){return this._fromTexture(n,t)}fromCubemap(n,t=null){return this._fromTexture(n,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Vr(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hr(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(n){this._lodMax=Math.floor(Math.log2(n)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let n=0;n<this._lodMeshes.length;n++)this._lodMeshes[n].geometry.dispose()}_cleanup(n){this._renderer.setRenderTarget(ci,li,fi),this._renderer.xr.enabled=ui,n.scissorTest=!1,fn(n,0,0,n.width,n.height)}_fromTexture(n,t){n.mapping===Dn||n.mapping===Sn?this._setSize(n.image.length===0?16:n.image[0].width||n.image[0].image.width):this._setSize(n.image.width/4),ci=this._renderer.getRenderTarget(),li=this._renderer.getActiveCubeFace(),fi=this._renderer.getActiveMipmapLevel(),ui=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(n,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const n=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:vt,minFilter:vt,generateMipmaps:!1,type:tn,format:zt,colorSpace:Lt,depthBuffer:!1},a=Gr(n,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==n||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gr(n,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Vf(r)),this._blurMaterial=zf(r,n,t),this._ggxMaterial=kf(r,n,t)}return a}_compileMaterial(n){const t=new xt(new xn,n);this._renderer.compile(t,Tn)}_sceneToCubeUV(n,t,i,a,r){const l=new Pn(90,1,t,i),c=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,m=h.toneMapping;h.getClearColor(Or),h.toneMapping=Ht,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new xt(new wt,new Jt({name:"PMREM.Background",side:bt,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,p=T.material;let f=!1;const b=n.background;b?b.isColor&&(p.color.copy(b),n.background=null,f=!0):(p.color.copy(Or),f=!0);for(let C=0;C<6;C++){const S=C%3;S===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+_[C],r.y,r.z)):S===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+_[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+_[C]));const A=this._cubeSize;fn(a,S*A,C>2?A:0,A,A),h.setRenderTarget(a),f&&h.render(T,l),h.render(n,l)}h.toneMapping=m,h.autoClear=d,n.background=b}_textureToCubeUV(n,t){const i=this._renderer,a=n.mapping===Dn||n.mapping===Sn;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Vr()),this._cubemapMaterial.uniforms.flipEnvMap.value=n.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hr());const r=a?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;const s=r.uniforms;s.envMap.value=n;const l=this._cubeSize;fn(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Tn)}_applyPMREM(n){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let r=1;r<a;r++)this._applyGGXFilter(n,r-1,r);t.autoClear=i}_applyGGXFilter(n,t,i){const a=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,s=this._lodMeshes[i];s.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),_=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-_*_),d=0+c*1.25,m=h*d,{_lodMax:x}=this,T=this._sizeLods[i],p=3*T*(i>x-en?i-x+en:0),f=4*(this._cubeSize-T);l.envMap.value=n.texture,l.roughness.value=m,l.mipInt.value=x-t,fn(r,p,f,3*T,2*T),a.setRenderTarget(r),a.render(s,Tn),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-i,fn(n,p,f,3*T,2*T),a.setRenderTarget(n),a.render(s,Tn)}_blur(n,t,i,a,r){const o=this._pingPongRenderTarget;this._halfBlur(n,o,t,i,a,"latitudinal",r),this._halfBlur(o,n,i,i,a,"longitudinal",r)}_halfBlur(n,t,i,a,r,o,s){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&it("blur direction must be either latitudinal or longitudinal!");const _=3,h=this._lodMeshes[a];h.material=c;const d=c.uniforms,m=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*on-1),T=r/x,p=isFinite(r)?1+Math.floor(_*T):on;p>on&&Ze(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${on}`);const f=[];let b=0;for(let w=0;w<on;++w){const g=w/T,E=Math.exp(-g*g/2);f.push(E),w===0?b+=E:w<p&&(b+=2*E)}for(let w=0;w<f.length;w++)f[w]=f[w]/b;d.envMap.value=n.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=o==="latitudinal",s&&(d.poleAxis.value=s);const{_lodMax:C}=this;d.dTheta.value=x,d.mipInt.value=C-i;const S=this._sizeLods[a],A=3*S*(a>C-en?a-C+en:0),R=4*(this._cubeSize-S);fn(t,A,R,3*S,2*S),l.setRenderTarget(t),l.render(h,Tn)}}function Vf(e){const n=[],t=[],i=[];let a=e;const r=e-en+1+Fr.length;for(let o=0;o<r;o++){const s=Math.pow(2,a);n.push(s);let l=1/s;o>e-en?l=Fr[o-e+en-1]:o===0&&(l=0),t.push(l);const c=1/(s-2),_=-c,h=1+c,d=[_,_,h,_,h,h,_,_,h,h,_,h],m=6,x=6,T=3,p=2,f=1,b=new Float32Array(T*x*m),C=new Float32Array(p*x*m),S=new Float32Array(f*x*m);for(let R=0;R<m;R++){const w=R%3*2/3-1,g=R>2?0:-1,E=[w,g,0,w+2/3,g,0,w+2/3,g+1,0,w,g,0,w+2/3,g+1,0,w,g+1,0];b.set(E,T*x*R),C.set(d,p*x*R);const P=[R,R,R,R,R,R];S.set(P,f*x*R)}const A=new xn;A.setAttribute("position",new Wt(b,T)),A.setAttribute("uv",new Wt(C,p)),A.setAttribute("faceIndex",new Wt(S,f)),i.push(new xt(A,null)),a>en&&a--}return{lodMeshes:i,sizeLods:n,sigmas:t}}function Gr(e,n,t){const i=new Vt(e,n,t);return i.texture.mapping=Yn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fn(e,n,t,i,a){e.viewport.set(n,t,i,a),e.scissor.set(n,t,i,a)}function kf(e,n,t){return new qt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Gf,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jn(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Xt,depthTest:!1,depthWrite:!1})}function zf(e,n,t){const i=new Float32Array(on),a=new z(0,1,0);return new qt({name:"SphericalGaussianBlur",defines:{n:on,CUBEUV_TEXEL_WIDTH:1/n,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Xt,depthTest:!1,depthWrite:!1})}function Hr(){return new qt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Xt,depthTest:!1,depthWrite:!1})}function Vr(){return new qt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jn(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xt,depthTest:!1,depthWrite:!1})}function jn(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ka extends Vt{constructor(n=1,t={}){super(n,n,t),this.isWebGLCubeRenderTarget=!0;const i={width:n,height:n,depth:1},a=[i,i,i,i,i,i];this.texture=new Ca(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(n,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new wt(5,5,5),r=new qt({name:"CubemapFromEquirect",uniforms:Mi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bt,blending:Xt});r.uniforms.tEquirect.value=t;const o=new xt(a,r),s=t.minFilter;return t.minFilter===$t&&(t.minFilter=vt),new $o(1,10,this).update(n,o),t.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(n,t=!0,i=!0,a=!0){const r=n.getRenderTarget();for(let o=0;o<6;o++)n.setRenderTarget(this,o),n.clear(t,i,a);n.setRenderTarget(r)}}function Wf(e){let n=new WeakMap,t=new WeakMap,i=null;function a(d,m=!1){return d==null?null:m?o(d):r(d)}function r(d){if(d&&d.isTexture){const m=d.mapping;if(m===ei||m===ti)if(n.has(d)){const x=n.get(d).texture;return s(x,d.mapping)}else{const x=d.image;if(x&&x.height>0){const T=new Ka(x.height);return T.fromEquirectangularTexture(e,d),n.set(d,T),d.addEventListener("dispose",c),s(T.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const m=d.mapping,x=m===ei||m===ti,T=m===Dn||m===Sn;if(x||T){let p=t.get(d);const f=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new Br(e)),p=x?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const b=d.image;return x&&b&&b.height>0||T&&b&&l(b)?(i===null&&(i=new Br(e)),p=x?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",_),p.texture):null}}}return d}function s(d,m){return m===ei?d.mapping=Dn:m===ti&&(d.mapping=Sn),d}function l(d){let m=0;const x=6;for(let T=0;T<x;T++)d[T]!==void 0&&m++;return m===x}function c(d){const m=d.target;m.removeEventListener("dispose",c);const x=n.get(m);x!==void 0&&(n.delete(m),x.dispose())}function _(d){const m=d.target;m.removeEventListener("dispose",_);const x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(){n=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function Xf(e){const n={};function t(i){if(n[i]!==void 0)return n[i];const a=e.getExtension(i);return n[i]=a,a}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const a=t(i);return a===null&&xo("WebGLRenderer: "+i+" extension not supported."),a}}}function qf(e,n,t,i){const a={},r=new WeakMap;function o(h){const d=h.target;d.index!==null&&n.remove(d.index);for(const x in d.attributes)n.remove(d.attributes[x]);d.removeEventListener("dispose",o),delete a[d.id];const m=r.get(d);m&&(n.remove(m),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function s(h,d){return a[d.id]===!0||(d.addEventListener("dispose",o),a[d.id]=!0,t.memory.geometries++),d}function l(h){const d=h.attributes;for(const m in d)n.update(d[m],e.ARRAY_BUFFER)}function c(h){const d=[],m=h.index,x=h.attributes.position;let T=0;if(x===void 0)return;if(m!==null){const b=m.array;T=m.version;for(let C=0,S=b.length;C<S;C+=3){const A=b[C+0],R=b[C+1],w=b[C+2];d.push(A,R,R,w,w,A)}}else{const b=x.array;T=x.version;for(let C=0,S=b.length/3-1;C<S;C+=3){const A=C+0,R=C+1,w=C+2;d.push(A,R,R,w,w,A)}}const p=new(x.count>=65535?cs:ls)(d,1);p.version=T;const f=r.get(h);f&&n.remove(f),r.set(h,p)}function _(h){const d=r.get(h);if(d){const m=h.index;m!==null&&d.version<m.version&&c(h)}else c(h);return r.get(h)}return{get:s,update:l,getWireframeAttribute:_}}function Kf(e,n,t){let i;function a(h){i=h}let r,o;function s(h){r=h.type,o=h.bytesPerElement}function l(h,d){e.drawElements(i,d,r,h*o),t.update(d,i,1)}function c(h,d,m){m!==0&&(e.drawElementsInstanced(i,d,r,h*o,m),t.update(d,i,m))}function _(h,d,m){if(m===0)return;n.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,m);let T=0;for(let p=0;p<m;p++)T+=d[p];t.update(T,i,1)}this.setMode=a,this.setIndex=s,this.render=l,this.renderInstances=c,this.renderMultiDraw=_}function Yf(e){const n={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,s){switch(t.calls++,o){case e.TRIANGLES:t.triangles+=s*(r/3);break;case e.LINES:t.lines+=s*(r/2);break;case e.LINE_STRIP:t.lines+=s*(r-1);break;case e.LINE_LOOP:t.lines+=s*r;break;case e.POINTS:t.points+=s*r;break;default:it("WebGLInfo: Unknown draw mode:",o);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:n,render:t,programs:null,autoReset:!0,reset:a,update:i}}function jf(e,n,t){const i=new WeakMap,a=new Mt;function r(o,s,l){const c=o.morphTargetInfluences,_=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,h=_!==void 0?_.length:0;let d=i.get(s);if(d===void 0||d.count!==h){let E=function(){w.dispose(),i.delete(s),s.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const m=s.morphAttributes.position!==void 0,x=s.morphAttributes.normal!==void 0,T=s.morphAttributes.color!==void 0,p=s.morphAttributes.position||[],f=s.morphAttributes.normal||[],b=s.morphAttributes.color||[];let C=0;m===!0&&(C=1),x===!0&&(C=2),T===!0&&(C=3);let S=s.attributes.position.count*C,A=1;S>n.maxTextureSize&&(A=Math.ceil(S/n.maxTextureSize),S=n.maxTextureSize);const R=new Float32Array(S*A*4*h),w=new Pa(R,S,A,h);w.type=Qt,w.needsUpdate=!0;const g=C*4;for(let P=0;P<h;P++){const y=p[P],N=f[P],$=b[P],Z=S*A*4*P;for(let O=0;O<y.count;O++){const X=O*g;m===!0&&(a.fromBufferAttribute(y,O),R[Z+X+0]=a.x,R[Z+X+1]=a.y,R[Z+X+2]=a.z,R[Z+X+3]=0),x===!0&&(a.fromBufferAttribute(N,O),R[Z+X+4]=a.x,R[Z+X+5]=a.y,R[Z+X+6]=a.z,R[Z+X+7]=0),T===!0&&(a.fromBufferAttribute($,O),R[Z+X+8]=a.x,R[Z+X+9]=a.y,R[Z+X+10]=a.z,R[Z+X+11]=$.itemSize===4?a.w:1)}}d={count:h,texture:w,size:new St(S,A)},i.set(s,d),s.addEventListener("dispose",E)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",o.morphTexture,t);else{let m=0;for(let T=0;T<c.length;T++)m+=c[T];const x=s.morphTargetsRelative?1:1-m;l.getUniforms().setValue(e,"morphTargetBaseInfluence",x),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(e,"morphTargetsTextureSize",d.size)}return{update:r}}function Zf(e,n,t,i,a){let r=new WeakMap;function o(c){const _=a.render.frame,h=c.geometry,d=n.get(c,h);if(r.get(d)!==_&&(n.update(d),r.set(d,_)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==_&&(t.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,_))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==_&&(m.update(),r.set(m,_))}return d}function s(){r=new WeakMap}function l(c){const _=c.target;_.removeEventListener("dispose",l),i.releaseStatesOfObject(_),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:o,dispose:s}}const $f={[ya]:"LINEAR_TONE_MAPPING",[La]:"REINHARD_TONE_MAPPING",[Ia]:"CINEON_TONE_MAPPING",[Da]:"ACES_FILMIC_TONE_MAPPING",[Ua]:"AGX_TONE_MAPPING",[Na]:"NEUTRAL_TONE_MAPPING",[Fa]:"CUSTOM_TONE_MAPPING"};function Qf(e,n,t,i,a,r){const o=new Vt(n,t,{type:e,depthBuffer:a,stencilBuffer:r,samples:i?4:0,depthTexture:a?new Ln(n,t):void 0}),s=new Vt(n,t,{type:tn,depthBuffer:!1,stencilBuffer:!1}),l=new xn;l.setAttribute("position",new Ei([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ei([0,2,0,0,2,0],2));const c=new mo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new xt(l,c),h=new Ii(-1,1,1,-1,0,1);let d=null,m=null,x=!1,T,p=null,f=[],b=!1;this.setSize=function(C,S){o.setSize(C,S),s.setSize(C,S);for(let A=0;A<f.length;A++){const R=f[A];R.setSize&&R.setSize(C,S)}},this.setEffects=function(C){f=C,b=f.length>0&&f[0].isRenderPass===!0;const S=o.width,A=o.height;for(let R=0;R<f.length;R++){const w=f[R];w.setSize&&w.setSize(S,A)}},this.begin=function(C,S){if(x||C.toneMapping===Ht&&f.length===0)return!1;if(p=S,S!==null){const A=S.width,R=S.height;(o.width!==A||o.height!==R)&&this.setSize(A,R)}return b===!1&&C.setRenderTarget(o),T=C.toneMapping,C.toneMapping=Ht,!0},this.hasRenderPass=function(){return b},this.end=function(C,S){C.toneMapping=T,x=!0;let A=o,R=s;for(let w=0;w<f.length;w++){const g=f[w];if(g.enabled!==!1&&(g.render(C,R,A,S),g.needsSwap!==!1)){const E=A;A=R,R=E}}if(d!==C.outputColorSpace||m!==C.toneMapping){d=C.outputColorSpace,m=C.toneMapping,c.defines={},rt.getTransfer(d)===nt&&(c.defines.SRGB_TRANSFER="");const w=$f[m];w&&(c.defines[w]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,C.setRenderTarget(p),C.render(_,h),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),l.dispose(),c.dispose()}}const Ya=new bi,wi=new Ln(1,1),ja=new Pa,Za=new xs,$a=new Ca,kr=[],zr=[],Wr=new Float32Array(16),Xr=new Float32Array(9),qr=new Float32Array(4);function En(e,n,t){const i=e[0];if(i<=0||i>0)return e;const a=n*t;let r=kr[a];if(r===void 0&&(r=new Float32Array(a),kr[a]=r),n!==0){i.toArray(r,0);for(let o=1,s=0;o!==n;++o)s+=t,e[o].toArray(r,s)}return r}function mt(e,n){if(e.length!==n.length)return!1;for(let t=0,i=e.length;t<i;t++)if(e[t]!==n[t])return!1;return!0}function _t(e,n){for(let t=0,i=n.length;t<i;t++)e[t]=n[t]}function Zn(e,n){let t=zr[n];t===void 0&&(t=new Int32Array(n),zr[n]=t);for(let i=0;i!==n;++i)t[i]=e.allocateTextureUnit();return t}function Jf(e,n){const t=this.cache;t[0]!==n&&(e.uniform1f(this.addr,n),t[0]=n)}function eu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2f(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(mt(t,n))return;e.uniform2fv(this.addr,n),_t(t,n)}}function tu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3f(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else if(n.r!==void 0)(t[0]!==n.r||t[1]!==n.g||t[2]!==n.b)&&(e.uniform3f(this.addr,n.r,n.g,n.b),t[0]=n.r,t[1]=n.g,t[2]=n.b);else{if(mt(t,n))return;e.uniform3fv(this.addr,n),_t(t,n)}}function nu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4f(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(mt(t,n))return;e.uniform4fv(this.addr,n),_t(t,n)}}function iu(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(mt(t,n))return;e.uniformMatrix2fv(this.addr,!1,n),_t(t,n)}else{if(mt(t,i))return;qr.set(i),e.uniformMatrix2fv(this.addr,!1,qr),_t(t,i)}}function ru(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(mt(t,n))return;e.uniformMatrix3fv(this.addr,!1,n),_t(t,n)}else{if(mt(t,i))return;Xr.set(i),e.uniformMatrix3fv(this.addr,!1,Xr),_t(t,i)}}function au(e,n){const t=this.cache,i=n.elements;if(i===void 0){if(mt(t,n))return;e.uniformMatrix4fv(this.addr,!1,n),_t(t,n)}else{if(mt(t,i))return;Wr.set(i),e.uniformMatrix4fv(this.addr,!1,Wr),_t(t,i)}}function ou(e,n){const t=this.cache;t[0]!==n&&(e.uniform1i(this.addr,n),t[0]=n)}function su(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2i(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(mt(t,n))return;e.uniform2iv(this.addr,n),_t(t,n)}}function cu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3i(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(mt(t,n))return;e.uniform3iv(this.addr,n),_t(t,n)}}function lu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4i(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(mt(t,n))return;e.uniform4iv(this.addr,n),_t(t,n)}}function fu(e,n){const t=this.cache;t[0]!==n&&(e.uniform1ui(this.addr,n),t[0]=n)}function uu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y)&&(e.uniform2ui(this.addr,n.x,n.y),t[0]=n.x,t[1]=n.y);else{if(mt(t,n))return;e.uniform2uiv(this.addr,n),_t(t,n)}}function du(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z)&&(e.uniform3ui(this.addr,n.x,n.y,n.z),t[0]=n.x,t[1]=n.y,t[2]=n.z);else{if(mt(t,n))return;e.uniform3uiv(this.addr,n),_t(t,n)}}function pu(e,n){const t=this.cache;if(n.x!==void 0)(t[0]!==n.x||t[1]!==n.y||t[2]!==n.z||t[3]!==n.w)&&(e.uniform4ui(this.addr,n.x,n.y,n.z,n.w),t[0]=n.x,t[1]=n.y,t[2]=n.z,t[3]=n.w);else{if(mt(t,n))return;e.uniform4uiv(this.addr,n),_t(t,n)}}function hu(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(wi.compareFunction=t.isReversedDepthBuffer()?Di:Ui,r=wi):r=Ya,t.setTexture2D(n||r,a)}function mu(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture3D(n||Za,a)}function _u(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTextureCube(n||$a,a)}function gu(e,n,t){const i=this.cache,a=t.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),t.setTexture2DArray(n||ja,a)}function vu(e){switch(e){case 5126:return Jf;case 35664:return eu;case 35665:return tu;case 35666:return nu;case 35674:return iu;case 35675:return ru;case 35676:return au;case 5124:case 35670:return ou;case 35667:case 35671:return su;case 35668:case 35672:return cu;case 35669:case 35673:return lu;case 5125:return fu;case 36294:return uu;case 36295:return du;case 36296:return pu;case 35678:case 36198:case 36298:case 36306:case 35682:return hu;case 35679:case 36299:case 36307:return mu;case 35680:case 36300:case 36308:case 36293:return _u;case 36289:case 36303:case 36311:case 36292:return gu}}function Su(e,n){e.uniform1fv(this.addr,n)}function xu(e,n){const t=En(n,this.size,2);e.uniform2fv(this.addr,t)}function Eu(e,n){const t=En(n,this.size,3);e.uniform3fv(this.addr,t)}function Mu(e,n){const t=En(n,this.size,4);e.uniform4fv(this.addr,t)}function Tu(e,n){const t=En(n,this.size,4);e.uniformMatrix2fv(this.addr,!1,t)}function Au(e,n){const t=En(n,this.size,9);e.uniformMatrix3fv(this.addr,!1,t)}function bu(e,n){const t=En(n,this.size,16);e.uniformMatrix4fv(this.addr,!1,t)}function Ru(e,n){e.uniform1iv(this.addr,n)}function wu(e,n){e.uniform2iv(this.addr,n)}function Cu(e,n){e.uniform3iv(this.addr,n)}function Pu(e,n){e.uniform4iv(this.addr,n)}function yu(e,n){e.uniform1uiv(this.addr,n)}function Lu(e,n){e.uniform2uiv(this.addr,n)}function Iu(e,n){e.uniform3uiv(this.addr,n)}function Du(e,n){e.uniform4uiv(this.addr,n)}function Uu(e,n,t){const i=this.cache,a=n.length,r=Zn(t,a);mt(i,r)||(e.uniform1iv(this.addr,r),_t(i,r));let o;this.type===e.SAMPLER_2D_SHADOW?o=wi:o=Ya;for(let s=0;s!==a;++s)t.setTexture2D(n[s]||o,r[s])}function Nu(e,n,t){const i=this.cache,a=n.length,r=Zn(t,a);mt(i,r)||(e.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==a;++o)t.setTexture3D(n[o]||Za,r[o])}function Fu(e,n,t){const i=this.cache,a=n.length,r=Zn(t,a);mt(i,r)||(e.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==a;++o)t.setTextureCube(n[o]||$a,r[o])}function Ou(e,n,t){const i=this.cache,a=n.length,r=Zn(t,a);mt(i,r)||(e.uniform1iv(this.addr,r),_t(i,r));for(let o=0;o!==a;++o)t.setTexture2DArray(n[o]||ja,r[o])}function Bu(e){switch(e){case 5126:return Su;case 35664:return xu;case 35665:return Eu;case 35666:return Mu;case 35674:return Tu;case 35675:return Au;case 35676:return bu;case 5124:case 35670:return Ru;case 35667:case 35671:return wu;case 35668:case 35672:return Cu;case 35669:case 35673:return Pu;case 5125:return yu;case 36294:return Lu;case 36295:return Iu;case 36296:return Du;case 35678:case 36198:case 36298:case 36306:case 35682:return Uu;case 35679:case 36299:case 36307:return Nu;case 35680:case 36300:case 36308:case 36293:return Fu;case 36289:case 36303:case 36311:case 36292:return Ou}}class Gu{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.setValue=vu(t.type)}}class Hu{constructor(n,t,i){this.id=n,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Bu(t.type)}}class Vu{constructor(n){this.id=n,this.seq=[],this.map={}}setValue(n,t,i){const a=this.seq;for(let r=0,o=a.length;r!==o;++r){const s=a[r];s.setValue(n,t[s.id],i)}}}const di=/(\w+)(\])?(\[|\.)?/g;function Kr(e,n){e.seq.push(n),e.map[n.id]=n}function ku(e,n,t){const i=e.name,a=i.length;for(di.lastIndex=0;;){const r=di.exec(i),o=di.lastIndex;let s=r[1];const l=r[2]==="]",c=r[3];if(l&&(s=s|0),c===void 0||c==="["&&o+2===a){Kr(t,c===void 0?new Gu(s,e,n):new Hu(s,e,n));break}else{let h=t.map[s];h===void 0&&(h=new Vu(s),Kr(t,h)),t=h}}}class zn{constructor(n,t){this.seq=[],this.map={};const i=n.getProgramParameter(t,n.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const s=n.getActiveUniform(t,o),l=n.getUniformLocation(t,s.name);ku(s,l,this)}const a=[],r=[];for(const o of this.seq)o.type===n.SAMPLER_2D_SHADOW||o.type===n.SAMPLER_CUBE_SHADOW||o.type===n.SAMPLER_2D_ARRAY_SHADOW?a.push(o):r.push(o);a.length>0&&(this.seq=a.concat(r))}setValue(n,t,i,a){const r=this.map[t];r!==void 0&&r.setValue(n,i,a)}setOptional(n,t,i){const a=t[i];a!==void 0&&this.setValue(n,i,a)}static upload(n,t,i,a){for(let r=0,o=t.length;r!==o;++r){const s=t[r],l=i[s.id];l.needsUpdate!==!1&&s.setValue(n,l.value,a)}}static seqWithValue(n,t){const i=[];for(let a=0,r=n.length;a!==r;++a){const o=n[a];o.id in t&&i.push(o)}return i}}function Yr(e,n,t){const i=e.createShader(n);return e.shaderSource(i,t),e.compileShader(i),i}const zu=37297;let Wu=0;function Xu(e,n){const t=e.split(`
`),i=[],a=Math.max(n-6,0),r=Math.min(n+6,t.length);for(let o=a;o<r;o++){const s=o+1;i.push(`${s===n?">":" "} ${s}: ${t[o]}`)}return i.join(`
`)}const jr=new Xe;function qu(e){rt._getMatrix(jr,rt.workingColorSpace,e);const n=`mat3( ${jr.elements.map(t=>t.toFixed(4))} )`;switch(rt.getTransfer(e)){case Ba:return[n,"LinearTransferOETF"];case nt:return[n,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",e),[n,"LinearTransferOETF"]}}function Zr(e,n,t){const i=e.getShaderParameter(n,e.COMPILE_STATUS),r=(e.getShaderInfoLog(n)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const s=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Xu(e.getShaderSource(n),s)}else return r}function Ku(e,n){const t=qu(n);return[`vec4 ${e}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Yu={[ya]:"Linear",[La]:"Reinhard",[Ia]:"Cineon",[Da]:"ACESFilmic",[Ua]:"AgX",[Na]:"Neutral",[Fa]:"Custom"};function ju(e,n){const t=Yu[n];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",n),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Bn=new z;function Zu(){rt.getLuminanceCoefficients(Bn);const e=Bn.x.toFixed(4),n=Bn.y.toFixed(4),t=Bn.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${n}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function $u(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Cn).join(`
`)}function Qu(e){const n=[];for(const t in e){const i=e[t];i!==!1&&n.push("#define "+t+" "+i)}return n.join(`
`)}function Ju(e,n){const t={},i=e.getProgramParameter(n,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(n,a),o=r.name;let s=1;r.type===e.FLOAT_MAT2&&(s=2),r.type===e.FLOAT_MAT3&&(s=3),r.type===e.FLOAT_MAT4&&(s=4),t[o]={type:r.type,location:e.getAttribLocation(n,o),locationSize:s}}return t}function Cn(e){return e!==""}function $r(e,n){const t=n.numSpotLightShadows+n.numSpotLightMaps-n.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,n.numDirLights).replace(/NUM_SPOT_LIGHTS/g,n.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,n.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,n.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,n.numPointLights).replace(/NUM_HEMI_LIGHTS/g,n.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,n.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,n.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,n.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,n.numPointLightShadows)}function Qr(e,n){return e.replace(/NUM_CLIPPING_PLANES/g,n.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,n.numClippingPlanes-n.numClipIntersection)}const ed=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ci(e){return e.replace(ed,nd)}const td=new Map;function nd(e,n){let t=He[n];if(t===void 0){const i=td.get(n);if(i!==void 0)t=He[i],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',n,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+n+">")}return Ci(t)}const id=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jr(e){return e.replace(id,rd)}function rd(e,n,t,i){let a="";for(let r=parseInt(n);r<parseInt(t);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function ea(e){let n=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?n+=`
#define HIGH_PRECISION`:e.precision==="mediump"?n+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(n+=`
#define LOW_PRECISION`),n}const ad={[Gn]:"SHADOWMAP_TYPE_PCF",[Rn]:"SHADOWMAP_TYPE_VSM"};function od(e){return ad[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const sd={[Dn]:"ENVMAP_TYPE_CUBE",[Sn]:"ENVMAP_TYPE_CUBE",[Yn]:"ENVMAP_TYPE_CUBE_UV"};function cd(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":sd[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const ld={[Sn]:"ENVMAP_MODE_REFRACTION"};function fd(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":ld[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ud={[Es]:"ENVMAP_BLENDING_MULTIPLY",[Ms]:"ENVMAP_BLENDING_MIX",[Ts]:"ENVMAP_BLENDING_ADD"};function dd(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":ud[e.combine]||"ENVMAP_BLENDING_NONE"}function pd(e){const n=e.envMapCubeUVHeight;if(n===null)return null;const t=Math.log2(n)-2,i=1/n;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function hd(e,n,t,i){const a=e.getContext(),r=t.defines;let o=t.vertexShader,s=t.fragmentShader;const l=od(t),c=cd(t),_=fd(t),h=dd(t),d=pd(t),m=$u(t),x=Qu(r),T=a.createProgram();let p,f,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Cn).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Cn).join(`
`),f.length>0&&(f+=`
`)):(p=[ea(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Cn).join(`
`),f=[ea(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+_:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ht?"#define TONE_MAPPING":"",t.toneMapping!==Ht?He.tonemapping_pars_fragment:"",t.toneMapping!==Ht?ju("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,Ku("linearToOutputTexel",t.outputColorSpace),Zu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Cn).join(`
`)),o=Ci(o),o=$r(o,t),o=Qr(o,t),s=Ci(s),s=$r(s,t),s=Qr(s,t),o=Jr(o),s=Jr(s),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===Lr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const C=b+p+o,S=b+f+s,A=Yr(a,a.VERTEX_SHADER,C),R=Yr(a,a.FRAGMENT_SHADER,S);a.attachShader(T,A),a.attachShader(T,R),t.index0AttributeName!==void 0?a.bindAttribLocation(T,0,t.index0AttributeName):t.hasPositionAttribute===!0&&a.bindAttribLocation(T,0,"position"),a.linkProgram(T);function w(y){if(e.debug.checkShaderErrors){const N=a.getProgramInfoLog(T)||"",$=a.getShaderInfoLog(A)||"",Z=a.getShaderInfoLog(R)||"",O=N.trim(),X=$.trim(),D=Z.trim();let B=!0,ee=!0;if(a.getProgramParameter(T,a.LINK_STATUS)===!1)if(B=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,T,A,R);else{const j=Zr(a,A,"vertex"),J=Zr(a,R,"fragment");it("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(T,a.VALIDATE_STATUS)+`

Material Name: `+y.name+`
Material Type: `+y.type+`

Program Info Log: `+O+`
`+j+`
`+J)}else O!==""?Ze("WebGLProgram: Program Info Log:",O):(X===""||D==="")&&(ee=!1);ee&&(y.diagnostics={runnable:B,programLog:O,vertexShader:{log:X,prefix:p},fragmentShader:{log:D,prefix:f}})}a.deleteShader(A),a.deleteShader(R),g=new zn(a,T),E=Ju(a,T)}let g;this.getUniforms=function(){return g===void 0&&w(this),g};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=a.getProgramParameter(T,zu)),P},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Wu++,this.cacheKey=n,this.usedTimes=1,this.program=T,this.vertexShader=A,this.fragmentShader=R,this}let md=0;class _d{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(n,t,i){const a=this._getShaderCacheForMaterial(n);return a.has(t)===!1&&(a.add(t),t.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(n){const t=this.materialCache.get(n);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(n),this}getVertexShaderStage(n){return this._getShaderStage(n.vertexShader)}getFragmentShaderStage(n){return this._getShaderStage(n.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(n){const t=this.materialCache;let i=t.get(n);return i===void 0&&(i=new Set,t.set(n,i)),i}_getShaderStage(n){const t=this.shaderCache;let i=t.get(n);return i===void 0&&(i=new gd(n),t.set(n,i)),i}}class gd{constructor(n){this.id=md++,this.code=n,this.usedTimes=0}}function vd(e){return e===vn||e===Ti||e===Ai}function Sd(e,n,t,i,a,r){const o=new fs,s=new _d,l=new Set,c=[],_=new Map,h=i.logarithmicDepthBuffer;let d=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(g){return l.add(g),g===0?"uv":`uv${g}`}function T(g,E,P,y,N,$){const Z=y.fog,O=N.geometry,X=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?y.environment:null,D=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,B=n.get(g.envMap||X,D),ee=B&&B.mapping===Yn?B.image.height:null,j=m[g.type];g.precision!==null&&(d=i.getMaxPrecision(g.precision),d!==g.precision&&Ze("WebGLProgram.getParameters:",g.precision,"not supported, using",d,"instead."));const J=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,oe=J!==void 0?J.length:0;let ae=0;O.morphAttributes.position!==void 0&&(ae=1),O.morphAttributes.normal!==void 0&&(ae=2),O.morphAttributes.color!==void 0&&(ae=3);let Ae,ue,q,se;if(j){const Me=Ot[j];Ae=Me.vertexShader,ue=Me.fragmentShader}else{Ae=g.vertexShader,ue=g.fragmentShader;const Me=s.getVertexShaderStage(g),st=s.getFragmentShaderStage(g);s.update(g,Me,st),q=Me.id,se=st.id}const re=e.getRenderTarget(),Pe=e.state.buffers.depth.getReversed(),De=N.isInstancedMesh===!0,Le=N.isBatchedMesh===!0,ot=!!g.map,Oe=!!g.matcap,Ke=!!B,We=!!g.aoMap,ze=!!g.lightMap,at=!!g.bumpMap&&g.wireframe===!1,lt=!!g.normalMap,ft=!!g.displacementMap,ve=!!g.emissiveMap,Re=!!g.metalnessMap,Fe=!!g.roughnessMap,I=g.anisotropy>0,ht=g.clearcoat>0,je=g.dispersion>0,M=g.iridescence>0,u=g.sheen>0,F=g.transmission>0,V=I&&!!g.anisotropyMap,K=ht&&!!g.clearcoatMap,ie=ht&&!!g.clearcoatNormalMap,ne=ht&&!!g.clearcoatRoughnessMap,k=M&&!!g.iridescenceMap,Y=M&&!!g.iridescenceThicknessMap,ce=u&&!!g.sheenColorMap,Ee=u&&!!g.sheenRoughnessMap,de=!!g.specularMap,le=!!g.specularColorMap,we=!!g.specularIntensityMap,Ie=F&&!!g.transmissionMap,Ue=F&&!!g.thicknessMap,L=!!g.gradientMap,fe=!!g.alphaMap,Q=g.alphaTest>0,pe=!!g.alphaHash,ge=!!g.extensions;let te=Ht;g.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(te=e.toneMapping);const be={shaderID:j,shaderType:g.type,shaderName:g.name,vertexShader:Ae,fragmentShader:ue,defines:g.defines,customVertexShaderID:q,customFragmentShaderID:se,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:d,batching:Le,batchingColor:Le&&N._colorsTexture!==null,instancing:De,instancingColor:De&&N.instanceColor!==null,instancingMorph:De&&N.morphTexture!==null,outputColorSpace:re===null?e.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:ot,matcap:Oe,envMap:Ke,envMapMode:Ke&&B.mapping,envMapCubeUVHeight:ee,aoMap:We,lightMap:ze,bumpMap:at,normalMap:lt,displacementMap:ft,emissiveMap:ve,normalMapObjectSpace:lt&&g.normalMapType===Qo,normalMapTangentSpace:lt&&g.normalMapType===Ji,packedNormalMap:lt&&g.normalMapType===Ji&&vd(g.normalMap.format),metalnessMap:Re,roughnessMap:Fe,anisotropy:I,anisotropyMap:V,clearcoat:ht,clearcoatMap:K,clearcoatNormalMap:ie,clearcoatRoughnessMap:ne,dispersion:je,iridescence:M,iridescenceMap:k,iridescenceThicknessMap:Y,sheen:u,sheenColorMap:ce,sheenRoughnessMap:Ee,specularMap:de,specularColorMap:le,specularIntensityMap:we,transmission:F,transmissionMap:Ie,thicknessMap:Ue,gradientMap:L,opaque:g.transparent===!1&&g.blending===Hn&&g.alphaToCoverage===!1,alphaMap:fe,alphaTest:Q,alphaHash:pe,combine:g.combine,mapUv:ot&&x(g.map.channel),aoMapUv:We&&x(g.aoMap.channel),lightMapUv:ze&&x(g.lightMap.channel),bumpMapUv:at&&x(g.bumpMap.channel),normalMapUv:lt&&x(g.normalMap.channel),displacementMapUv:ft&&x(g.displacementMap.channel),emissiveMapUv:ve&&x(g.emissiveMap.channel),metalnessMapUv:Re&&x(g.metalnessMap.channel),roughnessMapUv:Fe&&x(g.roughnessMap.channel),anisotropyMapUv:V&&x(g.anisotropyMap.channel),clearcoatMapUv:K&&x(g.clearcoatMap.channel),clearcoatNormalMapUv:ie&&x(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&x(g.clearcoatRoughnessMap.channel),iridescenceMapUv:k&&x(g.iridescenceMap.channel),iridescenceThicknessMapUv:Y&&x(g.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&x(g.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&x(g.sheenRoughnessMap.channel),specularMapUv:de&&x(g.specularMap.channel),specularColorMapUv:le&&x(g.specularColorMap.channel),specularIntensityMapUv:we&&x(g.specularIntensityMap.channel),transmissionMapUv:Ie&&x(g.transmissionMap.channel),thicknessMapUv:Ue&&x(g.thicknessMap.channel),alphaMapUv:fe&&x(g.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(lt||I),vertexNormals:!!O.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!O.attributes.uv&&(ot||fe),fog:!!Z,useFog:g.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||O.attributes.normal===void 0&&lt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Pe,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:O.attributes.position!==void 0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:ae,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numLightProbeGrids:$.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:e.shadowMap.enabled&&P.length>0,shadowMapType:e.shadowMap.type,toneMapping:te,decodeVideoTexture:ot&&g.map.isVideoTexture===!0&&rt.getTransfer(g.map.colorSpace)===nt,decodeVideoTextureEmissive:ve&&g.emissiveMap.isVideoTexture===!0&&rt.getTransfer(g.emissiveMap.colorSpace)===nt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Pt,flipSided:g.side===bt,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ge&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&g.extensions.multiDraw===!0||Le)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return be.vertexUv1s=l.has(1),be.vertexUv2s=l.has(2),be.vertexUv3s=l.has(3),l.clear(),be}function p(g){const E=[];if(g.shaderID?E.push(g.shaderID):(E.push(g.customVertexShaderID),E.push(g.customFragmentShaderID)),g.defines!==void 0)for(const P in g.defines)E.push(P),E.push(g.defines[P]);return g.isRawShaderMaterial===!1&&(f(E,g),b(E,g),E.push(e.outputColorSpace)),E.push(g.customProgramCacheKey),E.join()}function f(g,E){g.push(E.precision),g.push(E.outputColorSpace),g.push(E.envMapMode),g.push(E.envMapCubeUVHeight),g.push(E.mapUv),g.push(E.alphaMapUv),g.push(E.lightMapUv),g.push(E.aoMapUv),g.push(E.bumpMapUv),g.push(E.normalMapUv),g.push(E.displacementMapUv),g.push(E.emissiveMapUv),g.push(E.metalnessMapUv),g.push(E.roughnessMapUv),g.push(E.anisotropyMapUv),g.push(E.clearcoatMapUv),g.push(E.clearcoatNormalMapUv),g.push(E.clearcoatRoughnessMapUv),g.push(E.iridescenceMapUv),g.push(E.iridescenceThicknessMapUv),g.push(E.sheenColorMapUv),g.push(E.sheenRoughnessMapUv),g.push(E.specularMapUv),g.push(E.specularColorMapUv),g.push(E.specularIntensityMapUv),g.push(E.transmissionMapUv),g.push(E.thicknessMapUv),g.push(E.combine),g.push(E.fogExp2),g.push(E.sizeAttenuation),g.push(E.morphTargetsCount),g.push(E.morphAttributeCount),g.push(E.numDirLights),g.push(E.numPointLights),g.push(E.numSpotLights),g.push(E.numSpotLightMaps),g.push(E.numHemiLights),g.push(E.numRectAreaLights),g.push(E.numDirLightShadows),g.push(E.numPointLightShadows),g.push(E.numSpotLightShadows),g.push(E.numSpotLightShadowsWithMaps),g.push(E.numLightProbes),g.push(E.shadowMapType),g.push(E.toneMapping),g.push(E.numClippingPlanes),g.push(E.numClipIntersection),g.push(E.depthPacking)}function b(g,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),E.packedNormalMap&&o.enable(22),E.vertexNormals&&o.enable(23),g.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),E.numLightProbeGrids>0&&o.enable(22),E.hasPositionAttribute&&o.enable(23),g.push(o.mask)}function C(g){const E=m[g.type];let P;if(E){const y=Ot[E];P=Jo.clone(y.uniforms)}else P=g.uniforms;return P}function S(g,E){let P=_.get(E);return P!==void 0?++P.usedTimes:(P=new hd(e,E,g,a),c.push(P),_.set(E,P)),P}function A(g){if(--g.usedTimes===0){const E=c.indexOf(g);c[E]=c[c.length-1],c.pop(),_.delete(g.cacheKey),g.destroy()}}function R(g){s.remove(g)}function w(){s.dispose()}return{getParameters:T,getProgramCacheKey:p,getUniforms:C,acquireProgram:S,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:w}}function xd(){let e=new WeakMap;function n(o){return e.has(o)}function t(o){let s=e.get(o);return s===void 0&&(s={},e.set(o,s)),s}function i(o){e.delete(o)}function a(o,s,l){e.get(o)[s]=l}function r(){e=new WeakMap}return{has:n,get:t,remove:i,update:a,dispose:r}}function Ed(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.material.id!==n.material.id?e.material.id-n.material.id:e.materialVariant!==n.materialVariant?e.materialVariant-n.materialVariant:e.z!==n.z?e.z-n.z:e.id-n.id}function ta(e,n){return e.groupOrder!==n.groupOrder?e.groupOrder-n.groupOrder:e.renderOrder!==n.renderOrder?e.renderOrder-n.renderOrder:e.z!==n.z?n.z-e.z:e.id-n.id}function na(){const e=[];let n=0;const t=[],i=[],a=[];function r(){n=0,t.length=0,i.length=0,a.length=0}function o(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function s(d,m,x,T,p,f){let b=e[n];return b===void 0?(b={id:d.id,object:d,geometry:m,material:x,materialVariant:o(d),groupOrder:T,renderOrder:d.renderOrder,z:p,group:f},e[n]=b):(b.id=d.id,b.object=d,b.geometry=m,b.material=x,b.materialVariant=o(d),b.groupOrder=T,b.renderOrder=d.renderOrder,b.z=p,b.group=f),n++,b}function l(d,m,x,T,p,f){const b=s(d,m,x,T,p,f);x.transmission>0?i.push(b):x.transparent===!0?a.push(b):t.push(b)}function c(d,m,x,T,p,f){const b=s(d,m,x,T,p,f);x.transmission>0?i.unshift(b):x.transparent===!0?a.unshift(b):t.unshift(b)}function _(d,m,x){t.length>1&&t.sort(d||Ed),i.length>1&&i.sort(m||ta),a.length>1&&a.sort(m||ta),x&&(t.reverse(),i.reverse(),a.reverse())}function h(){for(let d=n,m=e.length;d<m;d++){const x=e[d];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:i,transparent:a,init:r,push:l,unshift:c,finish:h,sort:_}}function Md(){let e=new WeakMap;function n(i,a){const r=e.get(i);let o;return r===void 0?(o=new na,e.set(i,[o])):a>=r.length?(o=new na,r.push(o)):o=r[a],o}function t(){e=new WeakMap}return{get:n,dispose:t}}function Td(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={direction:new z,color:new Ye};break;case"SpotLight":t={position:new z,direction:new z,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new z,halfWidth:new z,halfHeight:new z};break}return e[n.id]=t,t}}}function Ad(){const e={};return{get:function(n){if(e[n.id]!==void 0)return e[n.id];let t;switch(n.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[n.id]=t,t}}}let bd=0;function Rd(e,n){return(n.castShadow?2:0)-(e.castShadow?2:0)+(n.map?1:0)-(e.map?1:0)}function wd(e){const n=new Td,t=Ad(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new z);const a=new z,r=new yt,o=new yt;function s(c){let _=0,h=0,d=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,x=0,T=0,p=0,f=0,b=0,C=0,S=0,A=0,R=0,w=0;c.sort(Rd);for(let E=0,P=c.length;E<P;E++){const y=c[E],N=y.color,$=y.intensity,Z=y.distance;let O=null;if(y.shadow&&y.shadow.map&&(y.shadow.map.texture.format===vn?O=y.shadow.map.texture:O=y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)_+=N.r*$,h+=N.g*$,d+=N.b*$;else if(y.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(y.sh.coefficients[X],$);w++}else if(y.isDirectionalLight){const X=n.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){const D=y.shadow,B=t.get(y);B.shadowIntensity=D.intensity,B.shadowBias=D.bias,B.shadowNormalBias=D.normalBias,B.shadowRadius=D.radius,B.shadowMapSize=D.mapSize,i.directionalShadow[m]=B,i.directionalShadowMap[m]=O,i.directionalShadowMatrix[m]=y.shadow.matrix,b++}i.directional[m]=X,m++}else if(y.isSpotLight){const X=n.get(y);X.position.setFromMatrixPosition(y.matrixWorld),X.color.copy(N).multiplyScalar($),X.distance=Z,X.coneCos=Math.cos(y.angle),X.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),X.decay=y.decay,i.spot[T]=X;const D=y.shadow;if(y.map&&(i.spotLightMap[A]=y.map,A++,D.updateMatrices(y),y.castShadow&&R++),i.spotLightMatrix[T]=D.matrix,y.castShadow){const B=t.get(y);B.shadowIntensity=D.intensity,B.shadowBias=D.bias,B.shadowNormalBias=D.normalBias,B.shadowRadius=D.radius,B.shadowMapSize=D.mapSize,i.spotShadow[T]=B,i.spotShadowMap[T]=O,S++}T++}else if(y.isRectAreaLight){const X=n.get(y);X.color.copy(N).multiplyScalar($),X.halfWidth.set(y.width*.5,0,0),X.halfHeight.set(0,y.height*.5,0),i.rectArea[p]=X,p++}else if(y.isPointLight){const X=n.get(y);if(X.color.copy(y.color).multiplyScalar(y.intensity),X.distance=y.distance,X.decay=y.decay,y.castShadow){const D=y.shadow,B=t.get(y);B.shadowIntensity=D.intensity,B.shadowBias=D.bias,B.shadowNormalBias=D.normalBias,B.shadowRadius=D.radius,B.shadowMapSize=D.mapSize,B.shadowCameraNear=D.camera.near,B.shadowCameraFar=D.camera.far,i.pointShadow[x]=B,i.pointShadowMap[x]=O,i.pointShadowMatrix[x]=y.shadow.matrix,C++}i.point[x]=X,x++}else if(y.isHemisphereLight){const X=n.get(y);X.skyColor.copy(y.color).multiplyScalar($),X.groundColor.copy(y.groundColor).multiplyScalar($),i.hemi[f]=X,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=he.LTC_FLOAT_1,i.rectAreaLTC2=he.LTC_FLOAT_2):(i.rectAreaLTC1=he.LTC_HALF_1,i.rectAreaLTC2=he.LTC_HALF_2)),i.ambient[0]=_,i.ambient[1]=h,i.ambient[2]=d;const g=i.hash;(g.directionalLength!==m||g.pointLength!==x||g.spotLength!==T||g.rectAreaLength!==p||g.hemiLength!==f||g.numDirectionalShadows!==b||g.numPointShadows!==C||g.numSpotShadows!==S||g.numSpotMaps!==A||g.numLightProbes!==w)&&(i.directional.length=m,i.spot.length=T,i.rectArea.length=p,i.point.length=x,i.hemi.length=f,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=C,i.pointShadowMap.length=C,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=C,i.spotLightMatrix.length=S+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=w,g.directionalLength=m,g.pointLength=x,g.spotLength=T,g.rectAreaLength=p,g.hemiLength=f,g.numDirectionalShadows=b,g.numPointShadows=C,g.numSpotShadows=S,g.numSpotMaps=A,g.numLightProbes=w,i.version=bd++)}function l(c,_){let h=0,d=0,m=0,x=0,T=0;const p=_.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){const C=c[f];if(C.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(C.matrixWorld),a.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),h++}else if(C.isSpotLight){const S=i.spot[m];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(C.matrixWorld),a.setFromMatrixPosition(C.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(p),m++}else if(C.isRectAreaLight){const S=i.rectArea[x];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),o.identity(),r.copy(C.matrixWorld),r.premultiply(p),o.extractRotation(r),S.halfWidth.set(C.width*.5,0,0),S.halfHeight.set(0,C.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(C.isPointLight){const S=i.point[d];S.position.setFromMatrixPosition(C.matrixWorld),S.position.applyMatrix4(p),d++}else if(C.isHemisphereLight){const S=i.hemi[T];S.direction.setFromMatrixPosition(C.matrixWorld),S.direction.transformDirection(p),T++}}}return{setup:s,setupView:l,state:i}}function ia(e){const n=new wd(e),t=[],i=[],a=[];function r(d){h.camera=d,t.length=0,i.length=0,a.length=0}function o(d){t.push(d)}function s(d){i.push(d)}function l(d){a.push(d)}function c(){n.setup(t)}function _(d){n.setupView(t,d)}const h={lightsArray:t,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:n,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:_,pushLight:o,pushShadow:s,pushLightProbeGrid:l}}function Cd(e){let n=new WeakMap;function t(a,r=0){const o=n.get(a);let s;return o===void 0?(s=new ia(e),n.set(a,[s])):r>=o.length?(s=new ia(e),o.push(s)):s=o[r],s}function i(){n=new WeakMap}return{get:t,dispose:i}}const Pd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,yd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Ld=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],Id=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],ra=new yt,An=new z,pi=new z;function Dd(e,n,t){let i=new ma;const a=new St,r=new St,o=new Mt,s=new Eo,l=new Mo,c={},_=t.maxTextureSize,h={[_n]:bt,[bt]:_n,[Pt]:Pt},d=new qt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:Pd,fragmentShader:yd}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const x=new xn;x.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new xt(x,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Gn;let f=this.type;this.render=function(R,w,g){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===To&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Gn);const E=e.getRenderTarget(),P=e.getActiveCubeFace(),y=e.getActiveMipmapLevel(),N=e.state;N.setBlending(Xt),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const $=f!==this.type;$&&w.traverse(function(Z){Z.material&&(Array.isArray(Z.material)?Z.material.forEach(O=>O.needsUpdate=!0):Z.material.needsUpdate=!0)});for(let Z=0,O=R.length;Z<O;Z++){const X=R[Z],D=X.shadow;if(D===void 0){Ze("WebGLShadowMap:",X,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;a.copy(D.mapSize);const B=D.getFrameExtents();a.multiply(B),r.copy(D.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(r.x=Math.floor(_/B.x),a.x=r.x*B.x,D.mapSize.x=r.x),a.y>_&&(r.y=Math.floor(_/B.y),a.y=r.y*B.y,D.mapSize.y=r.y));const ee=e.state.buffers.depth.getReversed();if(D.camera._reversedDepth=ee,D.map===null||$===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===Rn){if(X.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new Vt(a.x,a.y,{format:vn,type:tn,minFilter:vt,magFilter:vt,generateMipmaps:!1}),D.map.texture.name=X.name+".shadowMap",D.map.depthTexture=new Ln(a.x,a.y,Qt),D.map.depthTexture.name=X.name+".shadowMapDepth",D.map.depthTexture.format=gn,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Gt,D.map.depthTexture.magFilter=Gt}else X.isPointLight?(D.map=new Ka(a.x),D.map.depthTexture=new Ao(a.x,sn)):(D.map=new Vt(a.x,a.y),D.map.depthTexture=new Ln(a.x,a.y,sn)),D.map.depthTexture.name=X.name+".shadowMap",D.map.depthTexture.format=gn,this.type===Gn?(D.map.depthTexture.compareFunction=ee?Di:Ui,D.map.depthTexture.minFilter=vt,D.map.depthTexture.magFilter=vt):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Gt,D.map.depthTexture.magFilter=Gt);D.camera.updateProjectionMatrix()}const j=D.map.isWebGLCubeRenderTarget?6:1;for(let J=0;J<j;J++){if(D.map.isWebGLCubeRenderTarget)e.setRenderTarget(D.map,J),e.clear();else{J===0&&(e.setRenderTarget(D.map),e.clear());const oe=D.getViewport(J);o.set(r.x*oe.x,r.y*oe.y,r.x*oe.z,r.y*oe.w),N.viewport(o)}if(X.isPointLight){const oe=D.camera,ae=D.matrix,Ae=X.distance||oe.far;Ae!==oe.far&&(oe.far=Ae,oe.updateProjectionMatrix()),An.setFromMatrixPosition(X.matrixWorld),oe.position.copy(An),pi.copy(oe.position),pi.add(Ld[J]),oe.up.copy(Id[J]),oe.lookAt(pi),oe.updateMatrixWorld(),ae.makeTranslation(-An.x,-An.y,-An.z),ra.multiplyMatrices(oe.projectionMatrix,oe.matrixWorldInverse),D._frustum.setFromProjectionMatrix(ra,oe.coordinateSystem,oe.reversedDepth)}else D.updateMatrices(X);i=D.getFrustum(),S(w,g,D.camera,X,this.type)}D.isPointLightShadow!==!0&&this.type===Rn&&b(D,g),D.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(E,P,y)};function b(R,w){const g=n.update(T);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Vt(a.x,a.y,{format:vn,type:tn})),d.uniforms.shadow_pass.value=R.map.depthTexture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(w,null,g,d,T,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(w,null,g,m,T,null)}function C(R,w,g,E){let P=null;const y=g.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(y!==void 0)P=y;else if(P=g.isPointLight===!0?l:s,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){const N=P.uuid,$=w.uuid;let Z=c[N];Z===void 0&&(Z={},c[N]=Z);let O=Z[$];O===void 0&&(O=P.clone(),Z[$]=O,w.addEventListener("dispose",A)),P=O}if(P.visible=w.visible,P.wireframe=w.wireframe,E===Rn?P.side=w.shadowSide!==null?w.shadowSide:w.side:P.side=w.shadowSide!==null?w.shadowSide:h[w.side],P.alphaMap=w.alphaMap,P.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,P.map=w.map,P.clipShadows=w.clipShadows,P.clippingPlanes=w.clippingPlanes,P.clipIntersection=w.clipIntersection,P.displacementMap=w.displacementMap,P.displacementScale=w.displacementScale,P.displacementBias=w.displacementBias,P.wireframeLinewidth=w.wireframeLinewidth,P.linewidth=w.linewidth,g.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const N=e.properties.get(P);N.light=g}return P}function S(R,w,g,E,P){if(R.visible===!1)return;if(R.layers.test(w.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&P===Rn)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(g.matrixWorldInverse,R.matrixWorld);const $=n.update(R),Z=R.material;if(Array.isArray(Z)){const O=$.groups;for(let X=0,D=O.length;X<D;X++){const B=O[X],ee=Z[B.materialIndex];if(ee&&ee.visible){const j=C(R,ee,E,P);R.onBeforeShadow(e,R,w,g,$,j,B),e.renderBufferDirect(g,null,$,j,R,B),R.onAfterShadow(e,R,w,g,$,j,B)}}}else if(Z.visible){const O=C(R,Z,E,P);R.onBeforeShadow(e,R,w,g,$,O,null),e.renderBufferDirect(g,null,$,O,R,null),R.onAfterShadow(e,R,w,g,$,O,null)}}const N=R.children;for(let $=0,Z=N.length;$<Z;$++)S(N[$],w,g,E,P)}function A(R){R.target.removeEventListener("dispose",A);for(const g in c){const E=c[g],P=R.target.uuid;P in E&&(E[P].dispose(),delete E[P])}}}function Ud(e,n){function t(){let L=!1;const fe=new Mt;let Q=null;const pe=new Mt(0,0,0,0);return{setMask:function(ge){Q!==ge&&!L&&(e.colorMask(ge,ge,ge,ge),Q=ge)},setLocked:function(ge){L=ge},setClear:function(ge,te,be,Me,st){st===!0&&(ge*=Me,te*=Me,be*=Me),fe.set(ge,te,be,Me),pe.equals(fe)===!1&&(e.clearColor(ge,te,be,Me),pe.copy(fe))},reset:function(){L=!1,Q=null,pe.set(-1,0,0,0)}}}function i(){let L=!1,fe=!1,Q=null,pe=null,ge=null;return{setReversed:function(te){if(fe!==te){const be=n.get("EXT_clip_control");te?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),fe=te;const Me=ge;ge=null,this.setClear(Me)}},getReversed:function(){return fe},setTest:function(te){te?re(e.DEPTH_TEST):Pe(e.DEPTH_TEST)},setMask:function(te){Q!==te&&!L&&(e.depthMask(te),Q=te)},setFunc:function(te){if(fe&&(te=vs[te]),pe!==te){switch(te){case gs:e.depthFunc(e.NEVER);break;case _s:e.depthFunc(e.ALWAYS);break;case ms:e.depthFunc(e.LESS);break;case Yi:e.depthFunc(e.LEQUAL);break;case hs:e.depthFunc(e.EQUAL);break;case ps:e.depthFunc(e.GEQUAL);break;case ds:e.depthFunc(e.GREATER);break;case us:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pe=te}},setLocked:function(te){L=te},setClear:function(te){ge!==te&&(ge=te,fe&&(te=1-te),e.clearDepth(te))},reset:function(){L=!1,Q=null,pe=null,ge=null,fe=!1}}}function a(){let L=!1,fe=null,Q=null,pe=null,ge=null,te=null,be=null,Me=null,st=null;return{setTest:function(et){L||(et?re(e.STENCIL_TEST):Pe(e.STENCIL_TEST))},setMask:function(et){fe!==et&&!L&&(e.stencilMask(et),fe=et)},setFunc:function(et,It,Dt){(Q!==et||pe!==It||ge!==Dt)&&(e.stencilFunc(et,It,Dt),Q=et,pe=It,ge=Dt)},setOp:function(et,It,Dt){(te!==et||be!==It||Me!==Dt)&&(e.stencilOp(et,It,Dt),te=et,be=It,Me=Dt)},setLocked:function(et){L=et},setClear:function(et){st!==et&&(e.clearStencil(et),st=et)},reset:function(){L=!1,fe=null,Q=null,pe=null,ge=null,te=null,be=null,Me=null,st=null}}}const r=new t,o=new i,s=new a,l=new WeakMap,c=new WeakMap;let _={},h={},d={},m=new WeakMap,x=[],T=null,p=!1,f=null,b=null,C=null,S=null,A=null,R=null,w=null,g=new Ye(0,0,0),E=0,P=!1,y=null,N=null,$=null,Z=null,O=null;const X=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,B=0;const ee=e.getParameter(e.VERSION);ee.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(ee)[1]),D=B>=1):ee.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),D=B>=2);let j=null,J={};const oe=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),Ae=new Mt().fromArray(oe),ue=new Mt().fromArray(ae);function q(L,fe,Q,pe){const ge=new Uint8Array(4),te=e.createTexture();e.bindTexture(L,te),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let be=0;be<Q;be++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(fe,0,e.RGBA,1,1,pe,0,e.RGBA,e.UNSIGNED_BYTE,ge):e.texImage2D(fe+be,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,ge);return te}const se={};se[e.TEXTURE_2D]=q(e.TEXTURE_2D,e.TEXTURE_2D,1),se[e.TEXTURE_CUBE_MAP]=q(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[e.TEXTURE_2D_ARRAY]=q(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),se[e.TEXTURE_3D]=q(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),s.setClear(0),re(e.DEPTH_TEST),o.setFunc(Yi),at(!1),lt(Qi),re(e.CULL_FACE),We(Xt);function re(L){_[L]!==!0&&(e.enable(L),_[L]=!0)}function Pe(L){_[L]!==!1&&(e.disable(L),_[L]=!1)}function De(L,fe){return d[L]!==fe?(e.bindFramebuffer(L,fe),d[L]=fe,L===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=fe),L===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=fe),!0):!1}function Le(L,fe){let Q=x,pe=!1;if(L){Q=m.get(fe),Q===void 0&&(Q=[],m.set(fe,Q));const ge=L.textures;if(Q.length!==ge.length||Q[0]!==e.COLOR_ATTACHMENT0){for(let te=0,be=ge.length;te<be;te++)Q[te]=e.COLOR_ATTACHMENT0+te;Q.length=ge.length,pe=!0}}else Q[0]!==e.BACK&&(Q[0]=e.BACK,pe=!0);pe&&e.drawBuffers(Q)}function ot(L){return T!==L?(e.useProgram(L),T=L,!0):!1}const Oe={[Mn]:e.FUNC_ADD,[bo]:e.FUNC_SUBTRACT,[Ro]:e.FUNC_REVERSE_SUBTRACT};Oe[es]=e.MIN,Oe[ts]=e.MAX;const Ke={[wo]:e.ZERO,[Co]:e.ONE,[Po]:e.SRC_COLOR,[yo]:e.SRC_ALPHA,[Lo]:e.SRC_ALPHA_SATURATE,[Io]:e.DST_COLOR,[Do]:e.DST_ALPHA,[Uo]:e.ONE_MINUS_SRC_COLOR,[No]:e.ONE_MINUS_SRC_ALPHA,[Fo]:e.ONE_MINUS_DST_COLOR,[Oo]:e.ONE_MINUS_DST_ALPHA,[Bo]:e.CONSTANT_COLOR,[Go]:e.ONE_MINUS_CONSTANT_COLOR,[Ho]:e.CONSTANT_ALPHA,[Vo]:e.ONE_MINUS_CONSTANT_ALPHA};function We(L,fe,Q,pe,ge,te,be,Me,st,et){if(L===Xt){p===!0&&(Pe(e.BLEND),p=!1);return}if(p===!1&&(re(e.BLEND),p=!0),L!==ko){if(L!==f||et!==P){if((b!==Mn||A!==Mn)&&(e.blendEquation(e.FUNC_ADD),b=Mn,A=Mn),et)switch(L){case Hn:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case $i:e.blendFunc(e.ONE,e.ONE);break;case Zi:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case ji:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:it("WebGLState: Invalid blending: ",L);break}else switch(L){case Hn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case $i:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Zi:it("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ji:it("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:it("WebGLState: Invalid blending: ",L);break}C=null,S=null,R=null,w=null,g.set(0,0,0),E=0,f=L,P=et}return}ge=ge||fe,te=te||Q,be=be||pe,(fe!==b||ge!==A)&&(e.blendEquationSeparate(Oe[fe],Oe[ge]),b=fe,A=ge),(Q!==C||pe!==S||te!==R||be!==w)&&(e.blendFuncSeparate(Ke[Q],Ke[pe],Ke[te],Ke[be]),C=Q,S=pe,R=te,w=be),(Me.equals(g)===!1||st!==E)&&(e.blendColor(Me.r,Me.g,Me.b,st),g.copy(Me),E=st),f=L,P=!1}function ze(L,fe){L.side===Pt?Pe(e.CULL_FACE):re(e.CULL_FACE);let Q=L.side===bt;fe&&(Q=!Q),at(Q),L.blending===Hn&&L.transparent===!1?We(Xt):We(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const pe=L.stencilWrite;s.setTest(pe),pe&&(s.setMask(L.stencilWriteMask),s.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),s.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ve(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?re(e.SAMPLE_ALPHA_TO_COVERAGE):Pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function at(L){y!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),y=L)}function lt(L){L!==zo?(re(e.CULL_FACE),L!==N&&(L===Qi?e.cullFace(e.BACK):L===Wo?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Pe(e.CULL_FACE),N=L}function ft(L){L!==$&&(D&&e.lineWidth(L),$=L)}function ve(L,fe,Q){L?(re(e.POLYGON_OFFSET_FILL),(Z!==fe||O!==Q)&&(Z=fe,O=Q,o.getReversed()&&(fe=-fe),e.polygonOffset(fe,Q))):Pe(e.POLYGON_OFFSET_FILL)}function Re(L){L?re(e.SCISSOR_TEST):Pe(e.SCISSOR_TEST)}function Fe(L){L===void 0&&(L=e.TEXTURE0+X-1),j!==L&&(e.activeTexture(L),j=L)}function I(L,fe,Q){Q===void 0&&(j===null?Q=e.TEXTURE0+X-1:Q=j);let pe=J[Q];pe===void 0&&(pe={type:void 0,texture:void 0},J[Q]=pe),(pe.type!==L||pe.texture!==fe)&&(j!==Q&&(e.activeTexture(Q),j=Q),e.bindTexture(L,fe||se[L]),pe.type=L,pe.texture=fe)}function ht(){const L=J[j];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function je(){try{e.compressedTexImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function M(){try{e.compressedTexImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function u(){try{e.texSubImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function F(){try{e.texSubImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function K(){try{e.compressedTexSubImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function ie(){try{e.texStorage2D(...arguments)}catch(L){it("WebGLState:",L)}}function ne(){try{e.texStorage3D(...arguments)}catch(L){it("WebGLState:",L)}}function k(){try{e.texImage2D(...arguments)}catch(L){it("WebGLState:",L)}}function Y(){try{e.texImage3D(...arguments)}catch(L){it("WebGLState:",L)}}function ce(L){return h[L]!==void 0?h[L]:e.getParameter(L)}function Ee(L,fe){h[L]!==fe&&(e.pixelStorei(L,fe),h[L]=fe)}function de(L){Ae.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),Ae.copy(L))}function le(L){ue.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),ue.copy(L))}function we(L,fe){let Q=c.get(fe);Q===void 0&&(Q=new WeakMap,c.set(fe,Q));let pe=Q.get(L);pe===void 0&&(pe=e.getUniformBlockIndex(fe,L.name),Q.set(L,pe))}function Ie(L,fe){const pe=c.get(fe).get(L);l.get(fe)!==pe&&(e.uniformBlockBinding(fe,pe,L.__bindingPointIndex),l.set(fe,pe))}function Ue(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),_={},h={},j=null,J={},d={},m=new WeakMap,x=[],T=null,p=!1,f=null,b=null,C=null,S=null,A=null,R=null,w=null,g=new Ye(0,0,0),E=0,P=!1,y=null,N=null,$=null,Z=null,O=null,Ae.set(0,0,e.canvas.width,e.canvas.height),ue.set(0,0,e.canvas.width,e.canvas.height),r.reset(),o.reset(),s.reset()}return{buffers:{color:r,depth:o,stencil:s},enable:re,disable:Pe,bindFramebuffer:De,drawBuffers:Le,useProgram:ot,setBlending:We,setMaterial:ze,setFlipSided:at,setCullFace:lt,setLineWidth:ft,setPolygonOffset:ve,setScissorTest:Re,activeTexture:Fe,bindTexture:I,unbindTexture:ht,compressedTexImage2D:je,compressedTexImage3D:M,texImage2D:k,texImage3D:Y,pixelStorei:Ee,getParameter:ce,updateUBOMapping:we,uniformBlockBinding:Ie,texStorage2D:ie,texStorage3D:ne,texSubImage2D:u,texSubImage3D:F,compressedTexSubImage2D:V,compressedTexSubImage3D:K,scissor:de,viewport:le,reset:Ue}}function Nd(e,n,t,i,a,r,o){const s=n.has("WEBGL_multisampled_render_to_texture")?n.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,_=new WeakMap,h=new Set;let d;const m=new WeakMap;let x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function T(M,u){return x?new OffscreenCanvas(M,u):Ss("canvas")}function p(M,u,F){let V=1;const K=je(M);if((K.width>F||K.height>F)&&(V=F/Math.max(K.width,K.height)),V<1)if(typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&M instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&M instanceof ImageBitmap||typeof VideoFrame<"u"&&M instanceof VideoFrame){const ie=Math.floor(V*K.width),ne=Math.floor(V*K.height);d===void 0&&(d=T(ie,ne));const k=u?T(ie,ne):d;return k.width=ie,k.height=ne,k.getContext("2d").drawImage(M,0,0,ie,ne),Ze("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+ie+"x"+ne+")."),k}else return"data"in M&&Ze("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),M;return M}function f(M){return M.generateMipmaps}function b(M){e.generateMipmap(M)}function C(M){return M.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:M.isWebGL3DRenderTarget?e.TEXTURE_3D:M.isWebGLArrayRenderTarget||M.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(M,u,F,V,K,ie=!1){if(M!==null){if(e[M]!==void 0)return e[M];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+M+"'")}let ne;V&&(ne=n.get("EXT_texture_norm16"),ne||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let k=u;if(u===e.RED&&(F===e.FLOAT&&(k=e.R32F),F===e.HALF_FLOAT&&(k=e.R16F),F===e.UNSIGNED_BYTE&&(k=e.R8),F===e.UNSIGNED_SHORT&&ne&&(k=ne.R16_EXT),F===e.SHORT&&ne&&(k=ne.R16_SNORM_EXT)),u===e.RED_INTEGER&&(F===e.UNSIGNED_BYTE&&(k=e.R8UI),F===e.UNSIGNED_SHORT&&(k=e.R16UI),F===e.UNSIGNED_INT&&(k=e.R32UI),F===e.BYTE&&(k=e.R8I),F===e.SHORT&&(k=e.R16I),F===e.INT&&(k=e.R32I)),u===e.RG&&(F===e.FLOAT&&(k=e.RG32F),F===e.HALF_FLOAT&&(k=e.RG16F),F===e.UNSIGNED_BYTE&&(k=e.RG8),F===e.UNSIGNED_SHORT&&ne&&(k=ne.RG16_EXT),F===e.SHORT&&ne&&(k=ne.RG16_SNORM_EXT)),u===e.RG_INTEGER&&(F===e.UNSIGNED_BYTE&&(k=e.RG8UI),F===e.UNSIGNED_SHORT&&(k=e.RG16UI),F===e.UNSIGNED_INT&&(k=e.RG32UI),F===e.BYTE&&(k=e.RG8I),F===e.SHORT&&(k=e.RG16I),F===e.INT&&(k=e.RG32I)),u===e.RGB_INTEGER&&(F===e.UNSIGNED_BYTE&&(k=e.RGB8UI),F===e.UNSIGNED_SHORT&&(k=e.RGB16UI),F===e.UNSIGNED_INT&&(k=e.RGB32UI),F===e.BYTE&&(k=e.RGB8I),F===e.SHORT&&(k=e.RGB16I),F===e.INT&&(k=e.RGB32I)),u===e.RGBA_INTEGER&&(F===e.UNSIGNED_BYTE&&(k=e.RGBA8UI),F===e.UNSIGNED_SHORT&&(k=e.RGBA16UI),F===e.UNSIGNED_INT&&(k=e.RGBA32UI),F===e.BYTE&&(k=e.RGBA8I),F===e.SHORT&&(k=e.RGBA16I),F===e.INT&&(k=e.RGBA32I)),u===e.RGB&&(F===e.UNSIGNED_SHORT&&ne&&(k=ne.RGB16_EXT),F===e.SHORT&&ne&&(k=ne.RGB16_SNORM_EXT),F===e.UNSIGNED_INT_5_9_9_9_REV&&(k=e.RGB9_E5),F===e.UNSIGNED_INT_10F_11F_11F_REV&&(k=e.R11F_G11F_B10F)),u===e.RGBA){const Y=ie?Ba:rt.getTransfer(K);F===e.FLOAT&&(k=e.RGBA32F),F===e.HALF_FLOAT&&(k=e.RGBA16F),F===e.UNSIGNED_BYTE&&(k=Y===nt?e.SRGB8_ALPHA8:e.RGBA8),F===e.UNSIGNED_SHORT&&ne&&(k=ne.RGBA16_EXT),F===e.SHORT&&ne&&(k=ne.RGBA16_SNORM_EXT),F===e.UNSIGNED_SHORT_4_4_4_4&&(k=e.RGBA4),F===e.UNSIGNED_SHORT_5_5_5_1&&(k=e.RGB5_A1)}return(k===e.R16F||k===e.R32F||k===e.RG16F||k===e.RG32F||k===e.RGBA16F||k===e.RGBA32F)&&n.get("EXT_color_buffer_float"),k}function A(M,u){let F;return M?u===null||u===sn||u===In?F=e.DEPTH24_STENCIL8:u===Qt?F=e.DEPTH32F_STENCIL8:u===qn&&(F=e.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):u===null||u===sn||u===In?F=e.DEPTH_COMPONENT24:u===Qt?F=e.DEPTH_COMPONENT32F:u===qn&&(F=e.DEPTH_COMPONENT16),F}function R(M,u){return f(M)===!0||M.isFramebufferTexture&&M.minFilter!==Gt&&M.minFilter!==vt?Math.log2(Math.max(u.width,u.height))+1:M.mipmaps!==void 0&&M.mipmaps.length>0?M.mipmaps.length:M.isCompressedTexture&&Array.isArray(M.image)?u.mipmaps.length:1}function w(M){const u=M.target;u.removeEventListener("dispose",w),E(u),u.isVideoTexture&&_.delete(u),u.isHTMLTexture&&h.delete(u)}function g(M){const u=M.target;u.removeEventListener("dispose",g),y(u)}function E(M){const u=i.get(M);if(u.__webglInit===void 0)return;const F=M.source,V=m.get(F);if(V){const K=V[u.__cacheKey];K.usedTimes--,K.usedTimes===0&&P(M),Object.keys(V).length===0&&m.delete(F)}i.remove(M)}function P(M){const u=i.get(M);e.deleteTexture(u.__webglTexture);const F=M.source,V=m.get(F);delete V[u.__cacheKey],o.memory.textures--}function y(M){const u=i.get(M);if(M.depthTexture&&(M.depthTexture.dispose(),i.remove(M.depthTexture)),M.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(u.__webglFramebuffer[V]))for(let K=0;K<u.__webglFramebuffer[V].length;K++)e.deleteFramebuffer(u.__webglFramebuffer[V][K]);else e.deleteFramebuffer(u.__webglFramebuffer[V]);u.__webglDepthbuffer&&e.deleteRenderbuffer(u.__webglDepthbuffer[V])}else{if(Array.isArray(u.__webglFramebuffer))for(let V=0;V<u.__webglFramebuffer.length;V++)e.deleteFramebuffer(u.__webglFramebuffer[V]);else e.deleteFramebuffer(u.__webglFramebuffer);if(u.__webglDepthbuffer&&e.deleteRenderbuffer(u.__webglDepthbuffer),u.__webglMultisampledFramebuffer&&e.deleteFramebuffer(u.__webglMultisampledFramebuffer),u.__webglColorRenderbuffer)for(let V=0;V<u.__webglColorRenderbuffer.length;V++)u.__webglColorRenderbuffer[V]&&e.deleteRenderbuffer(u.__webglColorRenderbuffer[V]);u.__webglDepthRenderbuffer&&e.deleteRenderbuffer(u.__webglDepthRenderbuffer)}const F=M.textures;for(let V=0,K=F.length;V<K;V++){const ie=i.get(F[V]);ie.__webglTexture&&(e.deleteTexture(ie.__webglTexture),o.memory.textures--),i.remove(F[V])}i.remove(M)}let N=0;function $(){N=0}function Z(){return N}function O(M){N=M}function X(){const M=N;return M>=a.maxTextures&&Ze("WebGLTextures: Trying to use "+M+" texture units while this GPU supports only "+a.maxTextures),N+=1,M}function D(M){const u=[];return u.push(M.wrapS),u.push(M.wrapT),u.push(M.wrapR||0),u.push(M.magFilter),u.push(M.minFilter),u.push(M.anisotropy),u.push(M.internalFormat),u.push(M.format),u.push(M.type),u.push(M.generateMipmaps),u.push(M.premultiplyAlpha),u.push(M.flipY),u.push(M.unpackAlignment),u.push(M.colorSpace),u.join()}function B(M,u){const F=i.get(M);if(M.isVideoTexture&&I(M),M.isRenderTargetTexture===!1&&M.isExternalTexture!==!0&&M.version>0&&F.__version!==M.version){const V=M.image;if(V===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Pe(F,M,u);return}}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(e.TEXTURE_2D,F.__webglTexture,e.TEXTURE0+u)}function ee(M,u){const F=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){Pe(F,M,u);return}else M.isExternalTexture&&(F.__webglTexture=M.sourceTexture?M.sourceTexture:null);t.bindTexture(e.TEXTURE_2D_ARRAY,F.__webglTexture,e.TEXTURE0+u)}function j(M,u){const F=i.get(M);if(M.isRenderTargetTexture===!1&&M.version>0&&F.__version!==M.version){Pe(F,M,u);return}t.bindTexture(e.TEXTURE_3D,F.__webglTexture,e.TEXTURE0+u)}function J(M,u){const F=i.get(M);if(M.isCubeDepthTexture!==!0&&M.version>0&&F.__version!==M.version){De(F,M,u);return}t.bindTexture(e.TEXTURE_CUBE_MAP,F.__webglTexture,e.TEXTURE0+u)}const oe={[Xn]:e.REPEAT,[Wn]:e.CLAMP_TO_EDGE,[ga]:e.MIRRORED_REPEAT},ae={[Gt]:e.NEAREST,[va]:e.NEAREST_MIPMAP_NEAREST,[wn]:e.NEAREST_MIPMAP_LINEAR,[vt]:e.LINEAR,[Vn]:e.LINEAR_MIPMAP_NEAREST,[$t]:e.LINEAR_MIPMAP_LINEAR},Ae={[Xo]:e.NEVER,[qo]:e.ALWAYS,[Ko]:e.LESS,[Ui]:e.LEQUAL,[Yo]:e.EQUAL,[Di]:e.GEQUAL,[jo]:e.GREATER,[Zo]:e.NOTEQUAL};function ue(M,u){if(u.type===Qt&&n.has("OES_texture_float_linear")===!1&&(u.magFilter===vt||u.magFilter===Vn||u.magFilter===wn||u.magFilter===$t||u.minFilter===vt||u.minFilter===Vn||u.minFilter===wn||u.minFilter===$t)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(M,e.TEXTURE_WRAP_S,oe[u.wrapS]),e.texParameteri(M,e.TEXTURE_WRAP_T,oe[u.wrapT]),(M===e.TEXTURE_3D||M===e.TEXTURE_2D_ARRAY)&&e.texParameteri(M,e.TEXTURE_WRAP_R,oe[u.wrapR]),e.texParameteri(M,e.TEXTURE_MAG_FILTER,ae[u.magFilter]),e.texParameteri(M,e.TEXTURE_MIN_FILTER,ae[u.minFilter]),u.compareFunction&&(e.texParameteri(M,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(M,e.TEXTURE_COMPARE_FUNC,Ae[u.compareFunction])),n.has("EXT_texture_filter_anisotropic")===!0){if(u.magFilter===Gt||u.minFilter!==wn&&u.minFilter!==$t||u.type===Qt&&n.has("OES_texture_float_linear")===!1)return;if(u.anisotropy>1||i.get(u).__currentAnisotropy){const F=n.get("EXT_texture_filter_anisotropic");e.texParameterf(M,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(u.anisotropy,a.getMaxAnisotropy())),i.get(u).__currentAnisotropy=u.anisotropy}}}function q(M,u){let F=!1;M.__webglInit===void 0&&(M.__webglInit=!0,u.addEventListener("dispose",w));const V=u.source;let K=m.get(V);K===void 0&&(K={},m.set(V,K));const ie=D(u);if(ie!==M.__cacheKey){K[ie]===void 0&&(K[ie]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,F=!0),K[ie].usedTimes++;const ne=K[M.__cacheKey];ne!==void 0&&(K[M.__cacheKey].usedTimes--,ne.usedTimes===0&&P(u)),M.__cacheKey=ie,M.__webglTexture=K[ie].texture}return F}function se(M,u,F){return Math.floor(Math.floor(M/F)/u)}function re(M,u,F,V){const ie=M.updateRanges;if(ie.length===0)t.texSubImage2D(e.TEXTURE_2D,0,0,0,u.width,u.height,F,V,u.data);else{ie.sort((Ee,de)=>Ee.start-de.start);let ne=0;for(let Ee=1;Ee<ie.length;Ee++){const de=ie[ne],le=ie[Ee],we=de.start+de.count,Ie=se(le.start,u.width,4),Ue=se(de.start,u.width,4);le.start<=we+1&&Ie===Ue&&se(le.start+le.count-1,u.width,4)===Ie?de.count=Math.max(de.count,le.start+le.count-de.start):(++ne,ie[ne]=le)}ie.length=ne+1;const k=t.getParameter(e.UNPACK_ROW_LENGTH),Y=t.getParameter(e.UNPACK_SKIP_PIXELS),ce=t.getParameter(e.UNPACK_SKIP_ROWS);t.pixelStorei(e.UNPACK_ROW_LENGTH,u.width);for(let Ee=0,de=ie.length;Ee<de;Ee++){const le=ie[Ee],we=Math.floor(le.start/4),Ie=Math.ceil(le.count/4),Ue=we%u.width,L=Math.floor(we/u.width),fe=Ie,Q=1;t.pixelStorei(e.UNPACK_SKIP_PIXELS,Ue),t.pixelStorei(e.UNPACK_SKIP_ROWS,L),t.texSubImage2D(e.TEXTURE_2D,0,Ue,L,fe,Q,F,V,u.data)}M.clearUpdateRanges(),t.pixelStorei(e.UNPACK_ROW_LENGTH,k),t.pixelStorei(e.UNPACK_SKIP_PIXELS,Y),t.pixelStorei(e.UNPACK_SKIP_ROWS,ce)}}function Pe(M,u,F){let V=e.TEXTURE_2D;(u.isDataArrayTexture||u.isCompressedArrayTexture)&&(V=e.TEXTURE_2D_ARRAY),u.isData3DTexture&&(V=e.TEXTURE_3D);const K=q(M,u),ie=u.source;t.bindTexture(V,M.__webglTexture,e.TEXTURE0+F);const ne=i.get(ie);if(ie.version!==ne.__version||K===!0){if(t.activeTexture(e.TEXTURE0+F),(typeof ImageBitmap<"u"&&u.image instanceof ImageBitmap)===!1){const Q=rt.getPrimaries(rt.workingColorSpace),pe=u.colorSpace===un?null:rt.getPrimaries(u.colorSpace),ge=u.colorSpace===un||Q===pe?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,u.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,u.premultiplyAlpha),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ge)}t.pixelStorei(e.UNPACK_ALIGNMENT,u.unpackAlignment);let Y=p(u.image,!1,a.maxTextureSize);Y=ht(u,Y);const ce=r.convert(u.format,u.colorSpace),Ee=r.convert(u.type);let de=S(u.internalFormat,ce,Ee,u.normalized,u.colorSpace,u.isVideoTexture);ue(V,u);let le;const we=u.mipmaps,Ie=u.isVideoTexture!==!0,Ue=ne.__version===void 0||K===!0,L=ie.dataReady,fe=R(u,Y);if(u.isDepthTexture)de=A(u.format===dn,u.type),Ue&&(Ie?t.texStorage2D(e.TEXTURE_2D,1,de,Y.width,Y.height):t.texImage2D(e.TEXTURE_2D,0,de,Y.width,Y.height,0,ce,Ee,null));else if(u.isDataTexture)if(we.length>0){Ie&&Ue&&t.texStorage2D(e.TEXTURE_2D,fe,de,we[0].width,we[0].height);for(let Q=0,pe=we.length;Q<pe;Q++)le=we[Q],Ie?L&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,le.width,le.height,ce,Ee,le.data):t.texImage2D(e.TEXTURE_2D,Q,de,le.width,le.height,0,ce,Ee,le.data);u.generateMipmaps=!1}else Ie?(Ue&&t.texStorage2D(e.TEXTURE_2D,fe,de,Y.width,Y.height),L&&re(u,Y,ce,Ee)):t.texImage2D(e.TEXTURE_2D,0,de,Y.width,Y.height,0,ce,Ee,Y.data);else if(u.isCompressedTexture)if(u.isCompressedArrayTexture){Ie&&Ue&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,de,we[0].width,we[0].height,Y.depth);for(let Q=0,pe=we.length;Q<pe;Q++)if(le=we[Q],u.format!==zt)if(ce!==null)if(Ie){if(L)if(u.layerUpdates.size>0){const ge=er(le.width,le.height,u.format,u.type);for(const te of u.layerUpdates){const be=le.data.subarray(te*ge/le.data.BYTES_PER_ELEMENT,(te+1)*ge/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,te,le.width,le.height,1,ce,be)}u.clearLayerUpdates()}else t.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,Y.depth,ce,le.data)}else t.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Q,de,le.width,le.height,Y.depth,0,le.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ie?L&&t.texSubImage3D(e.TEXTURE_2D_ARRAY,Q,0,0,0,le.width,le.height,Y.depth,ce,Ee,le.data):t.texImage3D(e.TEXTURE_2D_ARRAY,Q,de,le.width,le.height,Y.depth,0,ce,Ee,le.data)}else{Ie&&Ue&&t.texStorage2D(e.TEXTURE_2D,fe,de,we[0].width,we[0].height);for(let Q=0,pe=we.length;Q<pe;Q++)le=we[Q],u.format!==zt?ce!==null?Ie?L&&t.compressedTexSubImage2D(e.TEXTURE_2D,Q,0,0,le.width,le.height,ce,le.data):t.compressedTexImage2D(e.TEXTURE_2D,Q,de,le.width,le.height,0,le.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ie?L&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,le.width,le.height,ce,Ee,le.data):t.texImage2D(e.TEXTURE_2D,Q,de,le.width,le.height,0,ce,Ee,le.data)}else if(u.isDataArrayTexture)if(Ie){if(Ue&&t.texStorage3D(e.TEXTURE_2D_ARRAY,fe,de,Y.width,Y.height,Y.depth),L)if(u.layerUpdates.size>0){const Q=er(Y.width,Y.height,u.format,u.type);for(const pe of u.layerUpdates){const ge=Y.data.subarray(pe*Q/Y.data.BYTES_PER_ELEMENT,(pe+1)*Q/Y.data.BYTES_PER_ELEMENT);t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,pe,Y.width,Y.height,1,ce,Ee,ge)}u.clearLayerUpdates()}else t.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Y.width,Y.height,Y.depth,ce,Ee,Y.data)}else t.texImage3D(e.TEXTURE_2D_ARRAY,0,de,Y.width,Y.height,Y.depth,0,ce,Ee,Y.data);else if(u.isData3DTexture)Ie?(Ue&&t.texStorage3D(e.TEXTURE_3D,fe,de,Y.width,Y.height,Y.depth),L&&t.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Y.width,Y.height,Y.depth,ce,Ee,Y.data)):t.texImage3D(e.TEXTURE_3D,0,de,Y.width,Y.height,Y.depth,0,ce,Ee,Y.data);else if(u.isFramebufferTexture){if(Ue)if(Ie)t.texStorage2D(e.TEXTURE_2D,fe,de,Y.width,Y.height);else{let Q=Y.width,pe=Y.height;for(let ge=0;ge<fe;ge++)t.texImage2D(e.TEXTURE_2D,ge,de,Q,pe,0,ce,Ee,null),Q>>=1,pe>>=1}}else if(u.isHTMLTexture){if("texElementImage2D"in e){const Q=e.canvas;if(Q.hasAttribute("layoutsubtree")||Q.setAttribute("layoutsubtree","true"),Y.parentNode!==Q){Q.appendChild(Y),h.add(u),Q.onpaint=pe=>{const ge=pe.changedElements;for(const te of h)ge.includes(te.image)&&(te.needsUpdate=!0)},Q.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,Y);else{const ge=e.RGBA,te=e.RGBA,be=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,ge,te,be,Y)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(we.length>0){if(Ie&&Ue){const Q=je(we[0]);t.texStorage2D(e.TEXTURE_2D,fe,de,Q.width,Q.height)}for(let Q=0,pe=we.length;Q<pe;Q++)le=we[Q],Ie?L&&t.texSubImage2D(e.TEXTURE_2D,Q,0,0,ce,Ee,le):t.texImage2D(e.TEXTURE_2D,Q,de,ce,Ee,le);u.generateMipmaps=!1}else if(Ie){if(Ue){const Q=je(Y);t.texStorage2D(e.TEXTURE_2D,fe,de,Q.width,Q.height)}L&&t.texSubImage2D(e.TEXTURE_2D,0,0,0,ce,Ee,Y)}else t.texImage2D(e.TEXTURE_2D,0,de,ce,Ee,Y);f(u)&&b(V),ne.__version=ie.version,u.onUpdate&&u.onUpdate(u)}M.__version=u.version}function De(M,u,F){if(u.image.length!==6)return;const V=q(M,u),K=u.source;t.bindTexture(e.TEXTURE_CUBE_MAP,M.__webglTexture,e.TEXTURE0+F);const ie=i.get(K);if(K.version!==ie.__version||V===!0){t.activeTexture(e.TEXTURE0+F);const ne=rt.getPrimaries(rt.workingColorSpace),k=u.colorSpace===un?null:rt.getPrimaries(u.colorSpace),Y=u.colorSpace===un||ne===k?e.NONE:e.BROWSER_DEFAULT_WEBGL;t.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,u.flipY),t.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,u.premultiplyAlpha),t.pixelStorei(e.UNPACK_ALIGNMENT,u.unpackAlignment),t.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Y);const ce=u.isCompressedTexture||u.image[0].isCompressedTexture,Ee=u.image[0]&&u.image[0].isDataTexture,de=[];for(let te=0;te<6;te++)!ce&&!Ee?de[te]=p(u.image[te],!0,a.maxCubemapSize):de[te]=Ee?u.image[te].image:u.image[te],de[te]=ht(u,de[te]);const le=de[0],we=r.convert(u.format,u.colorSpace),Ie=r.convert(u.type),Ue=S(u.internalFormat,we,Ie,u.normalized,u.colorSpace),L=u.isVideoTexture!==!0,fe=ie.__version===void 0||V===!0,Q=K.dataReady;let pe=R(u,le);ue(e.TEXTURE_CUBE_MAP,u);let ge;if(ce){L&&fe&&t.texStorage2D(e.TEXTURE_CUBE_MAP,pe,Ue,le.width,le.height);for(let te=0;te<6;te++){ge=de[te].mipmaps;for(let be=0;be<ge.length;be++){const Me=ge[be];u.format!==zt?we!==null?L?Q&&t.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,0,0,Me.width,Me.height,we,Me.data):t.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,Ue,Me.width,Me.height,0,Me.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?Q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,0,0,Me.width,Me.height,we,Ie,Me.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be,Ue,Me.width,Me.height,0,we,Ie,Me.data)}}}else{if(ge=u.mipmaps,L&&fe){ge.length>0&&pe++;const te=je(de[0]);t.texStorage2D(e.TEXTURE_CUBE_MAP,pe,Ue,te.width,te.height)}for(let te=0;te<6;te++)if(Ee){L?Q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,de[te].width,de[te].height,we,Ie,de[te].data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,de[te].width,de[te].height,0,we,Ie,de[te].data);for(let be=0;be<ge.length;be++){const st=ge[be].image[te].image;L?Q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,0,0,st.width,st.height,we,Ie,st.data):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,Ue,st.width,st.height,0,we,Ie,st.data)}}else{L?Q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,we,Ie,de[te]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ue,we,Ie,de[te]);for(let be=0;be<ge.length;be++){const Me=ge[be];L?Q&&t.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,0,0,we,Ie,Me.image[te]):t.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+te,be+1,Ue,we,Ie,Me.image[te])}}}f(u)&&b(e.TEXTURE_CUBE_MAP),ie.__version=K.version,u.onUpdate&&u.onUpdate(u)}M.__version=u.version}function Le(M,u,F,V,K,ie){const ne=r.convert(F.format,F.colorSpace),k=r.convert(F.type),Y=S(F.internalFormat,ne,k,F.normalized,F.colorSpace),ce=i.get(u),Ee=i.get(F);if(Ee.__renderTarget=u,!ce.__hasExternalTextures){const de=Math.max(1,u.width>>ie),le=Math.max(1,u.height>>ie);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?t.texImage3D(K,ie,Y,de,le,u.depth,0,ne,k,null):t.texImage2D(K,ie,Y,de,le,0,ne,k,null)}t.bindFramebuffer(e.FRAMEBUFFER,M),Fe(u)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,V,K,Ee.__webglTexture,0,Re(u)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,V,K,Ee.__webglTexture,ie),t.bindFramebuffer(e.FRAMEBUFFER,null)}function ot(M,u,F){if(e.bindRenderbuffer(e.RENDERBUFFER,M),u.depthBuffer){const V=u.depthTexture,K=V&&V.isDepthTexture?V.type:null,ie=A(u.stencilBuffer,K),ne=u.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Fe(u)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Re(u),ie,u.width,u.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,Re(u),ie,u.width,u.height):e.renderbufferStorage(e.RENDERBUFFER,ie,u.width,u.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,ne,e.RENDERBUFFER,M)}else{const V=u.textures;for(let K=0;K<V.length;K++){const ie=V[K],ne=r.convert(ie.format,ie.colorSpace),k=r.convert(ie.type),Y=S(ie.internalFormat,ne,k,ie.normalized,ie.colorSpace);Fe(u)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Re(u),Y,u.width,u.height):F?e.renderbufferStorageMultisample(e.RENDERBUFFER,Re(u),Y,u.width,u.height):e.renderbufferStorage(e.RENDERBUFFER,Y,u.width,u.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Oe(M,u,F){const V=u.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(e.FRAMEBUFFER,M),!(u.depthTexture&&u.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const K=i.get(u.depthTexture);if(K.__renderTarget=u,(!K.__webglTexture||u.depthTexture.image.width!==u.width||u.depthTexture.image.height!==u.height)&&(u.depthTexture.image.width=u.width,u.depthTexture.image.height=u.height,u.depthTexture.needsUpdate=!0),V){if(K.__webglInit===void 0&&(K.__webglInit=!0,u.depthTexture.addEventListener("dispose",w)),K.__webglTexture===void 0){K.__webglTexture=e.createTexture(),t.bindTexture(e.TEXTURE_CUBE_MAP,K.__webglTexture),ue(e.TEXTURE_CUBE_MAP,u.depthTexture);const ce=r.convert(u.depthTexture.format),Ee=r.convert(u.depthTexture.type);let de;u.depthTexture.format===gn?de=e.DEPTH_COMPONENT24:u.depthTexture.format===dn&&(de=e.DEPTH24_STENCIL8);for(let le=0;le<6;le++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+le,0,de,u.width,u.height,0,ce,Ee,null)}}else B(u.depthTexture,0);const ie=K.__webglTexture,ne=Re(u),k=V?e.TEXTURE_CUBE_MAP_POSITIVE_X+F:e.TEXTURE_2D,Y=u.depthTexture.format===dn?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(u.depthTexture.format===gn)Fe(u)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,k,ie,0,ne):e.framebufferTexture2D(e.FRAMEBUFFER,Y,k,ie,0);else if(u.depthTexture.format===dn)Fe(u)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,k,ie,0,ne):e.framebufferTexture2D(e.FRAMEBUFFER,Y,k,ie,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(M){const u=i.get(M),F=M.isWebGLCubeRenderTarget===!0;if(u.__boundDepthTexture!==M.depthTexture){const V=M.depthTexture;if(u.__depthDisposeCallback&&u.__depthDisposeCallback(),V){const K=()=>{delete u.__boundDepthTexture,delete u.__depthDisposeCallback,V.removeEventListener("dispose",K)};V.addEventListener("dispose",K),u.__depthDisposeCallback=K}u.__boundDepthTexture=V}if(M.depthTexture&&!u.__autoAllocateDepthBuffer)if(F)for(let V=0;V<6;V++)Oe(u.__webglFramebuffer[V],M,V);else{const V=M.texture.mipmaps;V&&V.length>0?Oe(u.__webglFramebuffer[0],M,0):Oe(u.__webglFramebuffer,M,0)}else if(F){u.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer[V]),u.__webglDepthbuffer[V]===void 0)u.__webglDepthbuffer[V]=e.createRenderbuffer(),ot(u.__webglDepthbuffer[V],M,!1);else{const K=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=u.__webglDepthbuffer[V];e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,ie)}}else{const V=M.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer[0]):t.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),u.__webglDepthbuffer===void 0)u.__webglDepthbuffer=e.createRenderbuffer(),ot(u.__webglDepthbuffer,M,!1);else{const K=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ie=u.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,ie),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,ie)}}t.bindFramebuffer(e.FRAMEBUFFER,null)}function We(M,u,F){const V=i.get(M);u!==void 0&&Le(V.__webglFramebuffer,M,M.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),F!==void 0&&Ke(M)}function ze(M){const u=M.texture,F=i.get(M),V=i.get(u);M.addEventListener("dispose",g);const K=M.textures,ie=M.isWebGLCubeRenderTarget===!0,ne=K.length>1;if(ne||(V.__webglTexture===void 0&&(V.__webglTexture=e.createTexture()),V.__version=u.version,o.memory.textures++),ie){F.__webglFramebuffer=[];for(let k=0;k<6;k++)if(u.mipmaps&&u.mipmaps.length>0){F.__webglFramebuffer[k]=[];for(let Y=0;Y<u.mipmaps.length;Y++)F.__webglFramebuffer[k][Y]=e.createFramebuffer()}else F.__webglFramebuffer[k]=e.createFramebuffer()}else{if(u.mipmaps&&u.mipmaps.length>0){F.__webglFramebuffer=[];for(let k=0;k<u.mipmaps.length;k++)F.__webglFramebuffer[k]=e.createFramebuffer()}else F.__webglFramebuffer=e.createFramebuffer();if(ne)for(let k=0,Y=K.length;k<Y;k++){const ce=i.get(K[k]);ce.__webglTexture===void 0&&(ce.__webglTexture=e.createTexture(),o.memory.textures++)}if(M.samples>0&&Fe(M)===!1){F.__webglMultisampledFramebuffer=e.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(e.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let k=0;k<K.length;k++){const Y=K[k];F.__webglColorRenderbuffer[k]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,F.__webglColorRenderbuffer[k]);const ce=r.convert(Y.format,Y.colorSpace),Ee=r.convert(Y.type),de=S(Y.internalFormat,ce,Ee,Y.normalized,Y.colorSpace,M.isXRRenderTarget===!0),le=Re(M);e.renderbufferStorageMultisample(e.RENDERBUFFER,le,de,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+k,e.RENDERBUFFER,F.__webglColorRenderbuffer[k])}e.bindRenderbuffer(e.RENDERBUFFER,null),M.depthBuffer&&(F.__webglDepthRenderbuffer=e.createRenderbuffer(),ot(F.__webglDepthRenderbuffer,M,!0)),t.bindFramebuffer(e.FRAMEBUFFER,null)}}if(ie){t.bindTexture(e.TEXTURE_CUBE_MAP,V.__webglTexture),ue(e.TEXTURE_CUBE_MAP,u);for(let k=0;k<6;k++)if(u.mipmaps&&u.mipmaps.length>0)for(let Y=0;Y<u.mipmaps.length;Y++)Le(F.__webglFramebuffer[k][Y],M,u,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+k,Y);else Le(F.__webglFramebuffer[k],M,u,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+k,0);f(u)&&b(e.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ne){for(let k=0,Y=K.length;k<Y;k++){const ce=K[k],Ee=i.get(ce);let de=e.TEXTURE_2D;(M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(de=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(de,Ee.__webglTexture),ue(de,ce),Le(F.__webglFramebuffer,M,ce,e.COLOR_ATTACHMENT0+k,de,0),f(ce)&&b(de)}t.unbindTexture()}else{let k=e.TEXTURE_2D;if((M.isWebGL3DRenderTarget||M.isWebGLArrayRenderTarget)&&(k=M.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),t.bindTexture(k,V.__webglTexture),ue(k,u),u.mipmaps&&u.mipmaps.length>0)for(let Y=0;Y<u.mipmaps.length;Y++)Le(F.__webglFramebuffer[Y],M,u,e.COLOR_ATTACHMENT0,k,Y);else Le(F.__webglFramebuffer,M,u,e.COLOR_ATTACHMENT0,k,0);f(u)&&b(k),t.unbindTexture()}M.depthBuffer&&Ke(M)}function at(M){const u=M.textures;for(let F=0,V=u.length;F<V;F++){const K=u[F];if(f(K)){const ie=C(M),ne=i.get(K).__webglTexture;t.bindTexture(ie,ne),b(ie),t.unbindTexture()}}}const lt=[],ft=[];function ve(M){if(M.samples>0){if(Fe(M)===!1){const u=M.textures,F=M.width,V=M.height;let K=e.COLOR_BUFFER_BIT;const ie=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,ne=i.get(M),k=u.length>1;if(k)for(let ce=0;ce<u.length;ce++)t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.RENDERBUFFER,null),t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.TEXTURE_2D,null,0);t.bindFramebuffer(e.READ_FRAMEBUFFER,ne.__webglMultisampledFramebuffer);const Y=M.texture.mipmaps;Y&&Y.length>0?t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglFramebuffer[0]):t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglFramebuffer);for(let ce=0;ce<u.length;ce++){if(M.resolveDepthBuffer&&(M.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),M.stencilBuffer&&M.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),k){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,ne.__webglColorRenderbuffer[ce]);const Ee=i.get(u[ce]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Ee,0)}e.blitFramebuffer(0,0,F,V,0,0,F,V,K,e.NEAREST),l===!0&&(lt.length=0,ft.length=0,lt.push(e.COLOR_ATTACHMENT0+ce),M.depthBuffer&&M.resolveDepthBuffer===!1&&(lt.push(ie),ft.push(ie),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ft)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,lt))}if(t.bindFramebuffer(e.READ_FRAMEBUFFER,null),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),k)for(let ce=0;ce<u.length;ce++){t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.RENDERBUFFER,ne.__webglColorRenderbuffer[ce]);const Ee=i.get(u[ce]).__webglTexture;t.bindFramebuffer(e.FRAMEBUFFER,ne.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ce,e.TEXTURE_2D,Ee,0)}t.bindFramebuffer(e.DRAW_FRAMEBUFFER,ne.__webglMultisampledFramebuffer)}else if(M.depthBuffer&&M.resolveDepthBuffer===!1&&l){const u=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[u])}}}function Re(M){return Math.min(a.maxSamples,M.samples)}function Fe(M){const u=i.get(M);return M.samples>0&&n.has("WEBGL_multisampled_render_to_texture")===!0&&u.__useRenderToTexture!==!1}function I(M){const u=o.render.frame;_.get(M)!==u&&(_.set(M,u),M.update())}function ht(M,u){const F=M.colorSpace,V=M.format,K=M.type;return M.isCompressedTexture===!0||M.isVideoTexture===!0||F!==Lt&&F!==un&&(rt.getTransfer(F)===nt?(V!==zt||K!==Bt)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):it("WebGLTextures: Unsupported texture color space:",F)),u}function je(M){return typeof HTMLImageElement<"u"&&M instanceof HTMLImageElement?(c.width=M.naturalWidth||M.width,c.height=M.naturalHeight||M.height):typeof VideoFrame<"u"&&M instanceof VideoFrame?(c.width=M.displayWidth,c.height=M.displayHeight):(c.width=M.width,c.height=M.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=$,this.getTextureUnits=Z,this.setTextureUnits=O,this.setTexture2D=B,this.setTexture2DArray=ee,this.setTexture3D=j,this.setTextureCube=J,this.rebindTextures=We,this.setupRenderTarget=ze,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=Fe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Fd(e,n){function t(i,a=un){let r;const o=rt.getTransfer(a);if(i===Bt)return e.UNSIGNED_BYTE;if(i===Ta)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Aa)return e.UNSIGNED_SHORT_5_5_5_1;if(i===ns)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===is)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===rs)return e.BYTE;if(i===as)return e.SHORT;if(i===qn)return e.UNSIGNED_SHORT;if(i===wa)return e.INT;if(i===sn)return e.UNSIGNED_INT;if(i===Qt)return e.FLOAT;if(i===tn)return e.HALF_FLOAT;if(i===os)return e.ALPHA;if(i===ss)return e.RGB;if(i===zt)return e.RGBA;if(i===gn)return e.DEPTH_COMPONENT;if(i===dn)return e.DEPTH_STENCIL;if(i===Oa)return e.RED;if(i===Ma)return e.RED_INTEGER;if(i===vn)return e.RG;if(i===Ea)return e.RG_INTEGER;if(i===xa)return e.RGBA_INTEGER;if(i===ni||i===ii||i===ri||i===ai)if(o===nt)if(r=n.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ni)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ii)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ri)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ai)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=n.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ni)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ii)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ri)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ai)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tr||i===nr||i===ir||i===rr)if(r=n.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===tr)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===nr)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ir)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===rr)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ar||i===or||i===sr||i===cr||i===lr||i===Ti||i===fr)if(r=n.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ar||i===or)return o===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===sr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===cr)return r.COMPRESSED_R11_EAC;if(i===lr)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Ti)return r.COMPRESSED_RG11_EAC;if(i===fr)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ur||i===dr||i===pr||i===hr||i===mr||i===_r||i===gr||i===vr||i===Sr||i===xr||i===Er||i===Mr||i===Tr||i===Ar)if(r=n.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ur)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===dr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_r)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Er)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Tr)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ar)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===br||i===Rr||i===wr)if(r=n.get("EXT_texture_compression_bptc"),r!==null){if(i===br)return o===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rr)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wr)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cr||i===Pr||i===Ai||i===yr)if(r=n.get("EXT_texture_compression_rgtc"),r!==null){if(i===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Pr)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ai)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yr)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===In?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:t}}const Od=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Bd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Gd{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(n,t){if(this.texture===null){const i=new Sa(n.texture);(n.depthNear!==t.depthNear||n.depthFar!==t.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=i}}getMesh(n){if(this.texture!==null&&this.mesh===null){const t=n.cameras[0].viewport,i=new qt({vertexShader:Od,fragmentShader:Bd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xt(new ba(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hd extends _o{constructor(n,t){super();const i=this;let a=null,r=1,o=null,s="local-floor",l=1,c=null,_=null,h=null,d=null,m=null,x=null;const T=typeof XRWebGLBinding<"u",p=new Gd,f={},b=t.getContextAttributes();let C=null,S=null;const A=[],R=[],w=new St;let g=null;const E=new Pn;E.viewport=new Mt;const P=new Pn;P.viewport=new Mt;const y=[E,P],N=new go;let $=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let se=A[q];return se===void 0&&(se=new Jn,A[q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(q){let se=A[q];return se===void 0&&(se=new Jn,A[q]=se),se.getGripSpace()},this.getHand=function(q){let se=A[q];return se===void 0&&(se=new Jn,A[q]=se),se.getHandSpace()};function O(q){const se=R.indexOf(q.inputSource);if(se===-1)return;const re=A[se];re!==void 0&&(re.update(q.inputSource,q.frame,c||o),re.dispatchEvent({type:q.type,data:q.inputSource}))}function X(){a.removeEventListener("select",O),a.removeEventListener("selectstart",O),a.removeEventListener("selectend",O),a.removeEventListener("squeeze",O),a.removeEventListener("squeezestart",O),a.removeEventListener("squeezeend",O),a.removeEventListener("end",X),a.removeEventListener("inputsourceschange",D);for(let q=0;q<A.length;q++){const se=R[q];se!==null&&(R[q]=null,A[q].disconnect(se))}$=null,Z=null,p.reset();for(const q in f)delete f[q];n.setRenderTarget(C),m=null,d=null,h=null,a=null,S=null,ue.stop(),i.isPresenting=!1,n.setPixelRatio(g),n.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){s=q,i.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h===null&&T&&(h=new XRWebGLBinding(a,t)),h},this.getFrame=function(){return x},this.getSession=function(){return a},this.setSession=async function(q){if(a=q,a!==null){if(C=n.getRenderTarget(),a.addEventListener("select",O),a.addEventListener("selectstart",O),a.addEventListener("selectend",O),a.addEventListener("squeeze",O),a.addEventListener("squeezestart",O),a.addEventListener("squeezeend",O),a.addEventListener("end",X),a.addEventListener("inputsourceschange",D),b.xrCompatible!==!0&&await t.makeXRCompatible(),g=n.getPixelRatio(),n.getSize(w),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,Pe=null,De=null;b.depth&&(De=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=b.stencil?dn:gn,Pe=b.stencil?In:sn);const Le={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Le),a.updateRenderState({layers:[d]}),n.setPixelRatio(1),n.setSize(d.textureWidth,d.textureHeight,!1),S=new Vt(d.textureWidth,d.textureHeight,{format:zt,type:Bt,depthTexture:new Ln(d.textureWidth,d.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:b.stencil,colorSpace:n.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const re={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(a,t,re),a.updateRenderState({baseLayer:m}),n.setPixelRatio(1),n.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Vt(m.framebufferWidth,m.framebufferHeight,{format:zt,type:Bt,colorSpace:n.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await a.requestReferenceSpace(s),ue.setContext(a),ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function D(q){for(let se=0;se<q.removed.length;se++){const re=q.removed[se],Pe=R.indexOf(re);Pe>=0&&(R[Pe]=null,A[Pe].disconnect(re))}for(let se=0;se<q.added.length;se++){const re=q.added[se];let Pe=R.indexOf(re);if(Pe===-1){for(let Le=0;Le<A.length;Le++)if(Le>=R.length){R.push(re),Pe=Le;break}else if(R[Le]===null){R[Le]=re,Pe=Le;break}if(Pe===-1)break}const De=A[Pe];De&&De.connect(re)}}const B=new z,ee=new z;function j(q,se,re){B.setFromMatrixPosition(se.matrixWorld),ee.setFromMatrixPosition(re.matrixWorld);const Pe=B.distanceTo(ee),De=se.projectionMatrix.elements,Le=re.projectionMatrix.elements,ot=De[14]/(De[10]-1),Oe=De[14]/(De[10]+1),Ke=(De[9]+1)/De[5],We=(De[9]-1)/De[5],ze=(De[8]-1)/De[0],at=(Le[8]+1)/Le[0],lt=ot*ze,ft=ot*at,ve=Pe/(-ze+at),Re=ve*-ze;if(se.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Re),q.translateZ(ve),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),De[10]===-1)q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const Fe=ot+ve,I=Oe+ve,ht=lt-Re,je=ft+(Pe-Re),M=Ke*Oe/I*Fe,u=We*Oe/I*Fe;q.projectionMatrix.makePerspective(ht,je,M,u,Fe,I),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function J(q,se){se===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(se.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(a===null)return;let se=q.near,re=q.far;p.texture!==null&&(p.depthNear>0&&(se=p.depthNear),p.depthFar>0&&(re=p.depthFar)),N.near=P.near=E.near=se,N.far=P.far=E.far=re,($!==N.near||Z!==N.far)&&(a.updateRenderState({depthNear:N.near,depthFar:N.far}),$=N.near,Z=N.far),N.layers.mask=q.layers.mask|6,E.layers.mask=N.layers.mask&-5,P.layers.mask=N.layers.mask&-3;const Pe=q.parent,De=N.cameras;J(N,Pe);for(let Le=0;Le<De.length;Le++)J(De[Le],Pe);De.length===2?j(N,E,P):N.projectionMatrix.copy(E.projectionMatrix),oe(q,N,Pe)};function oe(q,se,re){re===null?q.matrix.copy(se.matrixWorld):(q.matrix.copy(re.matrixWorld),q.matrix.invert(),q.matrix.multiply(se.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(se.projectionMatrix),q.projectionMatrixInverse.copy(se.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=vo*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function(q){l=q,d!==null&&(d.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(N)},this.getCameraTexture=function(q){return f[q]};let ae=null;function Ae(q,se){if(_=se.getViewerPose(c||o),x=se,_!==null){const re=_.views;m!==null&&(n.setRenderTargetFramebuffer(S,m.framebuffer),n.setRenderTarget(S));let Pe=!1;re.length!==N.cameras.length&&(N.cameras.length=0,Pe=!0);for(let Oe=0;Oe<re.length;Oe++){const Ke=re[Oe];let We=null;if(m!==null)We=m.getViewport(Ke);else{const at=h.getViewSubImage(d,Ke);We=at.viewport,Oe===0&&(n.setRenderTargetTextures(S,at.colorTexture,at.depthStencilTexture),n.setRenderTarget(S))}let ze=y[Oe];ze===void 0&&(ze=new Pn,ze.layers.enable(Oe),ze.viewport=new Mt,y[Oe]=ze),ze.matrix.fromArray(Ke.transform.matrix),ze.matrix.decompose(ze.position,ze.quaternion,ze.scale),ze.projectionMatrix.fromArray(Ke.projectionMatrix),ze.projectionMatrixInverse.copy(ze.projectionMatrix).invert(),ze.viewport.set(We.x,We.y,We.width,We.height),Oe===0&&(N.matrix.copy(ze.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Pe===!0&&N.cameras.push(ze)}const De=a.enabledFeatures;if(De&&De.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&T){h=i.getBinding();const Oe=h.getDepthInformation(re[0]);Oe&&Oe.isValid&&Oe.texture&&p.init(Oe,a.renderState)}if(De&&De.includes("camera-access")&&T){n.state.unbindTexture(),h=i.getBinding();for(let Oe=0;Oe<re.length;Oe++){const Ke=re[Oe].camera;if(Ke){let We=f[Ke];We||(We=new Sa,f[Ke]=We);const ze=h.getCameraImage(Ke);We.sourceTexture=ze}}}}for(let re=0;re<A.length;re++){const Pe=R[re],De=A[re];Pe!==null&&De!==void 0&&De.update(Pe,se,c||o)}ae&&ae(q,se),se.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:se}),x=null}const ue=new Xa;ue.setAnimationLoop(Ae),this.setAnimationLoop=function(q){ae=q},this.dispose=function(){}}}const Vd=new yt,Qa=new Xe;Qa.set(-1,0,0,0,1,0,0,0,1);function kd(e,n){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Ra(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function a(p,f,b,C,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),h(p,f)):f.isMeshPhongMaterial?(r(p,f),_(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,S)):f.isMeshMatcapMaterial?(r(p,f),x(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),T(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(o(p,f),f.isLineDashedMaterial&&s(p,f)):f.isPointsMaterial?l(p,f,b,C):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===bt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===bt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const b=n.get(f),C=b.envMap,S=b.envMapRotation;C&&(p.envMap.value=C,p.envMapRotation.value.setFromMatrix4(Vd.makeRotationFromEuler(S)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Qa),p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function o(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function s(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,b,C){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*b,p.scale.value=C*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function _(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function h(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,b){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===bt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function x(p,f){f.matcap&&(p.matcap.value=f.matcap)}function T(p,f){const b=n.get(f).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function zd(e,n,t,i){let a={},r={},o=[];const s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,A){const R=A.program;i.uniformBlockBinding(S,R)}function c(S,A){let R=a[S.id];R===void 0&&(p(S),R=_(S),a[S.id]=R,S.addEventListener("dispose",b));const w=A.program;i.updateUBOMapping(S,w);const g=n.render.frame;r[S.id]!==g&&(d(S),r[S.id]=g)}function _(S){const A=h();S.__bindingPointIndex=A;const R=e.createBuffer(),w=S.__size,g=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,R),e.bufferData(e.UNIFORM_BUFFER,w,g),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,R),R}function h(){for(let S=0;S<s;S++)if(o.indexOf(S)===-1)return o.push(S),S;return it("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const A=a[S.id],R=S.uniforms,w=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let g=0,E=R.length;g<E;g++){const P=R[g];if(Array.isArray(P))for(let y=0,N=P.length;y<N;y++)m(P[y],g,y,w);else m(P,g,0,w)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(S,A,R,w){if(T(S,A,R,w)===!0){const g=S.__offset,E=S.value;if(Array.isArray(E)){let P=0;for(let y=0;y<E.length;y++){const N=E[y],$=f(N);x(N,S.__data,P),typeof N!="number"&&typeof N!="boolean"&&!N.isMatrix3&&!ArrayBuffer.isView(N)&&(P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(E,S.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,g,S.__data)}}function x(S,A,R){typeof S=="number"||typeof S=="boolean"?A[0]=S:S.isMatrix3?(A[0]=S.elements[0],A[1]=S.elements[1],A[2]=S.elements[2],A[3]=0,A[4]=S.elements[3],A[5]=S.elements[4],A[6]=S.elements[5],A[7]=0,A[8]=S.elements[6],A[9]=S.elements[7],A[10]=S.elements[8],A[11]=0):ArrayBuffer.isView(S)?A.set(new S.constructor(S.buffer,S.byteOffset,A.length)):S.toArray(A,R)}function T(S,A,R,w){const g=S.value,E=A+"_"+R;if(w[E]===void 0)return typeof g=="number"||typeof g=="boolean"?w[E]=g:ArrayBuffer.isView(g)?w[E]=g.slice():w[E]=g.clone(),!0;{const P=w[E];if(typeof g=="number"||typeof g=="boolean"){if(P!==g)return w[E]=g,!0}else{if(ArrayBuffer.isView(g))return!0;if(P.equals(g)===!1)return P.copy(g),!0}}return!1}function p(S){const A=S.uniforms;let R=0;const w=16;for(let E=0,P=A.length;E<P;E++){const y=Array.isArray(A[E])?A[E]:[A[E]];for(let N=0,$=y.length;N<$;N++){const Z=y[N],O=Array.isArray(Z.value)?Z.value:[Z.value];for(let X=0,D=O.length;X<D;X++){const B=O[X],ee=f(B),j=R%w,J=j%ee.boundary,oe=j+J;R+=J,oe!==0&&w-oe<ee.storage&&(R+=w-oe),Z.__data=new Float32Array(ee.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=R,R+=ee.storage}}}const g=R%w;return g>0&&(R+=w-g),S.__size=R,S.__cache={},this}function f(S){const A={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(A.boundary=4,A.storage=4):S.isVector2?(A.boundary=8,A.storage=8):S.isVector3||S.isColor?(A.boundary=16,A.storage=12):S.isVector4?(A.boundary=16,A.storage=16):S.isMatrix3?(A.boundary=48,A.storage=48):S.isMatrix4?(A.boundary=64,A.storage=64):S.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(A.boundary=16,A.storage=S.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",S),A}function b(S){const A=S.target;A.removeEventListener("dispose",b);const R=o.indexOf(A.__bindingPointIndex);o.splice(R,1),e.deleteBuffer(a[A.id]),delete a[A.id],delete r[A.id]}function C(){for(const S in a)e.deleteBuffer(a[S]);o=[],a={},r={}}return{bind:l,update:c,dispose:C}}const Wd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Nt=null;function Xd(){return Nt===null&&(Nt=new _a(Wd,16,16,vn,tn),Nt.name="DFG_LUT",Nt.minFilter=vt,Nt.magFilter=vt,Nt.wrapS=Wn,Nt.wrapT=Wn,Nt.generateMipmaps=!1,Nt.needsUpdate=!0),Nt}class Gp{constructor(n={}){const{canvas:t=uo(),context:i=null,depth:a=!0,stencil:r=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:m=Bt}=n;this.isWebGLRenderer=!0;let x;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=i.getContextAttributes().alpha}else x=o;const T=m,p=new Set([xa,Ea,Ma]),f=new Set([Bt,sn,qn,In,Ta,Aa]),b=new Uint32Array(4),C=new Int32Array(4),S=new z;let A=null,R=null;const w=[],g=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ht,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let y=!1,N=null,$=null,Z=null,O=null;this._outputColorSpace=mn;let X=0,D=0,B=null,ee=-1,j=null;const J=new Mt,oe=new Mt;let ae=null;const Ae=new Ye(0);let ue=0,q=t.width,se=t.height,re=1,Pe=null,De=null;const Le=new Mt(0,0,q,se),ot=new Mt(0,0,q,se);let Oe=!1;const Ke=new ma;let We=!1,ze=!1;const at=new yt,lt=new z,ft=new Mt,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function Fe(){return B===null?re:1}let I=i;function ht(v,U){return t.getContext(v,U)}try{const v={alpha:!0,depth:a,stencil:r,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:_,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${po}`),t.addEventListener("webglcontextlost",st,!1),t.addEventListener("webglcontextrestored",et,!1),t.addEventListener("webglcontextcreationerror",It,!1),I===null){const U="webgl2";if(I=ht(U,v),I===null)throw ht(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(v){throw it("WebGLRenderer: "+v.message),v}let je,M,u,F,V,K,ie,ne,k,Y,ce,Ee,de,le,we,Ie,Ue,L,fe,Q,pe,ge,te;function be(){je=new Xf(I),je.init(),pe=new Fd(I,je),M=new Of(I,je,n,pe),u=new Ud(I,je),M.reversedDepthBuffer&&d&&u.buffers.depth.setReversed(!0),$=I.createFramebuffer(),Z=I.createFramebuffer(),O=I.createFramebuffer(),F=new Yf(I),V=new xd,K=new Nd(I,je,u,V,M,pe,F),ie=new Wf(P),ne=new $s(I),ge=new Nf(I,ne),k=new qf(I,ne,F,ge),Y=new Zf(I,k,ne,ge,F),L=new jf(I,M,K),we=new Bf(V),ce=new Sd(P,ie,je,M,ge,we),Ee=new kd(P,V),de=new Md,le=new Cd(je),Ue=new Uf(P,ie,u,Y,x,l),Ie=new Dd(P,Y,M),te=new zd(I,F,M,u),fe=new Ff(I,je,F),Q=new Kf(I,je,F),F.programs=ce.programs,P.capabilities=M,P.extensions=je,P.properties=V,P.renderLists=de,P.shadowMap=Ie,P.state=u,P.info=F}be(),T!==Bt&&(E=new Qf(T,t.width,t.height,s,a,r));const Me=new Hd(P,I);this.xr=Me,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const v=je.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=je.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(v){v!==void 0&&(re=v,this.setSize(q,se,!1))},this.getSize=function(v){return v.set(q,se)},this.setSize=function(v,U,W=!0){if(Me.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}q=v,se=U,t.width=Math.floor(v*re),t.height=Math.floor(U*re),W===!0&&(t.style.width=v+"px",t.style.height=U+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,v,U)},this.getDrawingBufferSize=function(v){return v.set(q*re,se*re).floor()},this.setDrawingBufferSize=function(v,U,W){q=v,se=U,re=W,t.width=Math.floor(v*W),t.height=Math.floor(U*W),this.setViewport(0,0,v,U)},this.setEffects=function(v){if(T===Bt){it("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(v){for(let U=0;U<v.length;U++)if(v[U].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(v||[])},this.getCurrentViewport=function(v){return v.copy(J)},this.getViewport=function(v){return v.copy(Le)},this.setViewport=function(v,U,W,G){v.isVector4?Le.set(v.x,v.y,v.z,v.w):Le.set(v,U,W,G),u.viewport(J.copy(Le).multiplyScalar(re).round())},this.getScissor=function(v){return v.copy(ot)},this.setScissor=function(v,U,W,G){v.isVector4?ot.set(v.x,v.y,v.z,v.w):ot.set(v,U,W,G),u.scissor(oe.copy(ot).multiplyScalar(re).round())},this.getScissorTest=function(){return Oe},this.setScissorTest=function(v){u.setScissorTest(Oe=v)},this.setOpaqueSort=function(v){Pe=v},this.setTransparentSort=function(v){De=v},this.getClearColor=function(v){return v.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(v=!0,U=!0,W=!0){let G=0;if(v){let H=!1;if(B!==null){const _e=B.texture.format;H=p.has(_e)}if(H){const _e=B.texture.type,xe=f.has(_e),me=Ue.getClearColor(),Te=Ue.getClearAlpha(),Ce=me.r,Be=me.g,Ve=me.b;xe?(b[0]=Ce,b[1]=Be,b[2]=Ve,b[3]=Te,I.clearBufferuiv(I.COLOR,0,b)):(C[0]=Ce,C[1]=Be,C[2]=Ve,C[3]=Te,I.clearBufferiv(I.COLOR,0,C))}else G|=I.COLOR_BUFFER_BIT}U&&(G|=I.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&I.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(v){v.setRenderer(this),N=v},this.dispose=function(){t.removeEventListener("webglcontextlost",st,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",It,!1),Ue.dispose(),de.dispose(),le.dispose(),V.dispose(),ie.dispose(),Y.dispose(),ge.dispose(),te.dispose(),ce.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",Bi),Me.removeEventListener("sessionend",Gi),nn.stop()};function st(v){v.preventDefault(),qi("WebGLRenderer: Context Lost."),y=!0}function et(){qi("WebGLRenderer: Context Restored."),y=!1;const v=F.autoReset,U=Ie.enabled,W=Ie.autoUpdate,G=Ie.needsUpdate,H=Ie.type;be(),F.autoReset=v,Ie.enabled=U,Ie.autoUpdate=W,Ie.needsUpdate=G,Ie.type=H}function It(v){it("WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Dt(v){const U=v.target;U.removeEventListener("dispose",Dt),ro(U)}function ro(v){ao(v),V.remove(v)}function ao(v){const U=V.get(v).programs;U!==void 0&&(U.forEach(function(W){ce.releaseProgram(W)}),v.isShaderMaterial&&ce.releaseShaderCache(v))}this.renderBufferDirect=function(v,U,W,G,H,_e){U===null&&(U=ve);const xe=H.isMesh&&H.matrixWorld.determinantAffine()<0,me=co(v,U,W,G,H);u.setMaterial(G,xe);let Te=W.index,Ce=1;if(G.wireframe===!0){if(Te=k.getWireframeAttribute(W),Te===void 0)return;Ce=2}const Be=W.drawRange,Ve=W.attributes.position;let ye=Be.start*Ce,$e=(Be.start+Be.count)*Ce;_e!==null&&(ye=Math.max(ye,_e.start*Ce),$e=Math.min($e,(_e.start+_e.count)*Ce)),Te!==null?(ye=Math.max(ye,0),$e=Math.min($e,Te.count)):Ve!=null&&(ye=Math.max(ye,0),$e=Math.min($e,Ve.count));const ut=$e-ye;if(ut<0||ut===1/0)return;ge.setup(H,G,me,W,Te);let ct,Qe=fe;if(Te!==null&&(ct=ne.get(Te),Qe=Q,Qe.setIndex(ct)),H.isMesh)G.wireframe===!0?(u.setLineWidth(G.wireframeLinewidth*Fe()),Qe.setMode(I.LINES)):Qe.setMode(I.TRIANGLES);else if(H.isLine){let gt=G.linewidth;gt===void 0&&(gt=1),u.setLineWidth(gt*Fe()),H.isLineSegments?Qe.setMode(I.LINES):H.isLineLoop?Qe.setMode(I.LINE_LOOP):Qe.setMode(I.LINE_STRIP)}else H.isPoints?Qe.setMode(I.POINTS):H.isSprite&&Qe.setMode(I.TRIANGLES);if(H.isBatchedMesh)if(je.get("WEBGL_multi_draw"))Qe.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const gt=H._multiDrawStarts,Se=H._multiDrawCounts,Tt=H._multiDrawCount,qe=Te?ne.get(Te).bytesPerElement:1,Rt=V.get(G).currentProgram.getUniforms();for(let Ut=0;Ut<Tt;Ut++)Rt.setValue(I,"_gl_DrawID",Ut),Qe.render(gt[Ut]/qe,Se[Ut])}else if(H.isInstancedMesh)Qe.renderInstances(ye,ut,H.count);else if(W.isInstancedBufferGeometry){const gt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Se=Math.min(W.instanceCount,gt);Qe.renderInstances(ye,ut,Se)}else Qe.render(ye,ut)};function Oi(v,U,W){v.transparent===!0&&v.side===Pt&&v.forceSinglePass===!1?(v.side=bt,v.needsUpdate=!0,Nn(v,U,W),v.side=_n,v.needsUpdate=!0,Nn(v,U,W),v.side=Pt):Nn(v,U,W)}this.compile=function(v,U,W=null){W===null&&(W=v),R=le.get(W),R.init(U),g.push(R),W.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(R.pushLight(H),H.castShadow&&R.pushShadow(H))}),v!==W&&v.traverseVisible(function(H){H.isLight&&H.layers.test(U.layers)&&(R.pushLight(H),H.castShadow&&R.pushShadow(H))}),R.setupLights();const G=new Set;return v.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const _e=H.material;if(_e)if(Array.isArray(_e))for(let xe=0;xe<_e.length;xe++){const me=_e[xe];Oi(me,W,H),G.add(me)}else Oi(_e,W,H),G.add(_e)}),R=g.pop(),G},this.compileAsync=function(v,U,W=null){const G=this.compile(v,U,W);return new Promise(H=>{function _e(){if(G.forEach(function(xe){V.get(xe).currentProgram.isReady()&&G.delete(xe)}),G.size===0){H(v);return}setTimeout(_e,10)}je.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let $n=null;function oo(v){$n&&$n(v)}function Bi(){nn.stop()}function Gi(){nn.start()}const nn=new Xa;nn.setAnimationLoop(oo),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(v){$n=v,Me.setAnimationLoop(v),v===null?nn.stop():nn.start()},Me.addEventListener("sessionstart",Bi),Me.addEventListener("sessionend",Gi),this.render=function(v,U){if(U!==void 0&&U.isCamera!==!0){it("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;N!==null&&N.renderStart(v,U);const W=Me.enabled===!0&&Me.isPresenting===!0,G=E!==null&&(B===null||W)&&E.begin(P,B);if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(U),U=Me.getCamera()),v.isScene===!0&&v.onBeforeRender(P,v,U,B),R=le.get(v,g.length),R.init(U),R.state.textureUnits=K.getTextureUnits(),g.push(R),at.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Ke.setFromProjectionMatrix(at,Ki,U.reversedDepth),ze=this.localClippingEnabled,We=we.init(this.clippingPlanes,ze),A=de.get(v,w.length),A.init(),w.push(A),Me.enabled===!0&&Me.isPresenting===!0){const xe=P.xr.getDepthSensingMesh();xe!==null&&Qn(xe,U,-1/0,P.sortObjects)}Qn(v,U,0,P.sortObjects),A.finish(),P.sortObjects===!0&&A.sort(Pe,De,U.reversedDepth),Re=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,Re&&Ue.addToRenderList(A,v),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),We===!0&&we.beginShadows();const H=R.state.shadowsArray;if(Ie.render(H,v,U),We===!0&&we.endShadows(),(G&&E.hasRenderPass())===!1){const xe=A.opaque,me=A.transmissive;if(R.setupLights(),U.isArrayCamera){const Te=U.cameras;if(me.length>0)for(let Ce=0,Be=Te.length;Ce<Be;Ce++){const Ve=Te[Ce];Vi(xe,me,v,Ve)}Re&&Ue.render(v);for(let Ce=0,Be=Te.length;Ce<Be;Ce++){const Ve=Te[Ce];Hi(A,v,Ve,Ve.viewport)}}else me.length>0&&Vi(xe,me,v,U),Re&&Ue.render(v),Hi(A,v,U)}B!==null&&D===0&&(K.updateMultisampleRenderTarget(B),K.updateRenderTargetMipmap(B)),G&&E.end(P),v.isScene===!0&&v.onAfterRender(P,v,U),ge.resetDefaultState(),ee=-1,j=null,g.pop(),g.length>0?(R=g[g.length-1],K.setTextureUnits(R.state.textureUnits),We===!0&&we.setGlobalState(P.clippingPlanes,R.state.camera)):R=null,w.pop(),w.length>0?A=w[w.length-1]:A=null,N!==null&&N.renderEnd()};function Qn(v,U,W,G){if(v.visible===!1)return;if(v.layers.test(U.layers)){if(v.isGroup)W=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(U);else if(v.isLightProbeGrid)R.pushLightProbeGrid(v);else if(v.isLight)R.pushLight(v),v.castShadow&&R.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||Ke.intersectsSprite(v)){G&&ft.setFromMatrixPosition(v.matrixWorld).applyMatrix4(at);const xe=Y.update(v),me=v.material;me.visible&&A.push(v,xe,me,W,ft.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||Ke.intersectsObject(v))){const xe=Y.update(v),me=v.material;if(G&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),ft.copy(v.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),ft.copy(xe.boundingSphere.center)),ft.applyMatrix4(v.matrixWorld).applyMatrix4(at)),Array.isArray(me)){const Te=xe.groups;for(let Ce=0,Be=Te.length;Ce<Be;Ce++){const Ve=Te[Ce],ye=me[Ve.materialIndex];ye&&ye.visible&&A.push(v,xe,ye,W,ft.z,Ve)}}else me.visible&&A.push(v,xe,me,W,ft.z,null)}}const _e=v.children;for(let xe=0,me=_e.length;xe<me;xe++)Qn(_e[xe],U,W,G)}function Hi(v,U,W,G){const{opaque:H,transmissive:_e,transparent:xe}=v;R.setupLightsView(W),We===!0&&we.setGlobalState(P.clippingPlanes,W),G&&u.viewport(J.copy(G)),H.length>0&&Un(H,U,W),_e.length>0&&Un(_e,U,W),xe.length>0&&Un(xe,U,W),u.buffers.depth.setTest(!0),u.buffers.depth.setMask(!0),u.buffers.color.setMask(!0),u.setPolygonOffset(!1)}function Vi(v,U,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[G.id]===void 0){const ye=je.has("EXT_color_buffer_half_float")||je.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[G.id]=new Vt(1,1,{generateMipmaps:!0,type:ye?tn:Bt,minFilter:$t,samples:Math.max(4,M.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace})}const _e=R.state.transmissionRenderTarget[G.id],xe=G.viewport||J;_e.setSize(xe.z*P.transmissionResolutionScale,xe.w*P.transmissionResolutionScale);const me=P.getRenderTarget(),Te=P.getActiveCubeFace(),Ce=P.getActiveMipmapLevel();P.setRenderTarget(_e),P.getClearColor(Ae),ue=P.getClearAlpha(),ue<1&&P.setClearColor(16777215,.5),P.clear(),Re&&Ue.render(W);const Be=P.toneMapping;P.toneMapping=Ht;const Ve=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),R.setupLightsView(G),We===!0&&we.setGlobalState(P.clippingPlanes,G),Un(v,W,G),K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e),je.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let $e=0,ut=U.length;$e<ut;$e++){const ct=U[$e],{object:Qe,geometry:gt,material:Se,group:Tt}=ct;if(Se.side===Pt&&Qe.layers.test(G.layers)){const qe=Se.side;Se.side=bt,Se.needsUpdate=!0,ki(Qe,W,G,gt,Se,Tt),Se.side=qe,Se.needsUpdate=!0,ye=!0}}ye===!0&&(K.updateMultisampleRenderTarget(_e),K.updateRenderTargetMipmap(_e))}P.setRenderTarget(me,Te,Ce),P.setClearColor(Ae,ue),Ve!==void 0&&(G.viewport=Ve),P.toneMapping=Be}function Un(v,U,W){const G=U.isScene===!0?U.overrideMaterial:null;for(let H=0,_e=v.length;H<_e;H++){const xe=v[H],{object:me,geometry:Te,group:Ce}=xe;let Be=xe.material;Be.allowOverride===!0&&G!==null&&(Be=G),me.layers.test(W.layers)&&ki(me,U,W,Te,Be,Ce)}}function ki(v,U,W,G,H,_e){v.onBeforeRender(P,U,W,G,H,_e),v.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),H.onBeforeRender(P,U,W,G,v,_e),H.transparent===!0&&H.side===Pt&&H.forceSinglePass===!1?(H.side=bt,H.needsUpdate=!0,P.renderBufferDirect(W,U,G,H,v,_e),H.side=_n,H.needsUpdate=!0,P.renderBufferDirect(W,U,G,H,v,_e),H.side=Pt):P.renderBufferDirect(W,U,G,H,v,_e),v.onAfterRender(P,U,W,G,H,_e)}function Nn(v,U,W){U.isScene!==!0&&(U=ve);const G=V.get(v),H=R.state.lights,_e=R.state.shadowsArray,xe=H.state.version,me=ce.getParameters(v,H.state,_e,U,W,R.state.lightProbeGridArray),Te=ce.getProgramCacheKey(me);let Ce=G.programs;G.environment=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?U.environment:null,G.fog=U.fog;const Be=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap;G.envMap=ie.get(v.envMap||G.environment,Be),G.envMapRotation=G.environment!==null&&v.envMap===null?U.environmentRotation:v.envMapRotation,Ce===void 0&&(v.addEventListener("dispose",Dt),Ce=new Map,G.programs=Ce);let Ve=Ce.get(Te);if(Ve!==void 0){if(G.currentProgram===Ve&&G.lightsStateVersion===xe)return Wi(v,me),Ve}else me.uniforms=ce.getUniforms(v),N!==null&&v.isNodeMaterial&&N.build(v,W,me),v.onBeforeCompile(me,P),Ve=ce.acquireProgram(me,Te),Ce.set(Te,Ve),G.uniforms=me.uniforms;const ye=G.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(ye.clippingPlanes=we.uniform),Wi(v,me),G.needsLights=fo(v),G.lightsStateVersion=xe,G.needsLights&&(ye.ambientLightColor.value=H.state.ambient,ye.lightProbe.value=H.state.probe,ye.directionalLights.value=H.state.directional,ye.directionalLightShadows.value=H.state.directionalShadow,ye.spotLights.value=H.state.spot,ye.spotLightShadows.value=H.state.spotShadow,ye.rectAreaLights.value=H.state.rectArea,ye.ltc_1.value=H.state.rectAreaLTC1,ye.ltc_2.value=H.state.rectAreaLTC2,ye.pointLights.value=H.state.point,ye.pointLightShadows.value=H.state.pointShadow,ye.hemisphereLights.value=H.state.hemi,ye.directionalShadowMatrix.value=H.state.directionalShadowMatrix,ye.spotLightMatrix.value=H.state.spotLightMatrix,ye.spotLightMap.value=H.state.spotLightMap,ye.pointShadowMatrix.value=H.state.pointShadowMatrix),G.lightProbeGrid=R.state.lightProbeGridArray.length>0,G.currentProgram=Ve,G.uniformsList=null,Ve}function zi(v){if(v.uniformsList===null){const U=v.currentProgram.getUniforms();v.uniformsList=zn.seqWithValue(U.seq,v.uniforms)}return v.uniformsList}function Wi(v,U){const W=V.get(v);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function so(v,U){if(v.length===0)return null;if(v.length===1)return v[0].texture!==null?v[0]:null;S.setFromMatrixPosition(U.matrixWorld);for(let W=0,G=v.length;W<G;W++){const H=v[W];if(H.texture!==null&&H.boundingBox.containsPoint(S))return H}return null}function co(v,U,W,G,H){U.isScene!==!0&&(U=ve),K.resetTextureUnits();const _e=U.fog,xe=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?U.environment:null,me=B===null?P.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:rt.workingColorSpace,Te=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Ce=ie.get(G.envMap||xe,Te),Be=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ve=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),ye=!!W.morphAttributes.position,$e=!!W.morphAttributes.normal,ut=!!W.morphAttributes.color;let ct=Ht;G.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(ct=P.toneMapping);const Qe=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,gt=Qe!==void 0?Qe.length:0,Se=V.get(G),Tt=R.state.lights;if(We===!0&&(ze===!0||v!==j)){const tt=v===j&&G.id===ee;we.setState(G,v,tt)}let qe=!1;G.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==Tt.state.version||Se.outputColorSpace!==me||H.isBatchedMesh&&Se.batching===!1||!H.isBatchedMesh&&Se.batching===!0||H.isBatchedMesh&&Se.batchingColor===!0&&H.colorTexture===null||H.isBatchedMesh&&Se.batchingColor===!1&&H.colorTexture!==null||H.isInstancedMesh&&Se.instancing===!1||!H.isInstancedMesh&&Se.instancing===!0||H.isSkinnedMesh&&Se.skinning===!1||!H.isSkinnedMesh&&Se.skinning===!0||H.isInstancedMesh&&Se.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&Se.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&Se.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&Se.instancingMorph===!1&&H.morphTexture!==null||Se.envMap!==Ce||G.fog===!0&&Se.fog!==_e||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==we.numPlanes||Se.numIntersection!==we.numIntersection)||Se.vertexAlphas!==Be||Se.vertexTangents!==Ve||Se.morphTargets!==ye||Se.morphNormals!==$e||Se.morphColors!==ut||Se.toneMapping!==ct||Se.morphTargetsCount!==gt||!!Se.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(qe=!0):(qe=!0,Se.__version=G.version);let Rt=Se.currentProgram;qe===!0&&(Rt=Nn(G,U,H),N&&G.isNodeMaterial&&N.onUpdateProgram(G,Rt,Se));let Ut=!1,Kt=!1,cn=!1;const Je=Rt.getUniforms(),dt=Se.uniforms;if(u.useProgram(Rt.program)&&(Ut=!0,Kt=!0,cn=!0),G.id!==ee&&(ee=G.id,Kt=!0),Se.needsLights){const tt=so(R.state.lightProbeGridArray,H);Se.lightProbeGrid!==tt&&(Se.lightProbeGrid=tt,Kt=!0)}if(Ut||j!==v){u.buffers.depth.getReversed()&&v.reversedDepth!==!0&&(v._reversedDepth=!0,v.updateProjectionMatrix()),Je.setValue(I,"projectionMatrix",v.projectionMatrix),Je.setValue(I,"viewMatrix",v.matrixWorldInverse);const jt=Je.map.cameraPosition;jt!==void 0&&jt.setValue(I,lt.setFromMatrixPosition(v.matrixWorld)),M.logarithmicDepthBuffer&&Je.setValue(I,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Je.setValue(I,"isOrthographic",v.isOrthographicCamera===!0),j!==v&&(j=v,Kt=!0,cn=!0)}if(Se.needsLights&&(Tt.state.directionalShadowMap.length>0&&Je.setValue(I,"directionalShadowMap",Tt.state.directionalShadowMap,K),Tt.state.spotShadowMap.length>0&&Je.setValue(I,"spotShadowMap",Tt.state.spotShadowMap,K),Tt.state.pointShadowMap.length>0&&Je.setValue(I,"pointShadowMap",Tt.state.pointShadowMap,K)),H.isSkinnedMesh){Je.setOptional(I,H,"bindMatrix"),Je.setOptional(I,H,"bindMatrixInverse");const tt=H.skeleton;tt&&(tt.boneTexture===null&&tt.computeBoneTexture(),Je.setValue(I,"boneTexture",tt.boneTexture,K))}H.isBatchedMesh&&(Je.setOptional(I,H,"batchingTexture"),Je.setValue(I,"batchingTexture",H._matricesTexture,K),Je.setOptional(I,H,"batchingIdTexture"),Je.setValue(I,"batchingIdTexture",H._indirectTexture,K),Je.setOptional(I,H,"batchingColorTexture"),H._colorsTexture!==null&&Je.setValue(I,"batchingColorTexture",H._colorsTexture,K));const Yt=W.morphAttributes;if((Yt.position!==void 0||Yt.normal!==void 0||Yt.color!==void 0)&&L.update(H,W,Rt),(Kt||Se.receiveShadow!==H.receiveShadow)&&(Se.receiveShadow=H.receiveShadow,Je.setValue(I,"receiveShadow",H.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&U.environment!==null&&(dt.envMapIntensity.value=U.environmentIntensity),dt.dfgLUT!==void 0&&(dt.dfgLUT.value=Xd()),Kt){if(Je.setValue(I,"toneMappingExposure",P.toneMappingExposure),Se.needsLights&&lo(dt,cn),_e&&G.fog===!0&&Ee.refreshFogUniforms(dt,_e),Ee.refreshMaterialUniforms(dt,G,re,se,R.state.transmissionRenderTarget[v.id]),Se.needsLights&&Se.lightProbeGrid){const tt=Se.lightProbeGrid;dt.probesSH.value=tt.texture,dt.probesMin.value.copy(tt.boundingBox.min),dt.probesMax.value.copy(tt.boundingBox.max),dt.probesResolution.value.copy(tt.resolution)}zn.upload(I,zi(Se),dt,K)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(zn.upload(I,zi(Se),dt,K),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Je.setValue(I,"center",H.center),Je.setValue(I,"modelViewMatrix",H.modelViewMatrix),Je.setValue(I,"normalMatrix",H.normalMatrix),Je.setValue(I,"modelMatrix",H.matrixWorld),G.uniformsGroups!==void 0){const tt=G.uniformsGroups;for(let jt=0,ln=tt.length;jt<ln;jt++){const Xi=tt[jt];te.update(Xi,Rt),te.bind(Xi,Rt)}}return Rt}function lo(v,U){v.ambientLightColor.needsUpdate=U,v.lightProbe.needsUpdate=U,v.directionalLights.needsUpdate=U,v.directionalLightShadows.needsUpdate=U,v.pointLights.needsUpdate=U,v.pointLightShadows.needsUpdate=U,v.spotLights.needsUpdate=U,v.spotLightShadows.needsUpdate=U,v.rectAreaLights.needsUpdate=U,v.hemisphereLights.needsUpdate=U}function fo(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(v,U,W){const G=V.get(v);G.__autoAllocateDepthBuffer=v.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),V.get(v.texture).__webglTexture=U,V.get(v.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(v,U){const W=V.get(v);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(v,U=0,W=0){B=v,X=U,D=W;let G=null,H=!1,_e=!1;if(v){const me=V.get(v);if(me.__useDefaultFramebuffer!==void 0){u.bindFramebuffer(I.FRAMEBUFFER,me.__webglFramebuffer),J.copy(v.viewport),oe.copy(v.scissor),ae=v.scissorTest,u.viewport(J),u.scissor(oe),u.setScissorTest(ae),ee=-1;return}else if(me.__webglFramebuffer===void 0)K.setupRenderTarget(v);else if(me.__hasExternalTextures)K.rebindTextures(v,V.get(v.texture).__webglTexture,V.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Be=v.depthTexture;if(me.__boundDepthTexture!==Be){if(Be!==null&&V.has(Be)&&(v.width!==Be.image.width||v.height!==Be.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");K.setupDepthRenderbuffer(v)}}const Te=v.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(_e=!0);const Ce=V.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?G=Ce[U][W]:G=Ce[U],H=!0):v.samples>0&&K.useMultisampledRTT(v)===!1?G=V.get(v).__webglMultisampledFramebuffer:Array.isArray(Ce)?G=Ce[W]:G=Ce,J.copy(v.viewport),oe.copy(v.scissor),ae=v.scissorTest}else J.copy(Le).multiplyScalar(re).floor(),oe.copy(ot).multiplyScalar(re).floor(),ae=Oe;if(W!==0&&(G=$),u.bindFramebuffer(I.FRAMEBUFFER,G)&&u.drawBuffers(v,G),u.viewport(J),u.scissor(oe),u.setScissorTest(ae),H){const me=V.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+U,me.__webglTexture,W)}else if(_e){const me=U;for(let Te=0;Te<v.textures.length;Te++){const Ce=V.get(v.textures[Te]);I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,W,me)}}else if(v!==null&&W!==0){const me=V.get(v.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,me.__webglTexture,W)}ee=-1},this.readRenderTargetPixels=function(v,U,W,G,H,_e,xe,me=0){if(!(v&&v.isWebGLRenderTarget)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te){u.bindFramebuffer(I.FRAMEBUFFER,Te);try{const Ce=v.textures[me],Be=Ce.format,Ve=Ce.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!M.textureFormatReadable(Be)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!M.textureTypeReadable(Ve)){it("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=v.width-G&&W>=0&&W<=v.height-H&&I.readPixels(U,W,G,H,pe.convert(Be),pe.convert(Ve),_e)}finally{const Ce=B!==null?V.get(B).__webglFramebuffer:null;u.bindFramebuffer(I.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(v,U,W,G,H,_e,xe,me=0){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=V.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te)if(U>=0&&U<=v.width-G&&W>=0&&W<=v.height-H){u.bindFramebuffer(I.FRAMEBUFFER,Te);const Ce=v.textures[me],Be=Ce.format,Ve=Ce.type;if(v.textures.length>1&&I.readBuffer(I.COLOR_ATTACHMENT0+me),!M.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!M.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ye=I.createBuffer();I.bindBuffer(I.PIXEL_PACK_BUFFER,ye),I.bufferData(I.PIXEL_PACK_BUFFER,_e.byteLength,I.STREAM_READ),I.readPixels(U,W,G,H,pe.convert(Be),pe.convert(Ve),0);const $e=B!==null?V.get(B).__webglFramebuffer:null;u.bindFramebuffer(I.FRAMEBUFFER,$e);const ut=I.fenceSync(I.SYNC_GPU_COMMANDS_COMPLETE,0);return I.flush(),await ho(I,ut,4),I.bindBuffer(I.PIXEL_PACK_BUFFER,ye),I.getBufferSubData(I.PIXEL_PACK_BUFFER,0,_e),I.deleteBuffer(ye),I.deleteSync(ut),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(v,U=null,W=0){const G=Math.pow(2,-W),H=Math.floor(v.image.width*G),_e=Math.floor(v.image.height*G),xe=U!==null?U.x:0,me=U!==null?U.y:0;K.setTexture2D(v,0),I.copyTexSubImage2D(I.TEXTURE_2D,W,0,0,xe,me,H,_e),u.unbindTexture()},this.copyTextureToTexture=function(v,U,W=null,G=null,H=0,_e=0){let xe,me,Te,Ce,Be,Ve,ye,$e,ut;const ct=v.isCompressedTexture?v.mipmaps[_e]:v.image;if(W!==null)xe=W.max.x-W.min.x,me=W.max.y-W.min.y,Te=W.isBox3?W.max.z-W.min.z:1,Ce=W.min.x,Be=W.min.y,Ve=W.isBox3?W.min.z:0;else{const dt=Math.pow(2,-H);xe=Math.floor(ct.width*dt),me=Math.floor(ct.height*dt),v.isDataArrayTexture?Te=ct.depth:v.isData3DTexture?Te=Math.floor(ct.depth*dt):Te=1,Ce=0,Be=0,Ve=0}G!==null?(ye=G.x,$e=G.y,ut=G.z):(ye=0,$e=0,ut=0);const Qe=pe.convert(U.format),gt=pe.convert(U.type);let Se;U.isData3DTexture?(K.setTexture3D(U,0),Se=I.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(K.setTexture2DArray(U,0),Se=I.TEXTURE_2D_ARRAY):(K.setTexture2D(U,0),Se=I.TEXTURE_2D),u.activeTexture(I.TEXTURE0),u.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,U.flipY),u.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),u.pixelStorei(I.UNPACK_ALIGNMENT,U.unpackAlignment);const Tt=u.getParameter(I.UNPACK_ROW_LENGTH),qe=u.getParameter(I.UNPACK_IMAGE_HEIGHT),Rt=u.getParameter(I.UNPACK_SKIP_PIXELS),Ut=u.getParameter(I.UNPACK_SKIP_ROWS),Kt=u.getParameter(I.UNPACK_SKIP_IMAGES);u.pixelStorei(I.UNPACK_ROW_LENGTH,ct.width),u.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct.height),u.pixelStorei(I.UNPACK_SKIP_PIXELS,Ce),u.pixelStorei(I.UNPACK_SKIP_ROWS,Be),u.pixelStorei(I.UNPACK_SKIP_IMAGES,Ve);const cn=v.isDataArrayTexture||v.isData3DTexture,Je=U.isDataArrayTexture||U.isData3DTexture;if(v.isDepthTexture){const dt=V.get(v),Yt=V.get(U),tt=V.get(dt.__renderTarget),jt=V.get(Yt.__renderTarget);u.bindFramebuffer(I.READ_FRAMEBUFFER,tt.__webglFramebuffer),u.bindFramebuffer(I.DRAW_FRAMEBUFFER,jt.__webglFramebuffer);for(let ln=0;ln<Te;ln++)cn&&(I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(v).__webglTexture,H,Ve+ln),I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,V.get(U).__webglTexture,_e,ut+ln)),I.blitFramebuffer(Ce,Be,xe,me,ye,$e,xe,me,I.DEPTH_BUFFER_BIT,I.NEAREST);u.bindFramebuffer(I.READ_FRAMEBUFFER,null),u.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else if(H!==0||v.isRenderTargetTexture||V.has(v)){const dt=V.get(v),Yt=V.get(U);u.bindFramebuffer(I.READ_FRAMEBUFFER,Z),u.bindFramebuffer(I.DRAW_FRAMEBUFFER,O);for(let tt=0;tt<Te;tt++)cn?I.framebufferTextureLayer(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,dt.__webglTexture,H,Ve+tt):I.framebufferTexture2D(I.READ_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,dt.__webglTexture,H),Je?I.framebufferTextureLayer(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,Yt.__webglTexture,_e,ut+tt):I.framebufferTexture2D(I.DRAW_FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_2D,Yt.__webglTexture,_e),H!==0?I.blitFramebuffer(Ce,Be,xe,me,ye,$e,xe,me,I.COLOR_BUFFER_BIT,I.NEAREST):Je?I.copyTexSubImage3D(Se,_e,ye,$e,ut+tt,Ce,Be,xe,me):I.copyTexSubImage2D(Se,_e,ye,$e,Ce,Be,xe,me);u.bindFramebuffer(I.READ_FRAMEBUFFER,null),u.bindFramebuffer(I.DRAW_FRAMEBUFFER,null)}else Je?v.isDataTexture||v.isData3DTexture?I.texSubImage3D(Se,_e,ye,$e,ut,xe,me,Te,Qe,gt,ct.data):U.isCompressedArrayTexture?I.compressedTexSubImage3D(Se,_e,ye,$e,ut,xe,me,Te,Qe,ct.data):I.texSubImage3D(Se,_e,ye,$e,ut,xe,me,Te,Qe,gt,ct):v.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,_e,ye,$e,xe,me,Qe,gt,ct.data):v.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,_e,ye,$e,ct.width,ct.height,Qe,ct.data):I.texSubImage2D(I.TEXTURE_2D,_e,ye,$e,xe,me,Qe,gt,ct);u.pixelStorei(I.UNPACK_ROW_LENGTH,Tt),u.pixelStorei(I.UNPACK_IMAGE_HEIGHT,qe),u.pixelStorei(I.UNPACK_SKIP_PIXELS,Rt),u.pixelStorei(I.UNPACK_SKIP_ROWS,Ut),u.pixelStorei(I.UNPACK_SKIP_IMAGES,Kt),_e===0&&U.generateMipmaps&&I.generateMipmap(Se),u.unbindTexture()},this.initRenderTarget=function(v){V.get(v).__webglFramebuffer===void 0&&K.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?K.setTextureCube(v,0):v.isData3DTexture?K.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?K.setTexture2DArray(v,0):K.setTexture2D(v,0),u.unbindTexture()},this.resetState=function(){X=0,D=0,B=null,u.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(n){this._outputColorSpace=n;const t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(n),t.unpackColorSpace=rt._getUnpackColorSpace()}}const qd=e=>({position:e.position.clone(),orientation:e.orientation.clone()});function Fi(e,n,t=1){const i=Ne.clamp(n/.2,0,1),a=i<.3?Math.sin(i/.3*Math.PI/2):Math.cos((i-.3)/.7*Math.PI/2);return{position:e.position.clone().add(new z(0,.16*a,0)),orientation:e.orientation.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),t*.17*a))}}class Kd{constructor(n=Math.random){this.random=n,this.phase="rest",this.age=0,this.poses=[],this.starts=[],this.targets=[],this.thresholds=[],this.speeds=[],this.velocities=[],this.delays=[],this.ramps=[],this.rhythms=[],this.safe=()=>!0}get active(){return this.phase!=="rest"}get state(){return{phase:this.phase,age:this.age,thresholds:this.thresholds,positions:this.poses.map(n=>n.position.toArray()),velocities:this.velocities.map(n=>n.toArray())}}setTerrain(n){this.safe=n}preview(n,t){this.cancel(),this.age=2.2,this.update(0,!0,!1,!1,n,t)}cancel(){this.phase="rest",this.age=0}ready(n,t){return this.phase==="drift"&&Math.hypot(this.poses[n].position.x-t.position.x,this.poses[n].position.z-t.position.z)>=this.thresholds[n]}finish(n){this.phase==="drift"&&(this.poses=n.map(t=>({position:t.position.clone(),orientation:t.quaternion.clone()})),this.enter("return"))}enter(n){this.phase=n,this.age=0,this.starts=this.poses.map(qd)}target(n,t){const i=t.rotation.y+(n?1:-1)*(.9+this.random()*2.2),a=this.thresholds[n]+.3;for(const r of[0,.5,-.5,1,-1,1.7,-1.7,Math.PI]){const o=t.position.clone().add(new z(Math.sin(i+r)*a,1+this.random()*.2,Math.cos(i+r)*a));if(this.safe(o)){this.targets[n]=o;return}}this.targets[n]=this.poses[n].position.clone()}update(n,t,i,a,r,o){if(n=Math.min(.05,n),!t){this.cancel();return}if(i){if(this.phase==="drift")this.poses=o.map(s=>({position:s.position.clone(),orientation:s.quaternion.clone()})),this.enter("startle");else if(this.phase==="rest"){this.age=0;return}}if(this.phase==="rest"){if(a||(this.age+=n,this.age<2.2))return;this.poses=o.map(l=>({position:l.position.clone(),orientation:l.quaternion.clone()})),this.thresholds=[0,1].map(()=>2.1+this.random()*.8);const s=this.random()<.5?0:1;this.speeds=[0,1].map(l=>l===s?.27+this.random()*.07:.17+this.random()*.05),this.velocities=[new z,new z],this.delays=[0,1].map(()=>this.random()*1.8),this.ramps=[0,1].map(()=>3.5+this.random()*3),this.rhythms=[0,1].map(()=>({phase:this.random()*Math.PI*2,rate:.45+this.random()*.4}));for(let l=0;l<2;l++)this.target(l,r);this.enter("drift")}if(!(this.phase==="drift"&&a)){if(this.age+=n,this.phase==="drift")for(let s=0;s<2;s++){const l=this.age-this.delays[s];if(l<=0)continue;const c=this.rhythms[s],_=l*c.rate+c.phase,h=this.poses[s],d=this.targets[s].clone();d.y+=Math.sin(_*.7)*.1;const m=d.sub(h.position),x=m.clone().normalize();x.applyAxisAngle(new z(0,1,0),Math.sin(_)*.75+Math.sin(_*1.73+c.phase)*.28);const T=Ne.smoothstep(l/this.ramps[s],0,1),p=.72+.28*Math.sin(_*.81+1.2),f=x.multiplyScalar(Math.min(m.length(),this.speeds[s]*T*p));this.velocities[s].lerp(f,1-Math.exp(-n*1.6));const b=this.velocities[s].clone().multiplyScalar(n),C=h.position.clone().add(b);Math.hypot(C.x-r.position.x,C.z-r.position.z)>.78&&[.5,1,3].every(S=>this.safe(h.position.clone().addScaledVector(b,S)))?h.position.copy(C):(this.velocities[s].multiplyScalar(Math.exp(-n*8)),this.target(s,r)),m.length()<.14&&this.age>3&&this.target(s,r),h.orientation.slerp(r.quaternion.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),(s?-.18:.18)+Math.sin(_*.6)*.09)),1-Math.exp(-n*1.4))}else if(this.phase==="startle")this.poses=this.starts.map((s,l)=>Fi(s,this.age,l?1:-1)),this.age>=.2&&this.enter("return");else if(this.phase==="return"){const s=Ne.smoothstep(this.age/1.05,0,1);this.poses=this.starts.map((l,c)=>({position:l.position.clone().lerp(new z((c?1:-1)*.9,1.03,.22).applyQuaternion(r.quaternion).add(r.position),s),orientation:l.orientation.clone().slerp(r.quaternion,s)})),this.age>=1.05&&this.cancel()}}}}const pn=e=>Ne.smoothstep(e,0,1),hi=new z(0,1,0);function aa(e){return[0,.5,.25,.75].map(n=>{const t=(e/.27+n)%1;if(t<.72)return{advance:.0972-.27*t,lift:0};const i=(t-.72)/.28;return{advance:Ne.lerp(-.0972,.0972,pn(i)),lift:Math.sin(Math.PI*i)*.095}})}function oa(e){return[0,0,.5,0].map((n,t)=>{if(t===0||t===3)return{advance:0,lift:.2};const i=(e/.54+n)%1;if(i<.5)return{advance:.135-.54*i,lift:0};const a=(i-.5)/.5;return{advance:Ne.lerp(-.135,.135,pn(a)),lift:Math.sin(Math.PI*a)*.035}})}function Ja(e,n,t,i,a,r,o,s,l,c){const _=t.clone().multiplyScalar(i).add(a).applyQuaternion(r.orientation).add(r.position),h=r.orientation.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),l)),d=new z(0,i,0).applyQuaternion(h),m=new z(0,0,i).applyQuaternion(h),x=d.dot(o),T=m.dot(o),p=.024+s.lift-_.y,f=c+s.advance,b=d.y*T-m.y*x;return jd(e,n,(p*T-f*m.y)/b,(f*d.y-p*x)/b)}class Yd{constructor(n=Math.random){this.random=n,this.phase="rest",this.hand=0,this.age=0,this.distance=0,this.style="spider",this.preference="mixed",this.contactPose={position:new z,orientation:new Ge},this.thumb=0,this.pose={position:new z,orientation:new Ge},this.weight=0,this.steps=aa(0),this.route=[],this.startWeight=0,this.index=0,this.speed=.35,this.direction=new z(0,0,1),this.planted=-1,this.plantedPoint=new z,this.plantOffset=new z,this.pivot=new z,this.pivotLocal=new z,this.tripAt=1/0,this.tripSide=1,this.dazeDuration=1.8,this.recordContacts=(t,i)=>{if(this.style==="upright"){if(this.phase==="walk"||this.phase==="fall"&&this.age===0){const a=[1,2].find(s=>this.steps[s].lift===0);this.planted!==a&&(this.planted=a,this.plantedPoint.copy(t[a]).setY(.024));const r=this.plantedPoint.clone().sub(t[a]),o=this.pose.position.clone().add(r);this.phase==="walk"&&this.groundedPose&&![.25,.5,.75,1].every(s=>this.safe(this.groundedPose.position.clone().lerp(o,s)))?(this.pose={position:this.groundedPose.position.clone(),orientation:this.groundedPose.orientation.clone()},i?.position.copy(this.pose.position),i?.quaternion.copy(this.pose.orientation),this.planted=-1,this.enter("rise")):(this.pose.position.copy(o),this.plantOffset.add(r),i?.position.add(r),t.forEach(s=>s.add(r)),this.groundedPose={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()})}if(this.phase==="fall"&&this.age===0){this.upright.position.copy(this.pose.position);const a=new z(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide),r=t.filter((o,s)=>this.steps[s]?.lift===0&&o.y<.075);r.sort((o,s)=>s.dot(a)-o.dot(a)),r[0]&&(this.pivot.copy(r[0]),this.capturePivot())}}return this.state}}get active(){return this.phase!=="rest"}get leaving(){return this.phase==="startle"||this.phase==="rise"||this.phase==="rejoin"}get state(){return{phase:this.phase,style:this.style,age:this.age,hand:this.hand,distance:this.distance,weight:this.weight,support:this.planted,anchor:this.plantedPoint.toArray(),position:this.pose.position.toArray(),pivot:this.pivot.toArray(),pivotLocal:this.pivotLocal.toArray(),route:this.route.map(n=>n.toArray())}}get gait(){return{weight:this.weight,style:this.style,steps:this.steps,contactPose:this.contactPose,direction:this.direction,thumb:this.thumb,recordContacts:this.recordContacts}}gaitSteps(n){return this.style==="upright"?oa(n):aa(n)}setTerrain(n){this.safe=n}startWalk(n,t,i,a,r=!1){if(!this.safe)return!1;const o=n.position.clone(),s=Math.hypot(t[i].position.x-o.x,t[i].position.z-o.z)>1.7,l=d=>d.distanceTo(o)>(s?1.8:.95)&&d.distanceTo(o)<(s?4.6:3.9)&&this.safe(d);this.style=this.preference==="mixed"?this.random()<.5?"spider":"upright":this.preference,this.route=[];for(let d=0;d<16;d++){const m=n.rotation.y+(i?1:-1)*(.45+this.random()*2.4),x=1.3+this.random()*1.2,T=s?t[i].position.clone().add(new z(Math.sin(m)*.25,0,Math.cos(m)*.25)):o.clone().add(new z(Math.sin(m)*x,0,Math.cos(m)*x));if(T.y=0,l(T)){this.route.push(T);break}}if(!this.route.length)return!1;let c=this.random()*Math.PI*2;const _=a?.getWorldDirection(new z).negate().setY(0);if(_&&_.lengthSq()>1e-6){const d=new z(Math.sin(c),0,Math.cos(c)).addScaledVector(_.normalize(),.45);c=Math.atan2(d.x,d.z)}const h=this.style==="upright"?12+Math.floor(this.random()*5):20+Math.floor(this.random()*14);for(let d=0;d<h;d++){const m=this.route[this.route.length-1];let x;const T=(this.random()-.5)*.7;for(const p of[T,.6,-.6,1.15,-1.15,1.8,-1.8,Math.PI]){const f=c+p,b=new z(Math.sin(f)*.16,0,Math.cos(f)*.16);if([.25,.5,.75,1,1.5].every(C=>l(m.clone().addScaledVector(b,C)))){x=m.clone().add(b),c=f;break}}if(!x)break;this.route.push(x)}return this.route.length<9?(this.route=[],!1):(this.planted=-1,this.plantOffset.setScalar(0),this.groundedPose=void 0,this.hand=i,this.index=0,this.distance=0,this.steps=this.gaitSteps(0),this.weight=0,this.speed=this.style==="upright"?.18+this.random()*.025:.38+this.random()*.1,this.tripAt=r||this.random()<(this.style==="upright"?.48:.24)?Math.max(1.2,(this.route.length-1)*.16*(.35+this.random()*.3)):1/0,this.tripSide=this.random()<.5?-1:1,this.dazeDuration=1.6+this.random()*.7,this.pose={position:t[i].position.clone(),orientation:t[i].quaternion.clone()},this.direction.copy(this.route[1]).sub(this.route[0]).normalize(),this.contactPose=this.groundPose(this.route[0]),this.enter("land"),!0)}enter(n){this.phase=n,this.age=0,this.startWeight=this.weight,this.start={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()}}cancel(){this.phase="rest",this.weight=0,this.planted=-1}resetContacts(){this.planted=-1}groundPose(n){const t=this.style==="upright",i=this.distance/.54*Math.PI*2,a=Math.sin(i),r=new Ge().setFromAxisAngle(hi,Math.atan2(this.direction.x,this.direction.z)).multiply(new Ge().setFromAxisAngle(new z(1,0,0),t?Math.PI:Math.PI/2));let o=r,s=.38;if(t){const c=oa(this.distance),_=x=>{const T=r.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),x));return[1,2].map(p=>{const f=(p===1?.388:.358)+.435-.003,b=c[p],C=new z((p-1.5)*.145*.68,.48*.68-.17,0).applyQuaternion(T),S=T.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),(1.5-p)*.1)),A=new z(0,Math.sqrt(f*f-(b.advance/.68)**2)*.68,0).applyQuaternion(S);return .024+b.lift-C.y-A.y})};let h=-.55,d=.55;for(let x=0;x<12;x++){const T=(h+d)/2,p=_(T);p[0]>p[1]?h=T:d=T}const m=(h+d)/2;o=r.clone().multiply(new Ge().setFromAxisAngle(new z(0,0,1),m)),s=Math.min(..._(m))-.004}const l=n.clone().addScaledVector(this.direction,t?0:-.39).setY(s);return t&&l.addScaledVector(new z(this.direction.z,0,-this.direction.x),-.06*a),{position:l,orientation:o}}update(n,t,i,a){if(this.active){if(!t){this.cancel();return}if(n=Math.min(.05,n),i&&!this.leaving&&this.enter("startle"),this.age+=n,this.thumb=Math.sin(this.distance/(this.style==="upright"?.54:.27)*Math.PI*2),this.phase==="land"){const r=this.groundPose(this.route[0]),o=pn(this.age/1.25);this.pose.position.copy(this.start.position).lerp(r.position,o),this.pose.position.y+=Math.sin(Math.PI*o)*.25,this.pose.orientation.copy(this.start.orientation).slerp(r.orientation,o),this.weight=o,this.age>=1.25&&this.enter("walk")}else if(this.phase==="walk"){const r=this.route[this.index],o=this.route[this.index+1];if(!o||!this.safe(r)||!this.safe(o)){this.enter("rise");return}this.distance+=this.speed*n*(this.style==="upright"?.35+.9*Math.sin(this.distance/.54*Math.PI*2)**2:1);const s=this.distance-this.index*.16,l=Ne.clamp(s/.16,0,1),c=r.clone().lerp(o,l),_=o.clone().sub(r).normalize();if(this.direction.lerp(_,1-Math.exp(-n*9)).normalize(),this.pose=this.groundPose(c),this.contactPose={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()},this.steps=this.gaitSteps(this.distance),this.weight=1,this.style==="upright"&&this.pose.position.add(this.plantOffset),l>=1&&(this.index++,this.index>=this.route.length-1&&this.enter("rise")),this.phase==="walk"&&this.distance>=this.tripAt){this.tripAt=1/0,this.style==="upright"&&(this.steps[1].lift>0?this.tripSide=1:this.steps[2].lift>0&&(this.tripSide=-1));const h=new z(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide),d=this.style==="upright"?.9:.3;[.25,.5,.75,1].every(m=>this.safe(c.clone().addScaledVector(h,d*m)))&&(this.upright={position:this.pose.position.clone(),orientation:this.pose.orientation.clone()},this.pivot.copy(c).setY(.024),this.capturePivot(),this.enter("fall"))}}else if(this.phase==="fall"){const r=Ne.clamp(this.age/.48,0,1),o=r*r;this.tipPose(o),r===1&&this.enter("fallen")}else if(this.phase==="fallen"){const r=Math.sin(Math.min(1,this.age/.28)*Math.PI)*.07;this.tipPose(1-r),this.age>=.52&&this.enter("recover")}else if(this.phase==="recover"){const r=pn(this.age/.95);this.tipPose(1-r),this.style==="spider"&&(this.pose.position.y+=Math.sin(Math.PI*r)*.07),this.age>=.95&&this.enter("dazed")}else if(this.phase==="dazed"){const r=Ne.clamp(this.age/this.dazeDuration,0,1),o=Math.sin(Math.PI*r)*(1-r);this.pose.position.copy(this.upright.position),this.pose.orientation.copy(this.upright.orientation).multiply(new Ge().setFromAxisAngle(hi,Math.sin(this.age*8)*.19*o)).multiply(new Ge().setFromAxisAngle(new z(0,0,1),Math.sin(this.age*5)*.22*o)),this.steps=this.gaitSteps(this.distance+Math.sin(this.age*5)*.018*o),r===1&&this.enter("walk")}else if(this.phase==="startle")this.pose=Fi(this.start,this.age,this.hand?1:-1),this.age>=.2&&this.enter("rise");else if(this.phase==="rise"){const r=pn(this.age/.45);this.pose.position.copy(this.start.position).add(new z(0,.4*r,0)),this.weight=this.startWeight*(1-r),this.pose.orientation.copy(this.start.orientation).slerp(this.groundPose(this.pose.position).orientation,r),this.age>=.45&&this.enter("rejoin")}else if(this.phase==="rejoin"){const r=pn(this.age/1),o=new z((this.hand?1:-1)*.9,1.03,.22).applyQuaternion(a.quaternion).add(a.position);this.pose.position.copy(this.start.position).lerp(o,r),this.pose.orientation.copy(this.start.orientation).slerp(a.quaternion,r),this.age>=1&&this.cancel()}}}capturePivot(){this.pivotLocal.copy(this.pivot).sub(this.upright.position).applyQuaternion(this.upright.orientation.clone().invert())}tipPose(n){if(this.style==="spider"){const i=new z(this.direction.z,0,-this.direction.x).multiplyScalar(this.tripSide);this.pose.position.copy(this.upright.position).addScaledVector(i,.24*n),this.pose.position.y-=.12*n,this.pose.orientation.copy(this.upright.orientation).multiply(new Ge().setFromAxisAngle(hi,-this.tripSide*1.48*n));return}const t=new Ge().setFromAxisAngle(this.direction,-this.tripSide*1.22*n);this.pose.orientation.copy(t).multiply(this.upright.orientation),this.pose.position.copy(this.upright.position).sub(this.pivot).applyQuaternion(t).add(this.pivot)}}function jd(e,n,t,i){const a=Ne.clamp(Math.hypot(t,i),Math.abs(e-n)+.001,e+n-.001),r=Math.atan2(i,t),o=Math.acos(Ne.clamp((a*a-e*e-n*n)/(2*e*n),-1,1));return{base:r-Math.atan2(n*Math.sin(o),e+n*Math.cos(o)),middle:o}}function Hp(e,n=!1){const t=e[0].index!==null,i=new Set(Object.keys(e[0].attributes)),a=new Set(Object.keys(e[0].morphAttributes)),r={},o={},s=e[0].morphTargetsRelative,l=new xn;let c=0;for(let _=0;_<e.length;++_){const h=e[_];let d=0;if(t!==(h.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const m in h.attributes){if(!i.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+'. All geometries must have compatible attributes; make sure "'+m+'" attribute exists among all geometries, or in none of them.'),null;r[m]===void 0&&(r[m]=[]),r[m].push(h.attributes[m]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". Make sure all geometries have the same number of attributes."),null;if(s!==h.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const m in h.morphAttributes){if(!a.has(m))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+".  .morphAttributes must be consistent throughout all geometries."),null;o[m]===void 0&&(o[m]=[]),o[m].push(h.morphAttributes[m])}if(n){let m;if(t)m=h.index.count;else if(h.attributes.position!==void 0)m=h.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+_+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,m,_),c+=m}}if(t){let _=0;const h=[];for(let d=0;d<e.length;++d){const m=e[d].index;for(let x=0;x<m.count;++x)h.push(m.getX(x)+_);_+=e[d].attributes.position.count}l.setIndex(h)}for(const _ in r){const h=sa(r[_]);if(!h)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+_+" attribute."),null;l.setAttribute(_,h)}for(const _ in o){const h=o[_][0].length;if(h!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[_]=[];for(let d=0;d<h;++d){const m=[];for(let T=0;T<o[_].length;++T)m.push(o[_][T][d]);const x=sa(m);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+_+" morphAttribute."),null;l.morphAttributes[_].push(x)}}}return l}function sa(e){let n,t,i,a=-1,r=0;for(let c=0;c<e.length;++c){const _=e[c];if(n===void 0&&(n=_.array.constructor),n!==_.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=_.itemSize),t!==_.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=_.normalized),i!==_.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(a===-1&&(a=_.gpuType),a!==_.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=_.count*t}const o=new n(r),s=new Wt(o,t,i);let l=0;for(let c=0;c<e.length;++c){const _=e[c];if(_.isInterleavedBufferAttribute){const h=l/t;for(let d=0,m=_.count;d<m;d++)for(let x=0;x<t;x++){const T=_.getComponent(d,x);s.setComponent(d+h,x,T)}}else o.set(_.array,l);l+=_.count*t}return a!==void 0&&(s.gpuType=a),s}function Vp(e,n=1e-4){n=Math.max(n,Number.EPSILON);const t={},i=e.getIndex(),a=e.getAttribute("position"),r=i?i.count:a.count;let o=0;const s=Object.keys(e.attributes),l={},c={},_=[],h=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let b=0,C=s.length;b<C;b++){const S=s[b],A=e.attributes[S];l[S]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);const R=e.morphAttributes[S];R&&(c[S]||(c[S]=[]),R.forEach((w,g)=>{const E=new w.array.constructor(w.count*w.itemSize);c[S][g]=new w.constructor(E,w.itemSize,w.normalized)}))}const m=n*.5,x=Math.log10(1/n),T=Math.pow(10,x),p=m*T;for(let b=0;b<r;b++){const C=i?i.getX(b):b;let S="";for(let A=0,R=s.length;A<R;A++){const w=s[A],g=e.getAttribute(w),E=g.itemSize;for(let P=0;P<E;P++)S+=`${~~(g[h[P]](C)*T+p)},`}if(S in t)_.push(t[S]);else{for(let A=0,R=s.length;A<R;A++){const w=s[A],g=e.getAttribute(w),E=e.morphAttributes[w],P=g.itemSize,y=l[w],N=c[w];for(let $=0;$<P;$++){const Z=h[$],O=d[$];if(y[O](o,g[Z](C)),E)for(let X=0,D=E.length;X<D;X++)N[X][O](o,E[X][Z](C))}}t[S]=o,_.push(o),o++}}const f=e.clone();for(const b in e.attributes){const C=l[b];if(f.setAttribute(b,new C.constructor(C.array.slice(0,o*C.itemSize),C.itemSize,C.normalized)),b in c)for(let S=0;S<c[b].length;S++){const A=c[b][S];f.morphAttributes[b][S]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return f.setIndex(_),f}function ca(e,n){if(n===As)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),e;if(n===Ri||n===Ga){let t=e.getIndex();if(t===null){const o=[],s=e.getAttribute("position");if(s!==void 0){for(let l=0;l<s.count;l++)o.push(l);e.setIndex(o),t=e.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),e}const i=t.count-2,a=[];if(n===Ri)for(let o=1;o<=i;o++)a.push(t.getX(0)),a.push(t.getX(o)),a.push(t.getX(o+1));else for(let o=0;o<i;o++)o%2===0?(a.push(t.getX(o)),a.push(t.getX(o+1)),a.push(t.getX(o+2))):(a.push(t.getX(o+2)),a.push(t.getX(o+1)),a.push(t.getX(o)));a.length/3!==i&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=e.clone();return r.setIndex(a),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",n),e}function kp(e,n=Math.PI/3){const t=e.index?e.toNonIndexed():e,i=t.attributes.position,a=i.count;let r;if(i.isBufferAttribute===!0&&i.itemSize===3&&i.normalized===!1)r=i.array;else{r=new Float64Array(a*3);for(let S=0;S<a;S++)r[3*S+0]=i.getX(S),r[3*S+1]=i.getY(S),r[3*S+2]=i.getZ(S)}const o=Math.cos(n),s=(1+1e-10)*100,l=a/3,c=new Float64Array(l*3);for(let S=0;S<l;S++){const A=9*S,R=r[A+0],w=r[A+1],g=r[A+2],E=r[A+3],P=r[A+4],y=r[A+5],N=r[A+6],$=r[A+7],Z=r[A+8],O=N-E,X=$-P,D=Z-y,B=R-E,ee=w-P,j=g-y,J=X*j-D*ee,oe=D*B-O*j,ae=O*ee-X*B,Ae=1/(Math.sqrt(J*J+oe*oe+ae*ae)||1);c[3*S+0]=J*Ae,c[3*S+1]=oe*Ae,c[3*S+2]=ae*Ae}const _=new Int32Array(a),h=new Int32Array(a*3);let d=1;for(;d<a*2;)d<<=1;const m=d-1,x=new Int32Array(d);let T=0;for(let S=0;S<a;S++){const A=3*S,R=~~(r[A+0]*s),w=~~(r[A+1]*s),g=~~(r[A+2]*s);let E=(Math.imul(R,73856093)^Math.imul(w,19349663)^Math.imul(g,83492791))&m;for(;;){const P=x[E];if(P===0){const N=3*T;h[N+0]=R,h[N+1]=w,h[N+2]=g,x[E]=T+1,_[S]=T++;break}const y=3*(P-1);if(h[y+0]===R&&h[y+1]===w&&h[y+2]===g){_[S]=P-1;break}E=E+1&m}}const p=new Int32Array(T+1);for(let S=0;S<a;S++)p[_[S]+1]++;for(let S=0;S<T;S++)p[S+1]+=p[S];const f=new Int32Array(a),b=p.slice(0,T);for(let S=0;S<l;S++){const A=3*S;f[b[_[A+0]]++]=S,f[b[_[A+1]]++]=S,f[b[_[A+2]]++]=S}const C=new Float32Array(a*3);for(let S=0;S<l;S++){const A=3*S,R=c[A+0],w=c[A+1],g=c[A+2];for(let E=0;E<3;E++){const P=A+E,y=_[P];let N=0,$=0,Z=0;for(let X=p[y],D=p[y+1];X<D;X++){const B=3*f[X],ee=c[B+0],j=c[B+1],J=c[B+2];R*ee+w*j+g*J>o&&(N+=ee,$+=j,Z+=J)}const O=1/(Math.sqrt(N*N+$*$+Z*Z)||1);C[3*P+0]=N*O,C[3*P+1]=$*O,C[3*P+2]=Z*O}}return t.setAttribute("normal",new Wt(C,3,!1)),t}function Zd(e){const n=new Map,t=new Map,i=e.clone();return eo(e,i,function(a,r){n.set(r,a),t.set(a,r)}),i.traverse(function(a){if(!a.isSkinnedMesh)return;const r=a,o=n.get(a),s=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=s.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),i}function eo(e,n,t){t(e,n);for(let i=0;i<e.children.length;i++)eo(e.children[i],n.children[i],t)}class $d extends bs{constructor(n){super(n),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new np(t)}),this.register(function(t){return new ip(t)}),this.register(function(t){return new dp(t)}),this.register(function(t){return new pp(t)}),this.register(function(t){return new hp(t)}),this.register(function(t){return new ap(t)}),this.register(function(t){return new op(t)}),this.register(function(t){return new sp(t)}),this.register(function(t){return new cp(t)}),this.register(function(t){return new tp(t)}),this.register(function(t){return new lp(t)}),this.register(function(t){return new rp(t)}),this.register(function(t){return new up(t)}),this.register(function(t){return new fp(t)}),this.register(function(t){return new Jd(t)}),this.register(function(t){return new la(t,ke.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new la(t,ke.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new mp(t)})}load(n,t,i,a){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=yn.extractUrlBase(n);o=yn.resolveURL(c,this.path)}else o=yn.extractUrlBase(n);this.manager.itemStart(n);const s=function(c){a?a(c):console.error(c),r.manager.itemError(n),r.manager.itemEnd(n)},l=new Ha(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(n,function(c){try{r.parse(c,o,function(_){t(_),r.manager.itemEnd(n)},s)}catch(_){s(_)}},i,s)}setDRACOLoader(n){return this.dracoLoader=n,this}setKTX2Loader(n){return this.ktx2Loader=n,this}setMeshoptDecoder(n){return this.meshoptDecoder=n,this}register(n){return this.pluginCallbacks.indexOf(n)===-1&&this.pluginCallbacks.push(n),this}unregister(n){return this.pluginCallbacks.indexOf(n)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(n),1),this}parse(n,t,i,a){let r;const o={},s={},l=new TextDecoder;if(typeof n=="string")r=JSON.parse(n);else if(n instanceof ArrayBuffer)if(l.decode(new Uint8Array(n,0,4))===to){try{o[ke.KHR_BINARY_GLTF]=new _p(n)}catch(h){a&&a(h);return}r=JSON.parse(o[ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(n));else r=n;if(r.asset===void 0||r.asset.version[0]<2){a&&a(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new Pp(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let _=0;_<this.pluginCallbacks.length;_++){const h=this.pluginCallbacks[_](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),s[h.name]=h,o[h.name]=!0}if(r.extensionsUsed)for(let _=0;_<r.extensionsUsed.length;++_){const h=r.extensionsUsed[_],d=r.extensionsRequired||[];switch(h){case ke.KHR_MATERIALS_UNLIT:o[h]=new ep;break;case ke.KHR_DRACO_MESH_COMPRESSION:o[h]=new gp(r,this.dracoLoader);break;case ke.KHR_TEXTURE_TRANSFORM:o[h]=new vp;break;case ke.KHR_MESH_QUANTIZATION:o[h]=new Sp;break;default:d.indexOf(h)>=0&&s[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(o),c.setPlugins(s),c.parse(i,a)}parseAsync(n,t){const i=this;return new Promise(function(a,r){i.parse(n,t,a,r)})}}function Qd(){let e={};return{get:function(n){return e[n]},add:function(n,t){e[n]=t},remove:function(n){delete e[n]},removeAll:function(){e={}}}}function pt(e,n,t){const i=e.json.materials[n];return i.extensions&&i.extensions[t]?i.extensions[t]:null}const ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Jd{constructor(n){this.parser=n,this.name=ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const n=this.parser,t=this.parser.json.nodes||[];for(let i=0,a=t.length;i<a;i++){const r=t[i];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&n._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(n){const t=this.parser,i="light:"+n;let a=t.cache.get(i);if(a)return a;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[n];let c;const _=new Ye(16777215);l.color!==void 0&&_.setRGB(l.color[0],l.color[1],l.color[2],Lt);const h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Cs(_),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ws(_),c.distance=h;break;case"spot":c=new Rs(_),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Ft(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+n),a=Promise.resolve(c),t.cache.add(i,a),a}getDependency(n,t){if(n==="light")return this._loadLight(t)}createNodeAttachment(n){const t=this,i=this.parser,r=i.json.nodes[n],s=(r.extensions&&r.extensions[this.name]||{}).light;return s===void 0?null:this._loadLight(s).then(function(l){return i._getNodeRef(t.cache,s,l)})}}class ep{constructor(){this.name=ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Jt}extendParams(n,t,i){const a=[];n.color=new Ye(1,1,1),n.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;n.color.setRGB(o[0],o[1],o[2],Lt),n.opacity=o[3]}r.baseColorTexture!==void 0&&a.push(i.assignTexture(n,"map",r.baseColorTexture,mn))}return Promise.all(a)}}class tp{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);return i===null||i.emissiveStrength!==void 0&&(t.emissiveIntensity=i.emissiveStrength),Promise.resolve()}}class np{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(a.push(this.parser.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const r=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new St(r,r)}return Promise.all(a)}}class ip{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_DISPERSION}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);return i===null||(t.dispersion=i.dispersion!==void 0?i.dispersion:0),Promise.resolve()}}class rp{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(a)}}class ap{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_SHEEN}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];if(t.sheenColor=new Ye(0,0,0),t.sheenRoughness=0,t.sheen=1,i.sheenColorFactor!==void 0){const r=i.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],Lt)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenColorMap",i.sheenColorTexture,mn)),i.sheenRoughnessTexture!==void 0&&a.push(this.parser.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(a)}}class op{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&a.push(this.parser.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(a)}}class sp{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_VOLUME}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&a.push(this.parser.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const r=i.attenuationColor||[1,1,1];return t.attenuationColor=new Ye().setRGB(r[0],r[1],r[2],Lt),Promise.all(a)}}class cp{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_IOR}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);return i===null||(t.ior=i.ior!==void 0?i.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class lp{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_SPECULAR}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularIntensityMap",i.specularTexture));const r=i.specularColorFactor||[1,1,1];return t.specularColor=new Ye().setRGB(r[0],r[1],r[2],Lt),i.specularColorTexture!==void 0&&a.push(this.parser.assignTexture(t,"specularColorMap",i.specularColorTexture,mn)),Promise.all(a)}}class fp{constructor(n){this.parser=n,this.name=ke.EXT_MATERIALS_BUMP}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&a.push(this.parser.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(a)}}class up{constructor(n){this.parser=n,this.name=ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(n){return pt(this.parser,n,this.name)!==null?kt:null}extendMaterialParams(n,t){const i=pt(this.parser,n,this.name);if(i===null)return Promise.resolve();const a=[];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&a.push(this.parser.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(a)}}class dp{constructor(n){this.parser=n,this.name=ke.KHR_TEXTURE_BASISU}loadTexture(n){const t=this.parser,i=t.json,a=i.textures[n];if(!a.extensions||!a.extensions[this.name])return null;const r=a.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(n,r.source,o)}}class pp{constructor(n){this.parser=n,this.name=ke.EXT_TEXTURE_WEBP}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let l=i.textureLoader;if(s.uri){const c=i.options.manager.getHandler(s.uri);c!==null&&(l=c)}return i.loadTextureImage(n,o.source,l)}}class hp{constructor(n){this.parser=n,this.name=ke.EXT_TEXTURE_AVIF}loadTexture(n){const t=this.name,i=this.parser,a=i.json,r=a.textures[n];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],s=a.images[o.source];let l=i.textureLoader;if(s.uri){const c=i.options.manager.getHandler(s.uri);c!==null&&(l=c)}return i.loadTextureImage(n,o.source,l)}}class la{constructor(n,t){this.name=t,this.parser=n}loadBufferView(n){const t=this.parser.json,i=t.bufferViews[n];if(i.extensions&&i.extensions[this.name]){const a=i.extensions[this.name],r=this.parser.getDependency("buffer",a.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(s){const l=a.byteOffset||0,c=a.byteLength||0,_=a.count,h=a.byteStride,d=new Uint8Array(s,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(_,h,d,a.mode,a.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(_*h);return o.decodeGltfBuffer(new Uint8Array(m),_,h,d,a.mode,a.filter),m})})}else return null}}class mp{constructor(n){this.name=ke.EXT_MESH_GPU_INSTANCING,this.parser=n}createNodeMesh(n){const t=this.parser.json,i=t.nodes[n];if(!i.extensions||!i.extensions[this.name]||i.mesh===void 0)return null;const a=t.meshes[i.mesh];for(const c of a.primitives)if(c.mode!==Ct.TRIANGLES&&c.mode!==Ct.TRIANGLE_STRIP&&c.mode!==Ct.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=i.extensions[this.name].attributes,s=[],l={};for(const c in o)s.push(this.parser.getDependency("accessor",o[c]).then(_=>(l[c]=_,l[c])));return s.length<1?null:(s.push(this.parser.createNodeMesh(n)),Promise.all(s).then(c=>{const _=c.pop(),h=_.isGroup?_.children:[_],d=c[0].count,m=[];for(const x of h){const T=new yt,p=new z,f=new Ge,b=new z(1,1,1),C=new Ps(x.geometry,x.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&p.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,S),l.SCALE&&b.fromBufferAttribute(l.SCALE,S),C.setMatrixAt(S,T.compose(p,f,b));for(const S in l)if(S==="_COLOR_0"){const A=l[S];C.instanceColor=new ys(A.array,A.itemSize,A.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&x.geometry.setAttribute(S,l[S]);Va.prototype.copy.call(C,x),this.parser.assignFinalMaterial(C),m.push(C)}return _.isGroup?(_.clear(),_.add(...m),_):m[0]}))}}const to="glTF",bn=12,fa={JSON:1313821514,BIN:5130562};class _p{constructor(n){this.name=ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(n,0,bn),i=new TextDecoder;if(this.header={magic:i.decode(new Uint8Array(n.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==to)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const a=this.header.length-bn,r=new DataView(n,bn);let o=0;for(;o<a;){const s=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===fa.JSON){const c=new Uint8Array(n,bn+o,s);this.content=i.decode(c)}else if(l===fa.BIN){const c=bn+o;this.body=n.slice(c,c+s)}o+=s}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class gp{constructor(n,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ke.KHR_DRACO_MESH_COMPRESSION,this.json=n,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(n,t){const i=this.json,a=this.dracoLoader,r=n.extensions[this.name].bufferView,o=n.extensions[this.name].attributes,s={},l={},c={};for(const _ in o){const h=Pi[_]||_.toLowerCase();s[h]=o[_]}for(const _ in n.attributes){const h=Pi[_]||_.toLowerCase();if(o[_]!==void 0){const d=i.accessors[n.attributes[_]],m=hn[d.componentType];c[h]=m.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(_){return new Promise(function(h,d){a.decodeDracoFile(_,function(m){for(const x in m.attributes){const T=m.attributes[x],p=l[x];p!==void 0&&(T.normalized=p)}h(m)},s,c,Lt,d)})})}}class vp{constructor(){this.name=ke.KHR_TEXTURE_TRANSFORM}extendTexture(n,t){return(t.texCoord===void 0||t.texCoord===n.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(n=n.clone(),t.texCoord!==void 0&&(n.channel=t.texCoord),t.offset!==void 0&&n.offset.fromArray(t.offset),t.rotation!==void 0&&(n.rotation=t.rotation),t.scale!==void 0&&n.repeat.fromArray(t.scale),n.needsUpdate=!0),n}}class Sp{constructor(){this.name=ke.KHR_MESH_QUANTIZATION}}class no extends Xs{constructor(n,t,i,a){super(n,t,i,a)}copySampleValue_(n){const t=this.resultBuffer,i=this.sampleValues,a=this.valueSize,r=n*a*3+a;for(let o=0;o!==a;o++)t[o]=i[r+o];return t}interpolate_(n,t,i,a){const r=this.resultBuffer,o=this.sampleValues,s=this.valueSize,l=s*2,c=s*3,_=a-t,h=(i-t)/_,d=h*h,m=d*h,x=n*c,T=x-c,p=-2*m+3*d,f=m-d,b=1-p,C=f-d+h;for(let S=0;S!==s;S++){const A=o[T+S+s],R=o[T+S+l]*_,w=o[x+S+s],g=o[x+S]*_;r[S]=b*A+C*R+p*w+f*g}return r}}const xp=new Ge;class Ep extends no{interpolate_(n,t,i,a){const r=super.interpolate_(n,t,i,a);return xp.fromArray(r).normalize().toArray(r),r}}const Ct={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},hn={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ua={9728:Gt,9729:vt,9984:va,9985:Vn,9986:wn,9987:$t},da={33071:Wn,33648:ga,10497:Xn},mi={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Pi={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Zt={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Mp={CUBICSPLINE:void 0,LINEAR:ka,STEP:zs},_i={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Tp(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new Ni({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_n})),e.DefaultMaterial}function rn(e,n,t){for(const i in t.extensions)e[i]===void 0&&(n.userData.gltfExtensions=n.userData.gltfExtensions||{},n.userData.gltfExtensions[i]=t.extensions[i])}function Ft(e,n){n.extras!==void 0&&(typeof n.extras=="object"?Object.assign(e.userData,n.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+n.extras))}function Ap(e,n,t){let i=!1,a=!1,r=!1;for(let c=0,_=n.length;c<_;c++){const h=n[c];if(h.POSITION!==void 0&&(i=!0),h.NORMAL!==void 0&&(a=!0),h.COLOR_0!==void 0&&(r=!0),i&&a&&r)break}if(!i&&!a&&!r)return Promise.resolve(e);const o=[],s=[],l=[];for(let c=0,_=n.length;c<_;c++){const h=n[c];if(i){const d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):e.attributes.position;o.push(d)}if(a){const d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):e.attributes.normal;s.push(d)}if(r){const d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):e.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(l)]).then(function(c){const _=c[0],h=c[1],d=c[2];return i&&(e.morphAttributes.position=_),a&&(e.morphAttributes.normal=h),r&&(e.morphAttributes.color=d),e.morphTargetsRelative=!0,e})}function bp(e,n){if(e.updateMorphTargets(),n.weights!==void 0)for(let t=0,i=n.weights.length;t<i;t++)e.morphTargetInfluences[t]=n.weights[t];if(n.extras&&Array.isArray(n.extras.targetNames)){const t=n.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(let i=0,a=t.length;i<a;i++)e.morphTargetDictionary[t[i]]=i}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Rp(e){let n;const t=e.extensions&&e.extensions[ke.KHR_DRACO_MESH_COMPRESSION];if(t?n="draco:"+t.bufferView+":"+t.indices+":"+gi(t.attributes):n=e.indices+":"+gi(e.attributes)+":"+e.mode,e.targets!==void 0)for(let i=0,a=e.targets.length;i<a;i++)n+=":"+gi(e.targets[i]);return n}function gi(e){let n="";const t=Object.keys(e).sort();for(let i=0,a=t.length;i<a;i++)n+=t[i]+":"+e[t[i]]+";";return n}function yi(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function wp(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?"image/jpeg":e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?"image/webp":e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Cp=new yt;class Pp{constructor(n={},t={}){this.json=n,this.extensions={},this.plugins={},this.options=t,this.cache=new Qd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let i=!1,a=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const s=navigator.userAgent;i=/^((?!chrome|android).)*safari/i.test(s)===!0;const l=s.match(/Version\/(\d+)/);a=i&&l?parseInt(l[1],10):-1,r=s.indexOf("Firefox")>-1,o=r?s.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||i&&a<17||r&&o<98?this.textureLoader=new Ls(this.options.manager):this.textureLoader=new Is(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ha(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(n){this.extensions=n}setPlugins(n){this.plugins=n}parse(n,t){const i=this,a=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([i.getDependencies("scene"),i.getDependencies("animation"),i.getDependencies("camera")])}).then(function(o){const s={scene:o[0][a.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:a.asset,parser:i,userData:{}};return rn(r,s,a),Ft(s,a),Promise.all(i._invokeAll(function(l){return l.afterRoot&&l.afterRoot(s)})).then(function(){for(const l of s.scenes)l.updateMatrixWorld();n(s)})}).catch(t)}_markDefs(){const n=this.json.nodes||[],t=this.json.skins||[],i=this.json.meshes||[];for(let a=0,r=t.length;a<r;a++){const o=t[a].joints;for(let s=0,l=o.length;s<l;s++)n[o[s]].isBone=!0}for(let a=0,r=n.length;a<r;a++){const o=n[a];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(i[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(n,t){t!==void 0&&(n.refs[t]===void 0&&(n.refs[t]=n.uses[t]=0),n.refs[t]++)}_getNodeRef(n,t,i){if(n.refs[t]<=1)return i;const a=i.clone(),r=(o,s)=>{const l=this.associations.get(o);l!=null&&this.associations.set(s,l);for(const[c,_]of o.children.entries())r(_,s.children[c])};return r(i,a),a.name+="_instance_"+n.uses[t]++,a}_invokeOne(n){const t=Object.values(this.plugins);t.push(this);for(let i=0;i<t.length;i++){const a=n(t[i]);if(a)return a}return null}_invokeAll(n){const t=Object.values(this.plugins);t.unshift(this);const i=[];for(let a=0;a<t.length;a++){const r=n(t[a]);r&&i.push(r)}return i}getDependency(n,t){const i=n+":"+t;let a=this.cache.get(i);if(!a){switch(n){case"scene":a=this.loadScene(t);break;case"node":a=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":a=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":a=this.loadAccessor(t);break;case"bufferView":a=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":a=this.loadBuffer(t);break;case"material":a=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":a=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":a=this.loadSkin(t);break;case"animation":a=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":a=this.loadCamera(t);break;default:if(a=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(n,t)}),!a)throw new Error("Unknown type: "+n);break}this.cache.add(i,a)}return a}getDependencies(n){let t=this.cache.get(n);if(!t){const i=this,a=this.json[n+(n==="mesh"?"es":"s")]||[];t=Promise.all(a.map(function(r,o){return i.getDependency(n,o)})),this.cache.add(n,t)}return t}loadBuffer(n){const t=this.json.buffers[n],i=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&n===0)return Promise.resolve(this.extensions[ke.KHR_BINARY_GLTF].body);const a=this.options;return new Promise(function(r,o){i.load(yn.resolveURL(t.uri,a.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(n){const t=this.json.bufferViews[n];return this.getDependency("buffer",t.buffer).then(function(i){const a=t.byteLength||0,r=t.byteOffset||0;return i.slice(r,r+a)})}loadAccessor(n){const t=this,i=this.json,a=this.json.accessors[n];if(a.bufferView===void 0&&a.sparse===void 0){const o=mi[a.type],s=hn[a.componentType],l=a.normalized===!0,c=new s(a.count*o);return Promise.resolve(new Wt(c,o,l))}const r=[];return a.bufferView!==void 0?r.push(this.getDependency("bufferView",a.bufferView)):r.push(null),a.sparse!==void 0&&(r.push(this.getDependency("bufferView",a.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",a.sparse.values.bufferView))),Promise.all(r).then(function(o){const s=o[0],l=mi[a.type],c=hn[a.componentType],_=c.BYTES_PER_ELEMENT,h=_*l,d=a.byteOffset||0,m=a.bufferView!==void 0?i.bufferViews[a.bufferView].byteStride:void 0,x=a.normalized===!0;let T,p;if(m&&m!==h){const f=Math.floor(d/m),b="InterleavedBuffer:"+a.bufferView+":"+a.componentType+":"+f+":"+a.count;let C=t.cache.get(b);C||(T=new c(s,f*m,a.count*m/_),C=new Ds(T,m/_),t.cache.add(b,C)),p=new Ws(C,l,d%m/_,x)}else s===null?T=new c(a.count*l):T=new c(s,d,a.count*l),p=new Wt(T,l,x);if(a.sparse!==void 0){const f=mi.SCALAR,b=hn[a.sparse.indices.componentType],C=a.sparse.indices.byteOffset||0,S=a.sparse.values.byteOffset||0,A=new b(o[1],C,a.sparse.count*f),R=new c(o[2],S,a.sparse.count*l);s!==null&&(p=new Wt(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let w=0,g=A.length;w<g;w++){const E=A[w];if(p.setX(E,R[w*l]),l>=2&&p.setY(E,R[w*l+1]),l>=3&&p.setZ(E,R[w*l+2]),l>=4&&p.setW(E,R[w*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}p.normalized=x}return p})}loadTexture(n){const t=this.json,i=this.options,r=t.textures[n].source,o=t.images[r];let s=this.textureLoader;if(o.uri){const l=i.manager.getHandler(o.uri);l!==null&&(s=l)}return this.loadTextureImage(n,r,s)}loadTextureImage(n,t,i){const a=this,r=this.json,o=r.textures[n],s=r.images[t],l=(s.uri||s.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,i).then(function(_){_.flipY=!1,_.name=o.name||s.name||"",_.name===""&&typeof s.uri=="string"&&s.uri.startsWith("data:image/")===!1&&(_.name=s.uri);const d=(r.samplers||{})[o.sampler]||{};return _.magFilter=ua[d.magFilter]||vt,_.minFilter=ua[d.minFilter]||$t,_.wrapS=da[d.wrapS]||Xn,_.wrapT=da[d.wrapT]||Xn,_.generateMipmaps=!_.isCompressedTexture&&_.minFilter!==Gt&&_.minFilter!==vt,a.associations.set(_,{textures:n}),_}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(n,t){const i=this,a=this.json,r=this.options;if(this.sourceCache[n]!==void 0)return this.sourceCache[n].then(h=>h.clone());const o=a.images[n],s=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=i.getDependency("bufferView",o.bufferView).then(function(h){c=!0;const d=new Blob([h],{type:o.mimeType});return l=s.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+n+" is missing URI and bufferView");const _=Promise.resolve(l).then(function(h){return new Promise(function(d,m){let x=d;t.isImageBitmapLoader===!0&&(x=function(T){const p=new bi(T);p.needsUpdate=!0,d(p)}),t.load(yn.resolveURL(h,r.path),x,void 0,m)})}).then(function(h){return c===!0&&s.revokeObjectURL(l),Ft(h,o),h.userData.mimeType=o.mimeType||wp(o.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[n]=_,_}assignTexture(n,t,i,a){const r=this;return this.getDependency("texture",i.index).then(function(o){if(!o)return null;if(i.texCoord!==void 0&&i.texCoord>0&&(o=o.clone(),o.channel=i.texCoord),r.extensions[ke.KHR_TEXTURE_TRANSFORM]){const s=i.extensions!==void 0?i.extensions[ke.KHR_TEXTURE_TRANSFORM]:void 0;if(s){const l=r.associations.get(o);o=r.extensions[ke.KHR_TEXTURE_TRANSFORM].extendTexture(o,s),r.associations.set(o,l)}}return a!==void 0&&(o.colorSpace=a),n[t]=o,o})}assignFinalMaterial(n){const t=n.geometry;let i=n.material;const a=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(n.isPoints){const s="PointsMaterial:"+i.uuid;let l=this.cache.get(s);l||(l=new Us,oi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,l.sizeAttenuation=!1,this.cache.add(s,l)),i=l}else if(n.isLine){const s="LineBasicMaterial:"+i.uuid;let l=this.cache.get(s);l||(l=new Ns,oi.prototype.copy.call(l,i),l.color.copy(i.color),l.map=i.map,this.cache.add(s,l)),i=l}if(a||r||o){let s="ClonedMaterial:"+i.uuid+":";a&&(s+="derivative-tangents:"),r&&(s+="vertex-colors:"),o&&(s+="flat-shading:");let l=this.cache.get(s);l||(l=i.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),a&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(s,l),this.associations.set(l,this.associations.get(i))),i=l}n.material=i}getMaterialType(){return Ni}loadMaterial(n){const t=this,i=this.json,a=this.extensions,r=i.materials[n];let o;const s={},l=r.extensions||{},c=[];if(l[ke.KHR_MATERIALS_UNLIT]){const h=a[ke.KHR_MATERIALS_UNLIT];o=h.getMaterialType(),c.push(h.extendParams(s,r,t))}else{const h=r.pbrMetallicRoughness||{};if(s.color=new Ye(1,1,1),s.opacity=1,Array.isArray(h.baseColorFactor)){const d=h.baseColorFactor;s.color.setRGB(d[0],d[1],d[2],Lt),s.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(s,"map",h.baseColorTexture,mn)),s.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,s.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(s,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(s,"roughnessMap",h.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(n)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(n,s)})))}r.doubleSided===!0&&(s.side=Pt);const _=r.alphaMode||_i.OPAQUE;if(_===_i.BLEND?(s.transparent=!0,s.depthWrite=!1):(s.transparent=!1,_===_i.MASK&&(s.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Jt&&(c.push(t.assignTexture(s,"normalMap",r.normalTexture)),s.normalScale=new St(1,1),r.normalTexture.scale!==void 0)){const h=r.normalTexture.scale;s.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&o!==Jt&&(c.push(t.assignTexture(s,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(s.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Jt){const h=r.emissiveFactor;s.emissive=new Ye().setRGB(h[0],h[1],h[2],Lt)}return r.emissiveTexture!==void 0&&o!==Jt&&c.push(t.assignTexture(s,"emissiveMap",r.emissiveTexture,mn)),Promise.all(c).then(function(){const h=new o(s);return r.name&&(h.name=r.name),Ft(h,r),t.associations.set(h,{materials:n}),r.extensions&&rn(a,h,r),h})}createUniqueName(n){const t=Fs.sanitizeNodeName(n||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(n){const t=this,i=this.extensions,a=this.primitiveCache;function r(s){return i[ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(s,t).then(function(l){return pa(l,s,t)})}const o=[];for(let s=0,l=n.length;s<l;s++){const c=n[s],_=Rp(c),h=a[_];if(h)o.push(h.promise);else{let d;c.extensions&&c.extensions[ke.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=pa(new xn,c,t),a[_]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(n){const t=this,i=this.json,a=this.extensions,r=i.meshes[n],o=r.primitives,s=[];for(let l=0,c=o.length;l<c;l++){const _=o[l].material===void 0?Tp(this.cache):this.getDependency("material",o[l].material);s.push(_)}return s.push(t.loadGeometries(o)),Promise.all(s).then(function(l){const c=l.slice(0,l.length-1),_=l[l.length-1],h=[];for(let m=0,x=_.length;m<x;m++){const T=_[m],p=o[m];let f;const b=c[m];if(p.mode===Ct.TRIANGLES||p.mode===Ct.TRIANGLE_STRIP||p.mode===Ct.TRIANGLE_FAN||p.mode===void 0)f=r.isSkinnedMesh===!0?new Kn(T,b):new xt(T,b),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),p.mode===Ct.TRIANGLE_STRIP?f.geometry=ca(f.geometry,Ga):p.mode===Ct.TRIANGLE_FAN&&(f.geometry=ca(f.geometry,Ri));else if(p.mode===Ct.LINES)f=new Os(T,b);else if(p.mode===Ct.LINE_STRIP)f=new Bs(T,b);else if(p.mode===Ct.LINE_LOOP)f=new Gs(T,b);else if(p.mode===Ct.POINTS)f=new Hs(T,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+p.mode);Object.keys(f.geometry.morphAttributes).length>0&&bp(f,r),f.name=t.createUniqueName(r.name||"mesh_"+n),Ft(f,r),p.extensions&&rn(a,f,p),t.assignFinalMaterial(f),h.push(f)}for(let m=0,x=h.length;m<x;m++)t.associations.set(h[m],{meshes:n,primitives:m});if(h.length===1)return r.extensions&&rn(a,h[0],r),h[0];const d=new At;r.extensions&&rn(a,d,r),t.associations.set(d,{meshes:n});for(let m=0,x=h.length;m<x;m++)d.add(h[m]);return d})}loadCamera(n){let t;const i=this.json.cameras[n],a=i[i.type];if(!a){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return i.type==="perspective"?t=new Pn(Ne.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):i.type==="orthographic"&&(t=new Ii(-a.xmag,a.xmag,a.ymag,-a.ymag,a.znear,a.zfar)),i.name&&(t.name=this.createUniqueName(i.name)),Ft(t,i),Promise.resolve(t)}loadSkin(n){const t=this.json.skins[n],i=[];for(let a=0,r=t.joints.length;a<r;a++)i.push(this._loadNodeShallow(t.joints[a]));return t.inverseBindMatrices!==void 0?i.push(this.getDependency("accessor",t.inverseBindMatrices)):i.push(null),Promise.all(i).then(function(a){const r=a.pop(),o=a,s=[],l=[];for(let c=0,_=o.length;c<_;c++){const h=o[c];if(h){s.push(h);const d=new yt;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Vs(s,l)})}loadAnimation(n){const t=this.json,i=this,a=t.animations[n],r=a.name?a.name:"animation_"+n,o=[],s=[],l=[],c=[],_=[];for(let h=0,d=a.channels.length;h<d;h++){const m=a.channels[h],x=a.samplers[m.sampler],T=m.target,p=T.node,f=a.parameters!==void 0?a.parameters[x.input]:x.input,b=a.parameters!==void 0?a.parameters[x.output]:x.output;T.node!==void 0&&(o.push(this.getDependency("node",p)),s.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",b)),c.push(x),_.push(T))}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(l),Promise.all(c),Promise.all(_)]).then(function(h){const d=h[0],m=h[1],x=h[2],T=h[3],p=h[4],f=[];for(let C=0,S=d.length;C<S;C++){const A=d[C],R=m[C],w=x[C],g=T[C],E=p[C];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();const P=i._createAnimationTracks(A,R,w,g,E);if(P)for(let y=0;y<P.length;y++)f.push(P[y])}const b=new ks(r,void 0,f);return Ft(b,a),b})}createNodeMesh(n){const t=this.json,i=this,a=t.nodes[n];return a.mesh===void 0?null:i.getDependency("mesh",a.mesh).then(function(r){const o=i._getNodeRef(i.meshCache,a.mesh,r);return a.weights!==void 0&&o.traverse(function(s){if(s.isMesh)for(let l=0,c=a.weights.length;l<c;l++)s.morphTargetInfluences[l]=a.weights[l]}),o})}loadNode(n){const t=this.json,i=this,a=t.nodes[n],r=i._loadNodeShallow(n),o=[],s=a.children||[];for(let c=0,_=s.length;c<_;c++)o.push(i.getDependency("node",s[c]));const l=a.skin===void 0?Promise.resolve(null):i.getDependency("skin",a.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const _=c[0],h=c[1],d=c[2];d!==null&&_.traverse(function(m){m.isSkinnedMesh&&m.bind(d,Cp)});for(let m=0,x=h.length;m<x;m++)_.add(h[m]);if(_.userData.pivot!==void 0&&h.length>0){const m=_.userData.pivot,x=h[0];_.pivot=new z().fromArray(m),_.position.x-=m[0],_.position.y-=m[1],_.position.z-=m[2],x.position.set(0,0,0),delete _.userData.pivot}return _})}_loadNodeShallow(n){const t=this.json,i=this.extensions,a=this;if(this.nodeCache[n]!==void 0)return this.nodeCache[n];const r=t.nodes[n],o=r.name?a.createUniqueName(r.name):"",s=[],l=a._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(n)});return l&&s.push(l),r.camera!==void 0&&s.push(a.getDependency("camera",r.camera).then(function(c){return a._getNodeRef(a.cameraCache,r.camera,c)})),a._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(n)}).forEach(function(c){s.push(c)}),this.nodeCache[n]=Promise.all(s).then(function(c){let _;if(r.isBone===!0?_=new kn:c.length>1?_=new At:c.length===1?_=c[0]:_=new Va,_!==c[0])for(let h=0,d=c.length;h<d;h++)_.add(c[h]);if(r.name&&(_.userData.name=r.name,_.name=o),Ft(_,r),r.extensions&&rn(i,_,r),r.matrix!==void 0){const h=new yt;h.fromArray(r.matrix),_.applyMatrix4(h)}else r.translation!==void 0&&_.position.fromArray(r.translation),r.rotation!==void 0&&_.quaternion.fromArray(r.rotation),r.scale!==void 0&&_.scale.fromArray(r.scale);if(!a.associations.has(_))a.associations.set(_,{});else if(r.mesh!==void 0&&a.meshCache.refs[r.mesh]>1){const h=a.associations.get(_);a.associations.set(_,{...h})}return a.associations.get(_).nodes=n,_}),this.nodeCache[n]}loadScene(n){const t=this.extensions,i=this.json.scenes[n],a=this,r=new At;i.name&&(r.name=a.createUniqueName(i.name)),Ft(r,i),i.extensions&&rn(t,r,i);const o=i.nodes||[],s=[];for(let l=0,c=o.length;l<c;l++)s.push(a.getDependency("node",o[l]));return Promise.all(s).then(function(l){for(let _=0,h=l.length;_<h;_++){const d=l[_];d.parent!==null?r.add(Zd(d)):r.add(d)}const c=_=>{const h=new Map;for(const[d,m]of a.associations)(d instanceof oi||d instanceof bi)&&h.set(d,m);return _.traverse(d=>{const m=a.associations.get(d);m!=null&&h.set(d,m)}),h};return a.associations=c(r),r})}_createAnimationTracks(n,t,i,a,r){const o=[],s=n.name?n.name:n.uuid,l=[];function c(m){m.morphTargetInfluences&&l.push(m.name?m.name:m.uuid)}Zt[r.path]===Zt.weights?(c(n),n.isGroup&&n.children.forEach(c)):l.push(s);let _;switch(Zt[r.path]){case Zt.weights:_=Dr;break;case Zt.rotation:_=Ur;break;case Zt.translation:case Zt.scale:_=Ir;break;default:switch(i.itemSize){case 1:_=Dr;break;case 2:case 3:default:_=Ir;break}break}const h=a.interpolation!==void 0?Mp[a.interpolation]:ka,d=this._getArrayFromAccessor(i);for(let m=0,x=l.length;m<x;m++){const T=new _(l[m]+"."+Zt[r.path],t.array,d,h);a.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(T),o.push(T)}return o}_getArrayFromAccessor(n){let t=n.array;if(n.normalized){const i=yi(t.constructor),a=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)a[r]=t[r]*i;t=a}return t}_createCubicSplineTrackInterpolant(n){n.createInterpolant=function(i){const a=this instanceof Ur?Ep:no;return new a(this.times,this.values,this.getValueSize()/3,i)},n.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function yp(e,n,t){const i=n.attributes,a=new za;if(i.POSITION!==void 0){const s=t.json.accessors[i.POSITION],l=s.min,c=s.max;if(l!==void 0&&c!==void 0){if(a.set(new z(l[0],l[1],l[2]),new z(c[0],c[1],c[2])),s.normalized){const _=yi(hn[s.componentType]);a.min.multiplyScalar(_),a.max.multiplyScalar(_)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=n.targets;if(r!==void 0){const s=new z,l=new z;for(let c=0,_=r.length;c<_;c++){const h=r[c];if(h.POSITION!==void 0){const d=t.json.accessors[h.POSITION],m=d.min,x=d.max;if(m!==void 0&&x!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(x[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(x[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(x[2]))),d.normalized){const T=yi(hn[d.componentType]);l.multiplyScalar(T)}s.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}a.expandByVector(s)}e.boundingBox=a;const o=new qs;a.getCenter(o.center),o.radius=a.min.distanceTo(a.max)/2,e.boundingSphere=o}function pa(e,n,t){const i=n.attributes,a=[];function r(o,s){return t.getDependency("accessor",o).then(function(l){e.setAttribute(s,l)})}for(const o in i){const s=Pi[o]||o.toLowerCase();s in e.attributes||a.push(r(i[o],s))}if(n.indices!==void 0&&!e.index){const o=t.getDependency("accessor",n.indices).then(function(s){e.setIndex(s)});a.push(o)}return rt.workingColorSpace!==Lt&&"COLOR_0"in i&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${rt.workingColorSpace}" not supported.`),Ft(e,n),yp(e,n,t),Promise.all(a).then(function(){return n.targets!==void 0?Ap(e,n.targets,t):e})}function Lp(e){e.updateMatrixWorld(!0);const n=e.getObjectByName("Body"),t=[];e.traverse(r=>{r instanceof Kn&&/upper_arm|forearm|cut_sleeve|bodily_hand/.test(r.name)&&t.push(r)});const i=[],a=[];for(const r of[-1,1]){const o=t.filter(d=>(d.skeleton.update(),d.computeBoundingBox(),Math.sign(d.boundingBox.getCenter(new z).applyMatrix4(d.matrixWorld).x)===r)),s=new Map,l=new za;for(const d of o){const m=Array.from({length:d.geometry.attributes.position.count},(x,T)=>n.worldToLocal(d.localToWorld(d.getVertexPosition(T,new z))));s.set(d,m),d.name.includes("upper_arm")&&m.forEach(x=>l.expandByPoint(x))}const c=l.getCenter(new z);c.y=l.max.y-.025;const _=new At;_.name="Procedural shoulder "+r,_.position.copy(c),n.add(_),i.push(_);const h=new At;h.position.set(0,l.min.y-c.y,0),_.add(h),_.userData.elbow=h;for(const d of o){const m=d.geometry.clone();m.setAttribute("position",new Ei(s.get(d).flatMap(p=>p.clone().sub(c).toArray()),3)),m.deleteAttribute("skinIndex"),m.deleteAttribute("skinWeight"),m.computeVertexNormals(),m.computeBoundingSphere();const x=/forearm|bodily_hand/.test(d.name);x&&m.translate(-h.position.x,-h.position.y,-h.position.z);const T=new xt(m,d.material);T.name=d.name+" swing",T.castShadow=!0,(x?h:_).add(T),d.visible=!1,d.name.includes("bodily_hand")&&a.push(T)}}return{hands:a,update(r,o,s,l,c){i.forEach((_,h)=>{const d=-Math.sin(r*2*Math.PI+h*Math.PI)*o*(s?.8:.32);_.rotation.x=Ne.lerp(_.rotation.x,l?h===0?-.65:-.08:d,1-Math.exp(-c*16));const m=_.userData.elbow;m.rotation.x=Ne.lerp(m.rotation.x,l?-.25:s?-.85:-.08,1-Math.exp(-c*10)),_.rotation.z=Ne.lerp(_.rotation.z,(h===0?1:-1)*(s?.14:.04),1-Math.exp(-c*10))})}}}const ha=new z(0,-1,0),vi=new z(0,0,1);function Ip(e,n){const t=[];e.traverse(T=>{T instanceof kn&&t.push(T)});const i=t.find(T=>T.name==="Root"),a=t.find(T=>T.name==="Body"),r=t.filter(T=>T.name.startsWith("Thigh")).sort((T,p)=>T.position.x-p.position.x).map(T=>{const p=T.children.find(A=>A instanceof kn),f=p.children.find(A=>A instanceof kn),b=T.quaternion.clone(),C=b.clone().multiply(p.quaternion),S=C.clone().multiply(f.quaternion);return{hip:T,shin:p,foot:f,at:T.position.clone(),hipRest:b,shinRest:C,footRest:S,upper:p.position.length(),lower:f.position.length()}});if(!i||!a||r.length!==2)throw new Error("Stride requires Root, Body and two thigh/shin/foot chains");const o=t.find(T=>T.name.startsWith("Tunic")),s=a.quaternion.clone(),l=o?.quaternion.clone(),c=i.position.clone();let _=0,h=0,d=0;const m=vi.clone();let x=0;return{restore(){a.quaternion.copy(s),o&&l&&o.quaternion.copy(l)},lean(T){a.quaternion.copy(s).multiply(new Ge().setFromAxisAngle(new z(1,0,0),T))},get phase(){return _},get weight(){return h},update(T,p,f,b,C=!1){s.copy(a.quaternion),o&&l&&l.copy(o.quaternion),x=Ne.lerp(x,C?1:0,1-Math.exp(-T*7));const S=b?.28:Ne.lerp(.36,.54,x),A=Ne.lerp(.6,.42,x),R=p.length();if(R>1e-5){const P=Math.atan2(p.x,p.z);d+=Math.atan2(Math.sin(P-d),Math.cos(P-d))*(1-Math.exp(-T*12)),m.set(Math.sin(d),0,Math.cos(d))}f&&(_=(_+R*A/(2*S*n))%1),h=Ne.lerp(h,f?1:0,1-Math.exp(-T*10)),i.position.copy(c);const w=r.map((P,y)=>{const N=(_+y*.5)%1;let $,Z=0;if(N<A)$=1-2*N/A;else{const O=(N-A)/(1-A),X=-2*(1-A)/A;$=-(2*O*O*O-3*O*O+1)+(O*O*O-2*O*O+O)*X+(-2*O*O*O+3*O*O)+(O*O*O-O*O)*X,Z=Math.sin(Math.PI*O)**2*(b?.065:Ne.lerp(.08,.28,x))}return new z(P.at.x,.18,P.at.z).addScaledVector(m,$*S*h).add(new z(0,Z*h,0))}),g=S*h,E=.18+Math.sqrt((Math.min(...r.map(P=>P.upper+P.lower))-.012)**2-g*g)+x*h*.018*Math.sin(_*4*Math.PI);a.position.y=E,r.forEach((P,y)=>{P.hip.position.copy(P.at).setY(E);const N=w[y].clone().sub(P.hip.position),$=N.length(),Z=N.clone().normalize(),O=(P.upper**2-P.lower**2+$*$)/(2*$),X=Math.sqrt(Math.max(0,P.upper**2-O*O)),D=vi.clone().addScaledVector(Z,-vi.dot(Z)).normalize(),B=P.hip.position.clone().addScaledVector(Z,O).addScaledVector(D,X),ee=new Ge().setFromUnitVectors(ha,B.clone().sub(P.hip.position).normalize()).multiply(P.hipRest),j=new Ge().setFromUnitVectors(ha,w[y].clone().sub(B).normalize()).multiply(P.shinRest);P.hip.quaternion.copy(ee),P.shin.quaternion.copy(ee).invert().multiply(j),P.foot.quaternion.copy(j).invert().multiply(P.footRest)}),o&&o.quaternion.multiply(new Ge().setFromAxisAngle(new z(1,0,0),-.24*h*Math.max(0,...w.map(P=>P.z))/S))}}}class Dp{constructor(n=Math.random){this.random=n,this.mode="catch",this.catchWait=0,this.remaining=7+n()*4,this.lastHands={walk:n()<.5?0:1,catch:n()<.5?0:1}}rest(){this.remaining=12+this.random()*10,this.pending=void 0,this.catchWait=0}tick(n,t,i,a=!1){if(i)return;if(!t||this.mode==="rest"){this.remaining=Math.max(7,this.remaining),this.pending=void 0,this.catchWait=0;return}if(this.pending==="catch"&&a&&(this.catchWait+=n),this.remaining=Math.max(0,this.remaining-n),this.remaining>0)return;const r=this.pending??(this.mode==="explore"?"walk":this.mode==="catch-only"?"catch":this.last?this.last==="walk"?"catch":"walk":this.random()<.5?"walk":"catch");return this.pending=r,this.remaining=r==="catch"?.35:3,{kind:r,hand:this.handFor(r),allowWalk:r==="walk"||this.mode==="catch"&&this.catchWait>=2.5}}handFor(n){return 1-this.lastHands[n]}started(n,t){this.last=n,this.lastHands[n]=t,this.pending=void 0,this.catchWait=0}}function zp(e,n){if(!(e>.56||n>.56))return{effort:Ne.smoothstep(e*e*n,.08,.18)}}const io=new z(0,.12,.19),Si=new z(1,0,0),an=e=>Ne.smoothstep(e,0,1),Up=e=>({position:e.position.clone(),orientation:e.orientation.clone(),grasp:e.grasp});function xi(e){return io.clone().applyQuaternion(e.orientation).add(e.position)}class Np{constructor(n=Math.random){this.random=n,this.phase="rest",this.poses=[],this.age=0,this.idle=0,this.throws=0,this.catches=0,this.misses=0,this.sessions=0,this.enabled=!0,this.held=!1,this.holder=0,this.props=[],this.starts=[],this.homes=[],this.origin=new z,this.home=new z,this.heading=new Ge,this.elapsed=0,this.flightTime=1,this.reaction=.2,this.reachSpeed=4,this.target=new z,this.velocity=new z,this.spin=new z(1,2,.7).normalize(),this.launch=new z,this.restingRotation=new Ge,this.attachedRotation=new Ge,this.loose=!1,this.bounces=0,this.cooldown=7,this.throwDirection=new z,this.throwRotation=new Ge,this.departureCenter=new z,this.pickupRadius=1.6,this.windupTime=1.3,this.feintSide=1,this.feintWidth=.3,this.readCue=0,this.cue=0,this.shufflePhase=0,this.throwSide=new z,this.safe=()=>!0}setProps(n,t){this.cancel(),this.props=n,this.safe=t??(()=>!0)}setEnabled(n){this.enabled=n,n||this.cancel()}requestStart(n,t=1.6){this.pickupRadius=t,this.requestedHand=n,this.idle=this.cooldown}pickupFor(n,t,i,a=1.6){const r=i[n].position;return this.props.filter(o=>o.object.visible&&Math.hypot(o.object.position.x-r.x,o.object.position.z-r.z)<=a&&Math.hypot(o.object.position.x-t.position.x,o.object.position.z-t.position.z)<4.6&&[0,.2,.4,.6,.8,1].every(s=>{const l=r.clone().lerp(o.object.position,s);return Math.hypot(l.x-t.position.x,l.z-t.position.z)>.8&&this.safe(l)})).sort((o,s)=>Math.hypot(o.object.position.x-r.x,o.object.position.z-r.z)-Math.hypot(s.object.position.x-r.x,s.object.position.z-r.z))[0]}nearbyHand(n,t,i,a,r=1.6){return[a,1-a].find(o=>i[o]&&!!this.pickupFor(o,n,t,r))}get effort(){return Ne.clamp(this.prop?.effort??0,0,1)}get disengaging(){return this.phase==="startle"||this.phase==="depart"||this.phase==="rejoin"}get active(){return this.phase!=="rest"}get state(){return{phase:this.phase,effort:this.effort,holder:this.holder,separation:this.homes.length?this.homes[0].position.distanceTo(this.homes[1].position):0,stone:this.prop?.object.userData.rockSeed??null,held:this.held,loose:this.loose,throws:this.throws,catches:this.catches,misses:this.misses,sessions:this.sessions,age:this.age,flightTime:this.flightTime,position:this.prop?.object.position.toArray()??null,windupTime:this.windupTime,cue:this.cue,readCue:this.readCue,hands:this.poses.map(n=>({position:n.position.toArray(),orientation:n.orientation.toArray(),grasp:n.grasp}))}}enter(n){this.phase=n,this.age=0,this.starts=this.poses.map(Up)}local(n,t,i){return new z(n,t,i).applyQuaternion(this.heading).add(this.origin)}rotation(n){return this.heading.clone().multiply(new Ge().setFromAxisAngle(Si,n))}palmAt(n,t){return n.clone().sub(io.clone().applyQuaternion(t))}tween(n,t,i,a,r){const o=this.starts[n],s=this.poses[n],l=an(r);s.position.copy(o.position).lerp(t,l),s.orientation.copy(o.orientation).slerp(i,l),s.grasp=Ne.lerp(o.grasp,a,l)}attach(){this.held=!0,this.loose=!1,this.attachedRotation.copy(this.poses[this.holder].orientation).invert().multiply(this.prop.object.quaternion)}syncHeld(){this.held&&this.prop&&(this.prop.object.position.copy(xi(this.poses[this.holder])),this.prop.object.quaternion.copy(this.poses[this.holder].orientation).multiply(this.attachedRotation))}cancel(){this.phase==="flight"&&(this.velocity.y-=9.8*Math.min(this.age,this.flightTime),this.loose=!0,this.bounces=0),this.held&&(this.syncHeld(),this.held=!1,this.loose=!0,this.velocity.set(0,0,0),this.bounces=0),this.phase="rest",this.idle=0,this.requestedHand=void 0,this.pickupRadius=1.6,this.cooldown=7+this.random()*4}settleForEditing(){if(this.cancel(),this.loose&&this.prop){const n=this.prop.object;n.position.y=this.prop.groundY,n.quaternion.copy(this.restingRotation),this.prop.touch.set(n.position.x,this.prop.groundY+this.prop.radius,n.position.z)}this.loose=!1,this.velocity.setScalar(0)}drop(n){if(!this.loose||!this.prop)return;const t=this.prop.object;t.position.addScaledVector(this.velocity,n),t.position.y-=4.9*n*n,this.velocity.y-=9.8*n,t.quaternion.premultiply(new Ge().setFromAxisAngle(this.spin,n*5)),t.position.y<=this.prop.groundY&&(t.position.y=this.prop.groundY,this.bounces++===0&&Math.abs(this.velocity.y)>1.2?(this.velocity.y=Math.abs(this.velocity.y)*.25,this.velocity.x*=.3,this.velocity.z*=.3):(this.loose=!1,this.velocity.setScalar(0),t.quaternion.copy(this.restingRotation),this.prop.touch.set(t.position.x,this.prop.groundY+this.prop.radius,t.position.z)))}facing(n){const t=n.clone().setY(0).normalize(),i=new z(0,1,0);return new Ge().setFromRotationMatrix(new yt().makeBasis(new z().crossVectors(t,i),t,i))}spreadOut(){const n=this.homes[1].position.clone().sub(this.homes[0].position).setY(0).normalize();for(let t=0;t<2;t++){const i=n.clone().multiplyScalar(t?1:-1),a=.35+this.random()*.2,r=this.homes[t].position.clone().addScaledVector(i,a);r.distanceTo(this.origin)<4.6&&[.25,.5,.75,1].every(o=>this.safe(this.homes[t].position.clone().lerp(r,o)))&&this.homes[t].position.copy(r)}this.enter("spread")}planThrow(){const n=1-this.holder,t=this.homes[0].position.distanceTo(this.homes[1].position);this.flightTime=.85+this.random()*.3+Math.min(.35,(t-3)*.07);const i=Math.min(1,this.catches/6),a=this.random()<.08+i*.52;this.reaction=a?this.flightTime*(.8+i*.13):.14+this.random()*.15,this.reachSpeed=2.7+this.random()*1.6;const r=xi(this.homes[n]),o=1+i*1.8;this.target.copy(r).add(new z((this.random()-.5)*1.25*o,(this.random()-.5)*.5,(this.random()-.5)*o)),this.safe(this.target)||this.target.copy(r),this.throwDirection.copy(this.target).sub(this.poses[this.holder].position).setY(0).normalize(),this.throwRotation.copy(this.facing(this.throwDirection)),this.throwSide.set(-this.throwDirection.z,0,this.throwDirection.x),this.windupTime=1.15+this.random()*.4+this.effort*.35,this.feintSide=this.random()<.5?-1:1,this.feintWidth=.22+this.random()*.18,this.shufflePhase=this.random()*Math.PI*2,this.readCue=this.cue=0,this.enter("windup")}watchReceiver(n){this.readCue=Ne.lerp(this.readCue,this.cue,1-Math.exp(-n*6));const t=1-this.holder,i=this.poses[t],a=this.homes[t].position,r=Math.sin(this.elapsed*2.5+this.shufflePhase)*.12,o=a.clone().addScaledVector(this.throwSide,this.readCue*.55+r);o.y+=Math.sin(this.elapsed*4+this.shufflePhase)*.06;const s=o.sub(i.position),l=i.position.clone().addScaledVector(s,Math.min(1,n*1.25/Math.max(s.length(),.001)));[.25,.5,.75,1].every(_=>{const h=i.position.clone().lerp(l,_);return Math.hypot(h.x-this.origin.x,h.z-this.origin.z)>.9&&this.safe(h)})&&i.position.copy(l);const c=this.facing(this.poses[this.holder].position.clone().sub(i.position));c.premultiply(new Ge().setFromAxisAngle(new z(0,1,0),this.readCue*.18)),c.multiply(new Ge().setFromAxisAngle(Si,-.12)),i.orientation.slerp(c,1-Math.exp(-n*5)),i.grasp=.03+.025*(1+Math.sin(this.elapsed*5))}depart(){this.phase==="flight"&&(this.velocity.y-=9.8*Math.min(this.age,this.flightTime),this.loose=!0,this.bounces=0),this.departureCenter.copy(this.prop.object.position),this.enter(this.held?"depart":"rejoin")}update(n,t,i,a,r=!1,o=!0){if(n=Math.min(Math.max(n,0),.05),!t||!this.enabled){this.active&&this.cancel(),this.idle=0,this.drop(n);return}if(r){if(this.idle=0,this.active&&!this.disengaging)this.phase==="flight"&&(this.velocity.y-=9.8*Math.min(this.age,this.flightTime),this.loose=!0,this.bounces=0),this.enter("startle");else if(!this.active){this.drop(n);return}}if(this.phase==="rest"){if(this.drop(n),this.loose)return;if(!o){this.idle=0;return}if(this.idle+=n,this.idle<this.cooldown)return;const m=this.pickupRadius;this.pickupRadius=1.6;const x=this.requestedHand??this.nearbyHand(i,a,[!0,!0],0);this.requestedHand=void 0;const T=x===void 0?void 0:this.pickupFor(x,i,a,m);if(!T){this.idle=2;return}const p=a.some(f=>Math.hypot(f.position.x-i.position.x,f.position.z-i.position.z)>1.7);if(this.prop=T,this.holder=x,this.origin.copy(i.position),this.heading.copy(i.quaternion),this.home.copy(this.prop.object.position),this.restingRotation.copy(this.prop.object.quaternion),this.poses=a.map(f=>({position:f.position.clone(),orientation:f.quaternion.clone(),grasp:0})),this.homes=[0,1].map(f=>{const b=this.local((f?1:-1)*(1.5+this.random()*.25),1.25,1.35);if(p){const C=a[f].position.clone().sub(this.origin).setY(0);C.setLength(Ne.clamp(C.length(),2.5,3.2)),b.copy(this.origin).add(C).setY(1.25)}return{position:b,orientation:this.rotation(-Math.PI/2),grasp:0}}),p&&this.homes[0].position.distanceTo(this.homes[1].position)<3.2){const f=1-this.holder,b=this.homes[f].position.clone().sub(this.origin);for(const C of[.5,-.5,1,-1,1.5,-1.5,Math.PI]){const S=b.clone().applyAxisAngle(new z(0,1,0),C).add(this.origin);if(S.distanceTo(this.homes[this.holder].position)>=3.2&&this.safe(S)){this.homes[f].position.copy(S);break}}}if(this.homes.some(f=>!this.safe(f.position))||p&&this.homes[0].position.distanceTo(this.homes[1].position)<3.2){this.prop=void 0,this.idle=0;return}this.elapsed=0,this.throws=this.catches=this.misses=0,this.sessions++,this.enter("scout")}this.age+=n,this.elapsed+=n;const s=this.holder,l=1-s,c=this.prop.object,_=this.rotation(Math.PI/2),h=this.rotation(-Math.PI/2),d=()=>this.palmAt(c.position,_);switch(this.phase){case"startle":this.poses=this.starts.map((m,x)=>({...Fi(m,this.age,x?1:-1),grasp:m.grasp})),this.drop(n),this.age>=.2&&(this.syncHeld(),this.depart());break;case"scout":{const m=d();this.tween(s,m,_,.04,this.age/1.7);const x=an(this.age/1.7);this.poses[s].position.copy(this.starts[s].position).lerp(m,x),this.poses[s].position.y+=Math.sin(x*Math.PI)*.12,this.age>=1.7&&this.enter("grip");break}case"grip":this.tween(s,d(),_,.88,this.age/.65),this.age>=.65&&(this.attach(),this.enter("lift"));break;case"lift":{const m=1.05+this.effort*.55;this.tween(s,this.homes[s].position,h,.88,this.age/m),this.age>=m&&this.enter("notice");break}case"notice":{const m=this.starts[l].position.clone().add(new z(0,.35,0));this.tween(l,m,this.rotation(-.7),.02,this.age/.3),this.age>=.65&&this.enter("spread");break}case"spread":for(let m=0;m<2;m++)this.tween(m,this.homes[m].position,h,m===s?.88:0,this.age/.95);this.age>=.95&&this.planThrow();break;case"windup":{const m=this.starts[s].position.clone().addScaledVector(this.throwDirection,-.58).add(new z(0,-.38,0)),x=Math.min(1,this.age/this.windupTime);this.cue=this.feintSide*Math.sin(x*Math.PI*2)*Math.sin(x*Math.PI),this.tween(s,m,this.throwRotation.clone().multiply(new Ge().setFromAxisAngle(Si,-.25)),.92,x);const T=this.poses[s],p=T.position.clone().addScaledVector(this.throwSide,this.cue*this.feintWidth);[.25,.5,.75,1].every(f=>this.safe(T.position.clone().lerp(p,f)))&&T.position.copy(p),T.orientation.premultiply(new Ge().setFromAxisAngle(new z(0,1,0),this.cue*.55)),this.watchReceiver(n),x===1&&this.enter("throw");break}case"throw":{const m=Math.min(1,this.age/.24),x=this.poses[s];x.position.copy(this.starts[s].position).addScaledVector(this.throwDirection,.95*m*m),x.position.y+=.6*m*m,x.orientation.copy(this.starts[s].orientation).slerp(this.throwRotation,m*m),x.grasp=.92*(1-an((m-.6)/.4)),this.cue=0,this.watchReceiver(n),this.age>=.24&&(this.syncHeld(),this.launch.copy(c.position),this.velocity.copy(this.target).sub(this.launch).divideScalar(this.flightTime),this.velocity.y+=4.9*this.flightTime,this.held=!1,this.throws++,this.enter("flight"));break}case"flight":{const m=Math.min(this.age,this.flightTime);c.position.copy(this.launch).addScaledVector(this.velocity,m),c.position.y-=4.9*m*m,c.quaternion.premultiply(new Ge().setFromAxisAngle(this.spin,n*(4+this.throws)));const x=this.starts[s].position.clone().addScaledVector(this.throwDirection,.35).add(new z(0,.18,0));if(this.age<.25){const f=1-Math.pow(1-this.age/.25,3);this.poses[s].position.copy(this.starts[s].position).lerp(x,f),this.poses[s].orientation.copy(this.throwRotation),this.poses[s].grasp=0}else this.poses[s].position.copy(x).lerp(this.homes[s].position,an((this.age-.25)/.45)),this.poses[s].orientation.copy(this.throwRotation).slerp(h,an((this.age-.25)/.45));const T=this.poses[l],p=this.palmAt(this.target,h);if(this.age>this.reaction){const f=p.sub(T.position);T.position.addScaledVector(f,Math.min(1,this.reachSpeed*n/Math.max(f.length(),.001)))}else this.watchReceiver(n);this.age>this.reaction&&(T.orientation.slerp(h,1-Math.exp(-n*12)),T.grasp=0),this.age>=this.flightTime&&(xi(T).distanceTo(c.position)<.17?(this.holder=l,this.catches++,this.attach(),this.enter("catch")):(this.misses++,this.velocity.y-=9.8*this.flightTime,this.loose=!0,this.bounces=0,this.enter("miss")));break}case"catch":this.tween(s,this.starts[s].position.clone().add(new z(0,-.12-this.effort*.12,0)),h,.88,this.age/.28),this.age>=.55&&(this.elapsed>30?this.enter("return"):this.spreadOut());break;case"miss":this.drop(n),!this.loose&&this.age>.9&&this.enter("rejoin");break;case"return":this.tween(s,this.palmAt(this.home,_),_,.88,this.age/1.3),this.age>=1.3&&(this.syncHeld(),this.held=!1,c.position.copy(this.home),c.quaternion.copy(this.restingRotation),this.prop.touch.set(c.position.x,this.prop.groundY+this.prop.radius,c.position.z),this.enter("place"));break;case"place":this.tween(s,this.starts[s].position.clone().add(new z(0,.22,0)),_,0,this.age/.6),this.age>=.6&&this.enter("rejoin");break;case"depart":{const m=an(this.age/.65),x=this.departureCenter.clone();x.y=Ne.lerp(x.y,this.prop.groundY,m);const T=this.poses[s];T.orientation.copy(this.starts[s].orientation).slerp(_,m),T.position.copy(this.palmAt(x,T.orientation)),T.grasp=this.starts[s].grasp*(1-an((this.age-.55)/.25)),this.syncHeld(),this.age>=.8&&(this.held=!1,c.position.y=this.prop.groundY,c.quaternion.copy(this.restingRotation),this.prop.touch.set(c.position.x,this.prop.groundY+this.prop.radius,c.position.z),this.enter("rejoin"));break}case"rejoin":this.drop(n);for(let m=0;m<2;m++){const x=new z((m?1:-1)*.9,1.03,.22).applyQuaternion(i.quaternion).add(i.position);this.tween(m,x,i.quaternion,0,this.age/1.05)}this.age>=1.05&&(this.cancel(),this.cooldown=12+this.random()*10);break}this.syncHeld()}}const Li=[{id:"glide-paddle",name:"Wide glide · gentle paddle",description:"Wide, palm-down hands with a small alternating sweep and a little shared lift. The default travelling pose."},{id:"streamlined",name:"Tucked palms",description:"Palms down, fingers forward, held slightly behind the hips. A small shared bob follows the running stride."},{id:"paddle",name:"Alternating paddle",description:"Palms down with opposite forward-and-back sweeps, as if gently helping the traveller along."},{id:"glide",name:"Wide glide",description:"Open palms held wider and nearly level, with just a little shared lift. More like balancing than rowing."},{id:"standing",name:"Original escort",description:"The previous upright hand pose, retained as a comparison."}];class Fp{constructor(){this.style="glide-paddle",this.weight=0,this.duration=0}setStyle(n){Li.some(t=>t.id===n)&&(this.style=n)}update(n,t,i,a){this.duration=i&&t>.45&&a?this.duration+n:0;const r=this.style==="standing"?0:Ne.smoothstep(this.duration,.18,.8)*Ne.smoothstep(t,.25,2.5);this.weight=Ne.lerp(this.weight,r,1-Math.exp(-n*(r>this.weight?5:9)))}sample(n,t){const i=t*Math.PI*2+(n>0?Math.PI:0),a=Math.sin(t*Math.PI*4);let r,o,s;if(this.style==="paddle")r=new z(n*.98,1+Math.sin(i)*.09,.02+Math.cos(i)*.24),o=new si(Math.PI/2+Math.sin(i)*.18,n*.08,n*.06),s=.16+.06*Math.sin(i);else if(this.style==="glide"||this.style==="glide-paddle"){const l=this.style==="glide-paddle"?1:0;r=new z(n*1.24,1.12+a*.025+l*Math.sin(i)*.025,-.1+l*Math.cos(i)*.085),o=new si(Math.PI/2-.06+l*Math.sin(i)*.065,n*.12,n*.08),s=.025+l*(.035+.025*Math.sin(i))}else r=new z(n*.88,.94+a*.045,-.4+Math.sin(i)*.035),o=new si(Math.PI/2-.1+a*.035,n*.1,n*.035),s=.2;return{position:r,orientation:new Ge().setFromEuler(o),grasp:s}}}function Wp(e,n){const t=document.createElement("label");t.textContent="Travelling hands";const i=document.createElement("select");i.id="travelHands";for(const o of Li){const s=document.createElement("option");s.value=o.id,s.textContent=o.name,i.append(s)}const a=document.createElement("small");a.id="travelHandsHelp",i.setAttribute("aria-describedby",a.id);const r=()=>{n(i.value),a.textContent=Li.find(o=>o.id===i.value).description};return i.onchange=r,r(),t.append(i),e.append(t,a),i}function Op(e){const n=new At,t=new At;n.add(t),e.add(n);const i=D=>new Wa({color:D}),a=i("#356b73"),r=i("#364654"),o=i("#d4ad87"),s=i("#363a49"),l=i("#d9b875");function c(D,B,ee,j=[0,0,0]){const J=new xt(D,B);return J.position.set(j[0],j[1],j[2]),J.castShadow=!0,ee.add(J),J}const _=[-1,1].map(D=>{const B=new At;return B.position.set(D*.13,.52,0),t.add(B),c(new Fn(.075,.055,.4,5),r,B,[0,-.19,0]),c(new wt(.16,.11,.23),r,B,[0,-.43,.045]),B});c(new Fn(.19,.25,.5,7),r,t,[0,.76,0]),c(new Fn(.17,.35,.24,7),a,t,[0,1,-.035]);const h=c(new Ks(.35,.53,5,1,!0),a,t,[0,.74,-.12]);h.scale.z=.6,c(new Nr(.235,1),o,t,[0,1.3,0]),c(new Ys(.244,8,5,0,Math.PI*2,0,Math.PI*.6),s,t,[0,1.34,-.04]);for(const D of[-.085,.085])c(new wt(.042,.055,.025),r,t,[D,1.3,.211]);c(new wt(.07,.07,.05),l,t,[.06,.99,.23]);const d=[-1,1].map(D=>{const B=new At;return B.position.set(D*.26,.98,0),t.add(B),c(new Fn(.062,.047,.34,5),a,B,[0,-.15,0]),c(new Nr(.07,0),o,B,[0,-.34,0]),B}),m=c(new js(.42,.47,32),new Jt({color:"#eee0b4",side:Pt}),n,[0,.025,0]);m.rotation.x=-Math.PI/2;function x(D){const B=new At;B.userData.mistOverlay=!0,B.userData.hand=D<0?"right":"left",e.add(B);const ee=new Ni({color:D<0?"#6d918c":"#93aba0",roughness:.75,flatShading:!0,transparent:!0}),j=new Jt({color:D<0?"#a6e3d5":"#f1dba0",transparent:!0});c(new wt(.38,.4,.14),ee,B),c(new wt(.25,.035,.15),j,B,[0,-.09,0]);const J=[],oe=[];for(let Ae=0;Ae<3;Ae++){const ue=new At;ue.position.set((Ae-1)*.145,.21,0),ue.rotation.z=(1-Ae)*.09,B.add(ue),J.push(ue),c(new wt(.115,.2,.12),ee,ue,[0,.1,0]);const q=new At;q.position.y=.21,ue.add(q),oe.push(q),c(new wt(.085,.17,.1),ee,q,[0,.085,0]),c(new wt(.09,.025,.12),j,ue,[0,.205,0])}const ae=new At;return ae.position.set(-D*.245,-.04,.02),ae.rotation.z=D*.8,B.add(ae),c(new wt(.13,.24,.14),ee,ae,[0,.1,0]),B.traverse(Ae=>{Ae instanceof xt&&(Ae.renderOrder=20)}),{group:B,joints:J,tips:oe,thumb:ae}}const T=[x(-1),x(1)],p=new Ge,f=new Np,b=new Yd,C=new Dp,S=new Kd,A=new Fp;let R=0,w=0;const g=T.map(()=>[0,0,0,0,0]);let E=[0,0],P=0,y=!1,N=!1;const $=()=>f.setEnabled(C.mode==="catch"||C.mode==="catch-only");function Z(){y=!1,f.cancel(),b.cancel(),S.cancel(),C.rest(),$(),n.userData.idlePreviewStatus="Stopped. Ready to preview."}function O(D,B){if(!N)return n.userData.idlePreviewStatus="Stop moving or finish interacting first.";Z();const ee=T.map(J=>J.group);let j=!1;if(D==="roam")S.preview(n,ee),j=!0;else if(D==="catch"){const J=f.nearbyHand(n,ee,[!0,!0],C.handFor("catch"),3.2);J!==void 0&&(f.setEnabled(!0),f.requestStart(J,3.2),f.update(0,!0,n,ee,!1,!0),j=f.active)}else{const J=b.preference;b.preference=D.startsWith("upright")?"upright":"spider";for(const oe of[C.handFor("walk"),1-C.handFor("walk")])if(b.startWalk(n,ee,oe,B,D.endsWith("stumble"))){j=!0;break}b.preference=J}return y=j,j||$(),n.userData.idlePreviewStatus=j?"Preview playing. Move to test the return, or stop below.":D==="catch"?"No available stone nearby. Move closer to a small rock or let it settle.":"No clear walking route here. Move to a more open patch."}function X(D,B,ee,j,J,oe,ae=0,Ae=!0,ue,q=!1,se=!1){const re=D/1e3;A.update(B,R,ee,!J&&!oe&&!Ae&&!ue),n.userData.travelHandPose=A.style,n.userData.travelHandWeight=A.weight;const Pe=!J&&!oe&&!Ae&&!ue&&!q,De=ee||se;N=Pe&&!De;const Le=f.active||b.active,ot=S.active;S.update(B,Pe&&(y||C.mode!=="rest"),De,Le,n,T.map(ve=>ve.group));const Oe=y?void 0:C.tick(B,Pe&&!De,Le,[0,1].some(ve=>S.ready(ve,n)));if(Oe){const ve=Oe.kind==="catch"?f.nearbyHand(n,T.map(Fe=>Fe.group),[0,1].map(Fe=>S.ready(Fe,n)),Oe.hand):void 0;ve!==void 0&&(f.requestStart(ve),f.update(B,Pe,n,T.map(Fe=>Fe.group),De,!0));const Re=C.handFor("walk");!f.active&&Oe.allowWalk&&C.mode!=="catch-only"&&S.ready(Re,n)&&b.startWalk(n,T.map(Fe=>Fe.group),Re,j)?C.started("walk",Re):f.active&&C.started("catch",ve)}(!Oe||!f.active)&&f.update(B,Pe,n,T.map(ve=>ve.group),De,!1),b.update(B,Pe,De,n);const Ke=f.active||b.active;Le&&!Ke&&(S.finish(T.map(ve=>ve.group)),C.rest()),ot&&!S.active&&!Ke&&C.rest(),y&&!Ke&&!S.active&&(y=!1,$(),C.rest(),n.userData.idlePreviewStatus="Preview finished. Ready to play another."),n.userData.idleRoam=S.state,n.userData.idleCatch=f.state,n.userData.fingerWalk=b.state,n.userData.idleCooldown=C.remaining,P=De||!Pe||Ke?0:P+B,n.userData.handActivity=S.phase==="startle"||f.disengaging||b.leaving?"disengaging":f.active?"playing-catch":b.active?"finger-walking":S.phase==="drift"?"roaming":J||oe?"tree":"escort";const We=ue?Ne.clamp(ue.effort,0,1):0,ze=ue?.velocity.clone().applyAxisAngle(new z(0,1,0),-n.rotation.y),at=re*(ue?8:10),lt=ue?.23:.45;_.forEach((ve,Re)=>{const Fe=Math.sin(at+Re*Math.PI);ve.rotation.x=ee?Fe*lt*(ze&&ze.z<-.1?-1:1):0,ve.rotation.z=ue&&ee?Fe*Ne.clamp(ze.x,-1,1)*.12:0}),d.forEach((ve,Re)=>{const Fe=Re===ae?J:oe;ve.rotation.x=Fe?-(ue?1.05:.8):ee&&!ue?-Math.sin(at+Re*Math.PI)*.3:0,ve.rotation.z=Fe?Re?-.22:.22:0});const ft=1-Math.exp(-B*10);t.rotation.x=Ne.lerp(t.rotation.x,ue?-.1-We*.1:0,ft),t.position.y=Ne.lerp(t.position.y,(ee?Math.abs(Math.sin(at))*(ue?.012:.025):Math.sin(re*2)*.012)-(ue?.04+We*.025:0),ft),T.forEach((ve,Re)=>{const Fe=Re===ae?J:oe,I=A.sample(Re?1:-1,w),ht=Fe?0:A.weight,je=new z((Re?1:-1)*.9,1.03+Math.sin(re*2+Re)*.07,.22).lerp(I.position,ht).applyAxisAngle(new z(0,1,0),n.rotation.y).add(n.position),M=new z(1,0,0).applyQuaternion(j.quaternion),u=new z(Re?1:-1,0,0).applyQuaternion(n.quaternion).dot(M),F=new z(u*.1-.52,-.3,.8).applyQuaternion(j.quaternion),V=Fe?Fe.clone().add(F):je;ve.group.position.lerp(V,1-Math.exp(-B*(Fe?25:ee?18:8))),p.copy(n.quaternion),p.multiply(new Ge().setFromAxisAngle(new z(0,0,1),Fe?Re?.18:-.18:Re?-.22:.22)),ht>0&&p.slerp(n.quaternion.clone().multiply(I.orientation),ht),ve.group.quaternion.slerp(p,1-Math.exp(-B*14)),E[Re]=Ne.lerp(E[Re],Fe&&(Ae||Re!==ae)?1:I.grasp*ht,1-Math.exp(-B*12));const K=!ee&&!Fe&&!Ae&&!ue?Ne.smoothstep(P,.6,1.8):0,ie=g[Re];for(let ne=0;ne<ie.length;ne++){const Y=.025+.16*Math.pow(.5+.5*Math.sin(re*1.35+Re*2.3-ne*.72),4),ce=E[Re]+K*Y*(ne===4?.55:1);ie[ne]=Fe?E[Re]:Ne.lerp(ie[ne],ce,1-Math.exp(-B*10))}if(ve.joints.forEach((ne,k)=>{ne.rotation.x=.06+ie[k]*(.48+k*.045),ve.tips[k].rotation.x=ie[k]*(1+k*.06)}),ve.thumb.rotation.x=ie[4]*.65,ve.thumb.rotation.z=(Re?1:-1)*(.8-ie[4]*.25),ve.group.userData.fingerGrasps=ie,ve.group.userData.grasp=E[Re],ve.group.scale.setScalar(Fe?1.15:1),ve.group.userData.fingerWalk=void 0,ve.joints.forEach((ne,k)=>{ne.scale.setScalar(1),ne.rotation.z=(1-k)*.09}),S.active&&S.poses[Re]&&(ve.group.position.copy(S.poses[Re].position),ve.group.quaternion.copy(S.poses[Re].orientation)),f.active){const ne=f.poses[Re];ve.group.position.copy(ne.position),ve.group.quaternion.copy(ne.orientation),E[Re]=ne.grasp;for(let k=0;k<ie.length;k++)ie[k]=ne.grasp;ve.joints.forEach((k,Y)=>{k.rotation.x=.06+ie[Y]*(.48+Y*.045),ve.tips[Y].rotation.x=ie[Y]*(1+Y*.06)}),ve.thumb.rotation.x=ie[4]*.65,ve.thumb.rotation.z=(Re?1:-1)*(.8-ie[4]*.25),ve.group.userData.grasp=ne.grasp}if(b.active&&b.hand===Re){ve.group.position.copy(b.pose.position),ve.group.quaternion.copy(b.pose.orientation);const ne=b.weight,k=b.style==="upright";ve.group.userData.fingerWalk=b.gait,ve.joints.forEach((ce,Ee)=>{const de=k?Ee+1:Ee,le=b.steps[de],we=(1-Ee)*(k?.08:.22),Ie=k?1.5:1,Ue=k&&Ee===2?{base:1.25,middle:1.8}:Ja(.21*Ie,.17*Ie,ce.position,1,new z,b.contactPose,b.gait.direction,le,we,k?0:.13);ce.scale.setScalar(Ne.lerp(1,Ie,ne)),ce.quaternion.slerp(new Ge().setFromAxisAngle(new z(0,0,1),we).multiply(new Ge().setFromAxisAngle(new z(1,0,0),Ue.base)),ne),ve.tips[Ee].rotation.x=Ne.lerp(ve.tips[Ee].rotation.x,Ue.middle,ne)}),ve.group.updateMatrixWorld(!0);const Y=ve.tips.map(ce=>ce.localToWorld(new z(0,.17,0)));ve.group.userData.artHand||Object.assign(n.userData.fingerWalk,b.recordContacts(k?[new z(0,1,0),Y[0],Y[1],new z(0,1,0)]:Y,ve.group)),ve.thumb.rotation.x=Ne.lerp(ve.thumb.rotation.x,.35+b.thumb*.3,ne),ve.thumb.rotation.z=Ne.lerp(ve.thumb.rotation.z,(Re?1:-1)*(1+b.thumb*.2),ne)}})}return{root:n,body:t,hands:T,update:X,previewIdle:O,stopIdlePreview:Z,settleIdleProps:()=>f.settleForEditing(),resetWalkContacts:()=>b.resetContacts(),setIdleWalkStyle:D=>{b.preference=D,b.cancel(),C.rest()},setIdleTerrain:D=>{b.setTerrain(D),S.setTerrain(D)},setIdleMode:D=>{C.mode=D,D==="rest"&&S.cancel(),f.setEnabled(D==="catch"||D==="catch-only"),(D==="rest"||D==="catch-only")&&b.cancel(),C.rest()},setCatchProps:(D,B)=>f.setProps(D,B),setIdleCatch:D=>f.setEnabled(D),setTravelStyle:D=>A.setStyle(D),setTravelMotion(D,B){R=D,w=B},linkEnds(){return n.updateMatrixWorld(!0),T[0].group.updateMatrixWorld(!0),{from:d[0].localToWorld(new z(0,-.34,0)),to:T[0].group.localToWorld(new z(0,-.2,0))}}}}function Xp(e,n){const t=Op(e),i=t.root,a=new $d,r=new _a(new Uint8Array([65,145,220,255]),4,1,Oa);r.minFilter=r.magFilter=Gt,r.needsUpdate=!0;const o=.72,s=new Map;let l="blue-wrap",c,_="checkpoint";const h=t.hands.map(w=>[...w.group.children]);let d="raincoat";const m={raincoat:["#edbf3e","#845a2a","#ffdf86"],ember:["#c95543","#693c4c","#e8a966"],cyan:["#51c8d2","#316473","#b6ece0"],fern:["#81b44f","#365745","#d2d976"]};function x(w){const g=m[d];for(const E of w.colors)E.material.color.copy(g?new Ye(g[E.role]):E.original)}let T=!1,p=0;const f=i.position.clone();let b=!1;function C(w){if(l=w,w!=="checkpoint"&&!s.has(w)){n("Loading "+w+"…");return}for(const g of s.values())g.model.visible=!1,g.hands.forEach(E=>E.visible=!1);c=s.get(w),_=w,t.body.visible=!c,t.hands.forEach(g=>g.group.userData.artHand=!!c),t.resetWalkContacts(),h.forEach(g=>g.forEach(E=>E.visible=!c)),c&&(c.model.visible=!0,c.hands.forEach(g=>g.visible=!0)),n(c?"Art handoff 01 · run / walk / articulated hands":"Previous procedural figure retained for comparison.")}async function S(w){const g=await a.loadAsync((w==="blue-wrap"?new URL(""+new URL("blue-wrap-33c1a2df.glb",import.meta.url).href,self.location):new URL(""+new URL("olive-cape-a483fe78.glb",import.meta.url).href,self.location)).href),E=g.scene;E.updateMatrixWorld(!0);const P=[];if(E.traverse(j=>{j.name.includes("hovering_HAND")&&P.push(j)}),P.sort((j,J)=>j.getWorldPosition(new z).x-J.getWorldPosition(new z).x),P.length!==2)throw new Error(w+": expected two articulated hands");const y=[];P.forEach((j,J)=>{t.hands[J].group.attach(j),j.position.set(0,-.17,0),j.quaternion.identity(),j.scale.setScalar(.68),j.visible=!1;const oe=[];j.traverse(ae=>{if(/base_joint|middle_joint|tip_joint|Opposing_thumb|distal_joint/.test(ae.name)&&oe.push({node:ae,rest:ae.quaternion.clone(),index:/thumb/i.test(ae.name)?4:Number(ae.name.match(/Finger[_ ](\d)/i)?.[1]??0),amount:/middle_joint/.test(ae.name)?.55:/tip_joint/.test(ae.name)?.4:/Opposing_thumb/.test(ae.name)?.25:.32}),ae instanceof xt){ae.castShadow=!0,ae.renderOrder=20;const Ae=(Array.isArray(ae.material)?ae.material:[ae.material]).map(ue=>{const q=ue.clone();return q.transparent=!0,q.depthTest=!0,q.depthWrite=!0,q});ae.material=Array.isArray(ae.material)?Ae:Ae[0]}});for(let ae=0;ae<4;ae++){const Ae=oe.find(se=>se.index===ae&&/base_joint/.test(se.node.name)),ue=oe.find(se=>se.index===ae&&/middle_joint/.test(se.node.name)),q=oe.find(se=>se.index===ae&&/tip_joint/.test(se.node.name));if(Ae&&ue&&q){const se=ue.node.position.y,re=q.node.position.y+.172;for(const[Pe,De]of[[Ae,"base"],[ue,"middle"],[q,"tip"]])Pe.walk={a:se,b:re,segment:De}}}y.push(oe)});const N=[],$=[];E.traverse(j=>{if(j instanceof xt){j.castShadow=!0;const J=oe=>{const ae=new Wa({color:oe.color,emissive:oe.emissive,emissiveIntensity:oe.emissiveIntensity,side:oe.side,gradientMap:r}),Ae=/main.fabric/i.test(oe.name)?0:/dark.lining|trousers/i.test(oe.name)?1:/seam|cuff.trim/i.test(oe.name)?2:-1;return Ae>=0&&$.push({material:ae,original:oe.color.clone(),role:Ae}),ae.name=oe.name,ae};j.material=Array.isArray(j.material)?j.material.map(oe=>J(oe)):J(j.material),j instanceof Kn&&j.name.includes("bodily_hand")&&N.push(j)}});const Z=j=>(j.skeleton.update(),j.computeBoundingBox(),j.boundingBox.getCenter(new z).applyMatrix4(j.matrixWorld));if(N.sort((j,J)=>Z(j).x-Z(J).x),!N[0])throw new Error(w+": ordinary wrist missing");const O=Ip(E,o),X=Lp(E),D=new Zs(E),B={};for(const j of g.animations)B[j.name]=D.clipAction(j);for(const j of["Idle","Walk","Hover"])if(!B[j])throw new Error(w+": missing "+j);B.Idle.play(),E.scale.setScalar(o),E.visible=!1,i.add(E);const ee={model:E,mixer:D,actions:B,hands:P,digits:y,wrist:X.hands[0]??N[0],arms:X,motion:"Idle",lean:0,colors:$,stride:O};x(ee),s.set(w,ee),l===w&&C(w)}const A=new Set;for(const w of["blue-wrap","olive-cape"])S(w).catch(g=>{console.error(g),l===w&&n("Figure failed to load; previous figure remains available. "+g.message)}).finally(()=>A.add(w));function R(...w){const[,g,E,,P,y,,,N]=w,$=i.position.clone().sub(f),Z=b?$.length():0;if(f.copy(i.position),b=!0,p=Ne.lerp(p,Z/Math.max(g,.001),1-Math.exp(-g*10)),t.setTravelMotion(p,c?.stride.phase??w[0]/1e3*1.7%1),t.update(...w),!c)return;T=E&&p>2&&!N&&!P,c.stride.restore();const O=E&&p>.045?"Walk":"Idle";O!==c.motion&&(c.actions[c.motion].fadeOut(.16),c.actions[O].reset().setEffectiveWeight(1).fadeIn(.16).play(),c.motion=O);const X=$.clone().applyAxisAngle(new z(0,1,0),-i.rotation.y);c.actions.Walk.setEffectiveTimeScale(Ne.clamp(p*.6/(2*(N?.28:.44)*o)*2,.3,3.6)),c.stride.restore(),c.mixer.update(g),c.stride.update(g,X,E,!!N,T),c.arms.update(c.stride.phase,c.stride.weight,T,!!P,g);const D=N?Ne.clamp(N.effort,0,1):0;c.lean=Ne.lerp(c.lean,N?-.08-D*.08:T?.09:0,1-Math.exp(-g*10)),c.model.rotation.x=0,c.stride.lean(c.lean),c.digits.forEach((B,ee)=>{const j=t.hands[ee].group,J=j.userData.fingerWalk,oe=new Map;if(J)for(const ae of B.filter(Ae=>Ae.walk?.segment==="base")){const Ae=J.style==="upright",ue=ae.index===1||ae.index===2,q=(1.5-ae.index)*(Ae?.1:.19),se=Ae&&!ue?{base:1.25,middle:1.8}:Ja(ae.walk.a,ae.walk.b,ae.node.position,.68,new z(0,-.17,0),J.contactPose,J.direction,J.steps[ae.index],q,Ae?0:.204);oe.set(ae.index,{...se,splay:q})}for(const ae of B){const Ae=j.userData.fingerGrasps[ae.index]??j.userData.grasp;if(ae.node.quaternion.copy(ae.rest).multiply(new Ge().setFromAxisAngle(new z(1,0,0),Ae*ae.amount)),J&&ae.walk){const ue=oe.get(ae.index),q=new Ge().setFromAxisAngle(new z(1,0,0),ae.walk.segment==="base"?ue.base:ae.walk.segment==="middle"?ue.middle:0);ae.walk.segment==="base"&&q.premultiply(new Ge().setFromAxisAngle(new z(0,0,1),ue.splay)),ae.node.quaternion.slerp(q,J.weight)}else if(J&&ae.index===4){const ue=ae.rest.clone().multiply(new Ge().setFromAxisAngle(new z(1,0,0),.3+J.thumb*.25));/Opposing_thumb|Opposing thumb/.test(ae.node.name)&&ue.multiply(new Ge().setFromAxisAngle(new z(0,0,1),(ee?1:-1)*(.28+J.thumb*.18))),ae.node.quaternion.slerp(ue,J.weight)}}if(J?.weight>.99){j.updateMatrixWorld(!0);const ae=B.filter(ue=>ue.walk?.segment==="tip"),Ae=ae.map(ue=>ue.node.localToWorld(new z(0,.172,0)));Object.assign(i.userData.fingerWalk,J.recordContacts(Ae,j)),j.updateMatrixWorld(!0),Ae.forEach((ue,q)=>ue.copy(ae[q].node.localToWorld(new z(0,.172,0)))),i.userData.fingerWalk.toeHeights=Ae.map(ue=>ue.y),i.userData.fingerWalk.toes=Ae.map(ue=>ue.toArray()),i.userData.fingerWalk.knees=[1,2].map(ue=>oe.get(ue)?.middle),i.userData.fingerWalk.steps=J.steps,i.userData.fingerWalk.thumb=J.thumb,i.userData.fingerWalk.palmNormalY=new z(0,0,1).applyQuaternion(j.quaternion).y}})}return{ready:()=>l==="checkpoint"||A.has(l),root:i,update:R,previewIdle:t.previewIdle,stopIdlePreview:t.stopIdlePreview,settleIdleProps:t.settleIdleProps,setCatchProps:t.setCatchProps,setIdleCatch:t.setIdleCatch,setTravelStyle:t.setTravelStyle,setIdleWalkStyle:t.setIdleWalkStyle,setIdleTerrain:t.setIdleTerrain,setIdleMode:t.setIdleMode,choose:C,setPalette(w){d=w,s.forEach(x)},current:()=>_,locomotion:()=>T?"Run":c?.motion??"procedural",linkEnds(){const w=t.linkEnds();if(c){i.updateMatrixWorld(!0);const g=c.wrist;g instanceof Kn&&g.skeleton.update();const E=new z,P=new z,y=g.geometry.attributes.position.count;for(let N=0;N<y;N++)P.add(g.getVertexPosition(N,E));w.from.copy(g.localToWorld(P.divideScalar(y))),w.to.copy(c.hands[0].localToWorld(new z(0,0,0)))}return w}}}export{$d as G,Gp as W,zp as a,Wp as b,Xp as c,Hp as d,Vp as m,kp as t};
