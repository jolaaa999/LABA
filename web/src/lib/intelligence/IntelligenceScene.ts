import gsap from 'gsap'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  Texture,
  Vector3,
  WebGLRenderer,
} from 'three'

import {
  buildLayout,
  buildLayoutMobile,
  layoutsForViewport,
  resolvePerformanceCounts,
  understandLayout,
  understandLayoutMobile,
} from './layouts'
import type {
  HotspotInfo,
  IntelligenceMode,
  IntelligenceSceneApi,
  IntelligenceSceneOptions,
  NodeLayout,
  PerformanceTier,
} from './types'

const COLOR = {
  snow: new Color('#fcfdfe'),
  frost: new Color('#edf4f8'),
  glacier: new Color('#ddeeff'),
  stream: new Color('#b8deff'),
  aurora: new Color('#79beff'),
  sky: new Color('#4ea5f5'),
  mountain: new Color('#276fae'),
  text: new Color('#10243a'),
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t)
}

function bezierPoint(
  a: Vector3,
  c1: Vector3,
  c2: Vector3,
  b: Vector3,
  t: number,
  out: Vector3,
) {
  const u = 1 - t
  const tt = t * t
  const uu = u * u
  const uuu = uu * u
  const ttt = tt * t
  out.set(
    uuu * a.x + 3 * uu * t * c1.x + 3 * u * tt * c2.x + ttt * b.x,
    uuu * a.y + 3 * uu * t * c1.y + 3 * u * tt * c2.y + ttt * b.y,
    uuu * a.z + 3 * uu * t * c1.z + 3 * u * tt * c2.z + ttt * b.z,
  )
  return out
}

function createSoftPointTexture(): Texture {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  // Bright Aurora/Glacier core — avoid dark electronic centers
  gradient.addColorStop(0, 'rgba(252,253,254,1)')
  gradient.addColorStop(0.18, 'rgba(221,238,255,0.95)')
  gradient.addColorStop(0.42, 'rgba(121,190,255,0.42)')
  gradient.addColorStop(0.72, 'rgba(78,165,245,0.12)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)
  const texture = new Texture(canvas)
  texture.needsUpdate = true
  return texture
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export function createIntelligenceScene(
  options: IntelligenceSceneOptions,
): IntelligenceSceneApi {
  let tier: PerformanceTier = options.tier
  let reducedMotion = options.reducedMotion
  let mode: IntelligenceMode = 'build'
  let morph = 0
  let awaken = reducedMotion ? 1 : 0
  let visible = false
  let documentVisible = typeof document === 'undefined' ? true : !document.hidden
  let width = 1
  let height = 1
  let compact = false
  let viewH = 0.95
  let disposed = false
  let raf = 0
  let lastTime = 0

  const pointer = { x: 0, y: 0, tx: 0, ty: 0, vx: 0, vy: 0 }
  const cameraParallax = { x: 0, y: 0 }
  const counts = () => resolvePerformanceCounts(tier)

  let container: HTMLElement | null = null
  let renderer: WebGLRenderer | null = null
  let scene: Scene | null = null
  let camera: OrthographicCamera | null = null
  let root: Group | null = null
  let primaryPoints: Points | null = null
  let secondaryPoints: Points | null = null
  let ambientPoints: Points | null = null
  let edgeLines: LineSegments | null = null
  let verticalLines: LineSegments | null = null
  let hazePoints: Points | null = null

  let nodePositions: Float32Array | null = null
  let nodeColors: Float32Array | null = null
  let nodeVel: Float32Array | null = null
  let primaryPos: Float32Array | null = null
  let primaryCol: Float32Array | null = null
  let secondaryPos: Float32Array | null = null
  let secondaryCol: Float32Array | null = null
  let ambientPositions: Float32Array | null = null
  let ambientBase: Float32Array | null = null
  let edgePositions: Float32Array | null = null
  let edgeColors: Float32Array | null = null
  let verticalPositions: Float32Array | null = null

  let pointTexture: Texture | null = null
  let modeTween: gsap.core.Tween | null = null
  let awakenTween: gsap.core.Tween | null = null
  let pulseT = 0
  let focusedHotspot: string | null = null
  let focusScale = 1
  let targetFocusScale = 1
  const focusOffset = { x: 0, y: 0, z: 0 }
  const targetFocusOffset = { x: 0, y: 0, z: 0 }
  let rotationX = -0.08
  let rotationY = -0.18

  const nodeOrder = buildLayout.nodes.map((n) => n.id)
  const edgeOrder = buildLayout.edges.map((e) => e.id)
  const primaryIds = nodeOrder.filter(
    (id) => buildLayout.nodes.find((n) => n.id === id)?.role === 'primary',
  )
  const secondaryIds = nodeOrder.filter(
    (id) => buildLayout.nodes.find((n) => n.id === id)?.role === 'secondary',
  )

  function activeBuild() {
    return compact ? buildLayoutMobile : buildLayout
  }

  function activeUnderstand() {
    return compact ? understandLayoutMobile : understandLayout
  }

  let buildById = new Map(buildLayout.nodes.map((n) => [n.id, n]))
  let understandById = new Map(understandLayout.nodes.map((n) => [n.id, n]))
  let buildEdges = new Map(buildLayout.edges.map((e) => [e.id, e]))
  let understandEdges = new Map(understandLayout.edges.map((e) => [e.id, e]))

  function syncLayoutMaps() {
    const b = activeBuild()
    const u = activeUnderstand()
    buildById = new Map(b.nodes.map((n) => [n.id, n]))
    understandById = new Map(u.nodes.map((n) => [n.id, n]))
    buildEdges = new Map(b.edges.map((e) => [e.id, e]))
    understandEdges = new Map(u.edges.map((e) => [e.id, e]))
  }

  const tmpA = new Vector3()
  const tmpB = new Vector3()
  const tmpC1 = new Vector3()
  const tmpC2 = new Vector3()
  const tmpP = new Vector3()
  const world = new Vector3()
  const colorA = new Color()
  const colorB = new Color()
  const colorMix = new Color()

  function layoutAt(id: string, t: number): NodeLayout {
    const a = buildById.get(id)!
    const b = understandById.get(id)!
    return {
      id,
      role: a.role,
      position: {
        x: lerp(a.position.x, b.position.x, t),
        y: lerp(a.position.y, b.position.y, t),
        z: lerp(a.position.z, b.position.z, t),
      },
      scale: lerp(a.scale, b.scale, t),
      opacity: lerp(a.opacity, b.opacity, t),
      label: t < 0.5 ? a.label : b.label,
      hotspot: t < 0.5 ? a.hotspot : b.hotspot,
      microcopy: t < 0.5 ? a.microcopy : b.microcopy,
    }
  }

  function currentHotspots(): HotspotInfo[] {
    const source = morph < 0.5 ? activeBuild() : activeUnderstand()
    const m: IntelligenceMode = morph < 0.5 ? 'build' : 'understand'
    return source.nodes
      .filter((n) => n.label && (n.hotspot || n.role === 'secondary'))
      .map((n) => ({
        id: n.id,
        label: n.label!,
        microcopy: n.microcopy!,
        mode: m,
      }))
  }

  function getPrimaryLabels(forMode: IntelligenceMode): HotspotInfo[] {
    const source = forMode === 'build' ? activeBuild() : activeUnderstand()
    return source.nodes
      .filter((n) => n.label)
      .map((n) => ({
        id: n.id,
        label: n.label!,
        microcopy: n.microcopy ?? '',
        mode: forMode,
      }))
  }

  function maxDpr() {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    if (tier === 'reduced') return Math.min(dpr, 1.15)
    if (tier === 'balanced') return Math.min(dpr, 1.35)
    return Math.min(dpr, 1.5)
  }

  function shouldLoop() {
    return (
      !disposed &&
      visible &&
      documentVisible &&
      !!renderer &&
      (!reducedMotion || modeTween !== null)
    )
  }

  function ensureLoop() {
    if (!shouldLoop() || raf) return
    lastTime = performance.now()
    raf = requestAnimationFrame(tick)
  }

  function stopLoop() {
    if (!raf) return
    cancelAnimationFrame(raf)
    raf = 0
  }

  function onVisibility() {
    documentVisible = !document.hidden
    if (documentVisible) ensureLoop()
    else stopLoop()
  }

  function onContextLost(event: Event) {
    event.preventDefault()
    stopLoop()
    options.onError?.(new Error('WebGL context lost'))
  }

  function onContextRestored() {
    // Prefer stable fallback over complex recovery.
    options.onError?.(new Error('WebGL context restored — using fallback'))
  }

  function buildGeometries() {
    if (!scene || !root) return

    const { ambient } = counts()
    const nodeCount = nodeOrder.length

    nodePositions = new Float32Array(nodeCount * 3)
    nodeColors = new Float32Array(nodeCount * 3)
    nodeVel = new Float32Array(nodeCount * 3)

    primaryPos = new Float32Array(primaryIds.length * 3)
    primaryCol = new Float32Array(primaryIds.length * 3)
    secondaryPos = new Float32Array(secondaryIds.length * 3)
    secondaryCol = new Float32Array(secondaryIds.length * 3)

    pointTexture = createSoftPointTexture()

    const primaryGeo = new BufferGeometry()
    primaryGeo.setAttribute('position', new BufferAttribute(primaryPos, 3))
    primaryGeo.setAttribute('color', new BufferAttribute(primaryCol, 3))
    primaryPoints = new Points(
      primaryGeo,
      new PointsMaterial({
        map: pointTexture,
        size: tier === 'reduced' ? 34 : compact ? 46 : 52,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    root.add(primaryPoints)

    const secondaryGeo = new BufferGeometry()
    secondaryGeo.setAttribute('position', new BufferAttribute(secondaryPos, 3))
    secondaryGeo.setAttribute('color', new BufferAttribute(secondaryCol, 3))
    secondaryPoints = new Points(
      secondaryGeo,
      new PointsMaterial({
        map: pointTexture,
        size: tier === 'reduced' ? 16 : compact ? 20 : 22,
        sizeAttenuation: false,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    root.add(secondaryPoints)

    ambientPositions = new Float32Array(ambient * 3)
    ambientBase = new Float32Array(ambient * 3)
    for (let i = 0; i < ambient; i++) {
      // Most in field; a few outliers expand spatial boundary
      const outlier = i % 7 === 0
      const spreadX = outlier ? 1.35 : 1.05
      const spreadY = outlier ? 0.72 : 0.5
      const x = (Math.random() * 2 - 1) * spreadX
      const y = (Math.random() * 2 - 1) * spreadY
      const z = -0.42 - Math.random() * 0.28
      ambientBase[i * 3] = x
      ambientBase[i * 3 + 1] = y
      ambientBase[i * 3 + 2] = z
      ambientPositions[i * 3] = x
      ambientPositions[i * 3 + 1] = y
      ambientPositions[i * 3 + 2] = z
    }
    const ambGeo = new BufferGeometry()
    ambGeo.setAttribute('position', new BufferAttribute(ambientPositions, 3))
    ambientPoints = new Points(
      ambGeo,
      new PointsMaterial({
        map: pointTexture,
        color: COLOR.stream,
        size: compact ? 4.5 : 5.5,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    root.add(ambientPoints)

    const hazeCount = tier === 'reduced' ? 10 : 20
    const hazePos = new Float32Array(hazeCount * 3)
    for (let i = 0; i < hazeCount; i++) {
      hazePos[i * 3] = (Math.random() * 2 - 1) * 1.15
      hazePos[i * 3 + 1] = (Math.random() * 2 - 1) * 0.48
      hazePos[i * 3 + 2] = -0.55 - Math.random() * 0.25
    }
    const hazeGeo = new BufferGeometry()
    hazeGeo.setAttribute('position', new BufferAttribute(hazePos, 3))
    hazePoints = new Points(
      hazeGeo,
      new PointsMaterial({
        map: pointTexture,
        color: COLOR.glacier,
        size: tier === 'reduced' ? 48 : 64,
        sizeAttenuation: false,
        transparent: true,
        opacity: 0.055,
        depthWrite: false,
      }),
    )
    root.add(hazePoints)

    for (let i = 0; i < nodeOrder.length; i++) {
      const layout = layoutAt(nodeOrder[i]!, 0)
      nodePositions[i * 3] = layout.position.x
      nodePositions[i * 3 + 1] = layout.position.y
      nodePositions[i * 3 + 2] = layout.position.z
    }

    const segs = counts().curveSegments
    const maxVerts = edgeOrder.length * (segs + 1) * 2
    edgePositions = new Float32Array(maxVerts * 3)
    edgeColors = new Float32Array(maxVerts * 3)
    const edgeGeo = new BufferGeometry()
    edgeGeo.setAttribute('position', new BufferAttribute(edgePositions, 3))
    edgeGeo.setAttribute('color', new BufferAttribute(edgeColors, 3))
    edgeLines = new LineSegments(
      edgeGeo,
      new LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    root.add(edgeLines)

    verticalPositions = new Float32Array(secondaryIds.length * 6)
    const verticalGeo = new BufferGeometry()
    verticalGeo.setAttribute('position', new BufferAttribute(verticalPositions, 3))
    verticalLines = new LineSegments(
      verticalGeo,
      new LineBasicMaterial({
        color: COLOR.aurora,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    root.add(verticalLines)
  }

  function updateVerticalLines() {
    if (!verticalPositions || !verticalLines || !nodePositions) return
    for (let i = 0; i < secondaryIds.length; i++) {
      const nodeIndex = nodeOrder.indexOf(secondaryIds[i]!)
      const source = nodeIndex * 3
      const target = i * 6
      const phase = (pulseT * 0.22 + i * 0.13) % 1
      const length = 0.18 + phase * 0.72
      verticalPositions[target] = nodePositions[source]!
      verticalPositions[target + 1] = nodePositions[source + 1]!
      verticalPositions[target + 2] = nodePositions[source + 2]!
      verticalPositions[target + 3] = nodePositions[source]!
      verticalPositions[target + 4] = nodePositions[source + 1]!
      verticalPositions[target + 5] = nodePositions[source + 2]! - length
    }
    ;(verticalLines.geometry.getAttribute('position') as BufferAttribute).needsUpdate = true
    ;(verticalLines.material as LineBasicMaterial).opacity = 0.08 + awaken * 0.2
  }

  function updateEdges() {
    if (!edgePositions || !edgeColors || !edgeLines || !nodePositions) return
    const segs = counts().curveSegments
    let cursor = 0
    const t = smoothstep(morph)
    const awakenFade = awaken
    const morphQuiet = Math.sin(morph * Math.PI)

    for (const id of edgeOrder) {
      const be = buildEdges.get(id)!
      const ue = understandEdges.get(id)!
      const fromIdx = nodeOrder.indexOf(be.from)
      const toIdx = nodeOrder.indexOf(be.to)
      if (fromIdx < 0 || toIdx < 0) continue

      tmpA.set(
        nodePositions[fromIdx * 3]!,
        nodePositions[fromIdx * 3 + 1]!,
        nodePositions[fromIdx * 3 + 2]!,
      )
      tmpB.set(
        nodePositions[toIdx * 3]!,
        nodePositions[toIdx * 3 + 1]!,
        nodePositions[toIdx * 3 + 2]!,
      )

      const curved = t < 0.5 ? be.curved : ue.curved
      const kind = t < 0.5 ? be.kind : ue.kind
      const hierarchy = t < 0.5 ? be.hierarchy : ue.hierarchy
      const weight = lerp(be.weight, ue.weight, t)
      let opacity = lerp(be.opacity, ue.opacity, t) * awakenFade

      // Quiet secondary/ambient during morph to avoid spaghetti snaps
      if (hierarchy === 'ambient') opacity *= 1 - morphQuiet * 0.65
      else if (hierarchy === 'secondary') opacity *= 1 - morphQuiet * 0.3

      const stagedReveal = Math.max(0.16, Math.min(1, (pulseT * 0.38 - edgeOrder.indexOf(id) * 0.025 + 1.15) % 1.15))
      opacity *= 0.35 + stagedReveal * 0.65
      const hierarchyMul =
        hierarchy === 'primary' ? 1 : hierarchy === 'secondary' ? 0.55 : 0.28
      opacity *= hierarchyMul * (0.65 + weight * 0.35)

      const midX = (tmpA.x + tmpB.x) * 0.5
      const midY = (tmpA.y + tmpB.y) * 0.5
      const bow = midY >= 0 ? 1 : -1
      const liftBase =
        hierarchy === 'primary'
          ? kind === 'attention'
            ? 0.16
            : 0.05
          : kind === 'attention'
            ? 0.1
            : 0.04
      const side =
        hierarchy === 'primary' ? 0.03 : hierarchy === 'secondary' ? 0.07 : 0.05
      // Interpolate control points gently with morph to reduce jumps
      const lift = liftBase * bow * (0.85 + (1 - morphQuiet) * 0.15)

      tmpC1.set(
        lerp(tmpA.x, midX, 0.38) + (curved ? -side * bow : 0),
        lerp(tmpA.y, midY, 0.38) + (curved ? lift : 0),
        lerp(tmpA.z, tmpB.z, 0.35),
      )
      tmpC2.set(
        lerp(midX, tmpB.x, 0.62) + (curved ? side * bow * 0.5 : 0),
        lerp(midY, tmpB.y, 0.62) + (curved ? lift * 0.75 : 0),
        lerp(tmpA.z, tmpB.z, 0.65),
      )

      // Same family blues — weight via brightness only; primary stays luminous
      if (hierarchy === 'primary') {
        colorA.copy(COLOR.aurora).lerp(COLOR.sky, 0.25)
        colorB.copy(COLOR.stream).lerp(COLOR.glacier, 0.35)
      } else if (hierarchy === 'secondary') {
        colorA.copy(COLOR.stream).lerp(COLOR.glacier, 0.4)
        colorB.copy(COLOR.glacier).lerp(COLOR.frost, 0.3)
      } else {
        colorA.copy(COLOR.glacier).lerp(COLOR.frost, 0.5)
        colorB.copy(COLOR.frost)
      }

      for (let s = 0; s < segs; s++) {
        const t0 = s / segs
        const t1 = (s + 1) / segs
        if (curved) bezierPoint(tmpA, tmpC1, tmpC2, tmpB, t0, tmpP)
        else tmpP.lerpVectors(tmpA, tmpB, t0)
        edgePositions[cursor * 3] = tmpP.x
        edgePositions[cursor * 3 + 1] = tmpP.y
        edgePositions[cursor * 3 + 2] = tmpP.z
        colorMix.copy(colorA).lerp(colorB, t0)
        const radialPulse = Math.max(0.15, 1 - Math.abs(t0 - ((pulseT * 0.22 + edgeOrder.indexOf(id) * 0.037) % 1)) * 2.8)
        const gain =
          hierarchy === 'primary'
            ? 0.45 + opacity * 0.7
            : hierarchy === 'secondary'
              ? 0.22 + opacity * 0.55
              : (0.12 + opacity * 0.4) * radialPulse
        edgeColors[cursor * 3] = colorMix.r * gain
        edgeColors[cursor * 3 + 1] = colorMix.g * gain
        edgeColors[cursor * 3 + 2] = colorMix.b * gain
        cursor++

        if (curved) bezierPoint(tmpA, tmpC1, tmpC2, tmpB, t1, tmpP)
        else tmpP.lerpVectors(tmpA, tmpB, t1)
        edgePositions[cursor * 3] = tmpP.x
        edgePositions[cursor * 3 + 1] = tmpP.y
        edgePositions[cursor * 3 + 2] = tmpP.z
        colorMix.copy(colorA).lerp(colorB, t1)
        edgeColors[cursor * 3] = colorMix.r * gain
        edgeColors[cursor * 3 + 1] = colorMix.g * gain
        edgeColors[cursor * 3 + 2] = colorMix.b * gain
        cursor++
      }
    }

    const geo = edgeLines.geometry as BufferGeometry
    ;(geo.getAttribute('position') as BufferAttribute).needsUpdate = true
    ;(geo.getAttribute('color') as BufferAttribute).needsUpdate = true
    geo.setDrawRange(0, cursor)
    ;(edgeLines.material as LineBasicMaterial).opacity = 0.5 + awaken * 0.35
  }

  function updateNodes(dt: number) {
    if (
      !nodePositions ||
      !nodeColors ||
      !nodeVel ||
      !primaryPos ||
      !primaryCol ||
      !secondaryPos ||
      !secondaryCol ||
      !primaryPoints ||
      !secondaryPoints
    ) {
      return
    }
    const t = smoothstep(morph)
    const { secondaryVisible, idleStrength } = counts()
    let secondaryShown = 0
    let pIdx = 0
    let sIdx = 0

    pointer.x = lerp(pointer.x, pointer.tx, reducedMotion ? 1 : 0.08)
    pointer.y = lerp(pointer.y, pointer.ty, reducedMotion ? 1 : 0.08)

    for (let i = 0; i < nodeOrder.length; i++) {
      const id = nodeOrder[i]!
      const layout = layoutAt(id, t)
      const isSecondary = layout.role === 'secondary'
      let hide = false
      if (isSecondary) {
        secondaryShown++
        if (secondaryShown > secondaryVisible) hide = true
      }

      const targetX = layout.position.x
      const targetY = layout.position.y
      const targetZ = layout.position.z
      // Depth layer: foreground responds more to pointer (~1–4px visual)
      const depthT = Math.max(0, Math.min(1, (targetZ + 0.35) / 0.75))

      let ox = 0
      let oy = 0
      if (!reducedMotion && !hide) {
        const layerPx = 0.003 + depthT * 0.009
        ox += pointer.x * layerPx
        oy += pointer.y * layerPx * 0.7

        const dx = targetX - pointer.x * 0.7
        const dy = targetY - pointer.y * 0.45
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001
        const influence = Math.max(0, 1 - dist / 0.62) * (0.018 + depthT * 0.012)
        ox += dx * influence
        oy += dy * influence
        const breath =
          Math.sin(pulseT * 0.55 + i * 0.9) * 0.004 * idleStrength * awaken * depthT
        ox += breath
        oy += Math.cos(pulseT * 0.45 + i) * 0.003 * idleStrength * awaken
      }

      const px = targetX + ox
      const py = targetY + oy
      const pz = targetZ
      const ix = i * 3

      if (reducedMotion || hide) {
        nodePositions[ix] = px
        nodePositions[ix + 1] = py
        nodePositions[ix + 2] = pz
      } else {
        const forceX = (px - nodePositions[ix]!) * 7.5
        const forceY = (py - nodePositions[ix + 1]!) * 7.5
        const forceZ = (pz - nodePositions[ix + 2]!) * 7.5
        nodeVel[ix] = (nodeVel[ix]! + forceX * dt) * 0.88
        nodeVel[ix + 1] = (nodeVel[ix + 1]! + forceY * dt) * 0.88
        nodeVel[ix + 2] = (nodeVel[ix + 2]! + forceZ * dt) * 0.88
        nodePositions[ix] += nodeVel[ix]! * dt
        nodePositions[ix + 1] += nodeVel[ix + 1]! * dt
        nodePositions[ix + 2] += nodeVel[ix + 2]! * dt
      }

      const hot = focusedHotspot === id
      // Soft luminous Aurora/Glacier — no dark electronic core
      colorA.copy(COLOR.snow).lerp(COLOR.glacier, 0.35)
      colorB.copy(COLOR.aurora).lerp(COLOR.stream, hot ? 0.15 : 0.35)
      colorMix.copy(colorA).lerp(colorB, layout.role === 'primary' ? 0.55 : 0.35)
      if (hot) colorMix.lerp(COLOR.sky, 0.12)
      // Keep RGB high so additive sprites stay luminous, not charcoal
      colorMix.lerp(COLOR.snow, 0.22)
      const depthFade = 0.62 + depthT * 0.38
      const alpha = hide ? 0 : layout.opacity * awaken * depthFade * (hot ? 1 : 0.9)
      const twinkle = 0.82 + Math.sin(pulseT * (1.9 + (i % 4) * 0.27) + i * 1.7) * 0.18
      nodeColors[ix] = Math.min(1, colorMix.r * (0.85 + alpha * 0.35) * twinkle)
      nodeColors[ix + 1] = Math.min(1, colorMix.g * (0.85 + alpha * 0.35) * twinkle)
      nodeColors[ix + 2] = Math.min(1, colorMix.b * (0.85 + alpha * 0.35) * twinkle)

      if (layout.role === 'primary') {
        const pi = pIdx * 3
        primaryPos[pi] = nodePositions[ix]!
        primaryPos[pi + 1] = nodePositions[ix + 1]!
        primaryPos[pi + 2] = nodePositions[ix + 2]!
        primaryCol[pi] = nodeColors[ix]!
        primaryCol[pi + 1] = nodeColors[ix + 1]!
        primaryCol[pi + 2] = nodeColors[ix + 2]!
        pIdx++
      } else {
        const si = sIdx * 3
        secondaryPos[si] = nodePositions[ix]!
        secondaryPos[si + 1] = nodePositions[ix + 1]!
        secondaryPos[si + 2] = nodePositions[ix + 2]!
        secondaryCol[si] = nodeColors[ix]!
        secondaryCol[si + 1] = nodeColors[ix + 1]!
        secondaryCol[si + 2] = nodeColors[ix + 2]!
        sIdx++
      }
    }

    if (!reducedMotion && morph < 0.45 && awaken > 0.7) {
      pulseT += dt
    } else if (!reducedMotion) {
      pulseT += dt * 0.35
    }

    const pGeo = primaryPoints.geometry as BufferGeometry
    ;(pGeo.getAttribute('position') as BufferAttribute).needsUpdate = true
    ;(pGeo.getAttribute('color') as BufferAttribute).needsUpdate = true
    const sGeo = secondaryPoints.geometry as BufferGeometry
    ;(sGeo.getAttribute('position') as BufferAttribute).needsUpdate = true
    ;(sGeo.getAttribute('color') as BufferAttribute).needsUpdate = true
    ;(primaryPoints.material as PointsMaterial).opacity = 0.7 + awaken * 0.28
    ;(primaryPoints.material as PointsMaterial).size = tier === 'reduced' ? 34 : compact ? 46 : 52
    ;(secondaryPoints.material as PointsMaterial).opacity = 0.32 + awaken * 0.36
    ;(secondaryPoints.material as PointsMaterial).size = tier === 'reduced' ? 16 : compact ? 20 : 22
  }

  function updateAmbient(dt: number) {
    if (!ambientPositions || !ambientBase || !ambientPoints) return
    const { idleStrength } = counts()
    const n = ambientBase.length / 3
    for (let i = 0; i < n; i++) {
      const ix = i * 3
      if (reducedMotion) {
        ambientPositions[ix] = ambientBase[ix]!
        ambientPositions[ix + 1] = ambientBase[ix + 1]!
        ambientPositions[ix + 2] = ambientBase[ix + 2]!
        continue
      }
      const drift = pulseT * (0.04 + (i % 5) * 0.008) * idleStrength
      // Background layer — weaker parallax than foreground nodes
      ambientPositions[ix] =
        ambientBase[ix]! + Math.sin(drift + i) * 0.015 + pointer.x * 0.004
      ambientPositions[ix + 1] =
        ambientBase[ix + 1]! + Math.cos(drift * 0.8 + i) * 0.012 + pointer.y * 0.003
      ambientPositions[ix + 2] = ambientBase[ix + 2]!
    }
    ;(ambientPoints.geometry.getAttribute('position') as BufferAttribute).needsUpdate =
      true
    ;(ambientPoints.material as PointsMaterial).opacity = 0.08 + awaken * 0.18
    void dt
  }

  function updateCamera() {
    if (!camera || !root) return
    focusScale = lerp(focusScale, targetFocusScale, reducedMotion ? 1 : 0.075)
    focusOffset.x = lerp(focusOffset.x, targetFocusOffset.x, reducedMotion ? 1 : 0.075)
    focusOffset.y = lerp(focusOffset.y, targetFocusOffset.y, reducedMotion ? 1 : 0.075)
    focusOffset.z = lerp(focusOffset.z, targetFocusOffset.z, reducedMotion ? 1 : 0.075)
    root.position.set(focusOffset.x, focusOffset.y, focusOffset.z)
    root.rotation.x = rotationX
    root.rotation.y = rotationY
    if (reducedMotion) {
      camera.position.x = 0
      camera.position.y = 0
      return
    }
    // Extremely subtle framing shift only — no orbit / tilt
    cameraParallax.x = lerp(cameraParallax.x, pointer.x * 0.012, 0.05)
    cameraParallax.y = lerp(cameraParallax.y, pointer.y * 0.008, 0.05)
    const modeShift = (morph - 0.5) * 0.018
    camera.position.x = cameraParallax.x + modeShift
    camera.position.y = cameraParallax.y
  }

  function renderFrame(dt: number) {
    if (!renderer || !scene || !camera) return
    updateNodes(dt)
    updateEdges()
    updateVerticalLines()
    updateAmbient(dt)
    updateCamera()
    renderer.render(scene, camera)
  }

  function tick(now: number) {
    raf = 0
    if (!shouldLoop()) return
    const dt = Math.min(0.033, (now - lastTime) / 1000)
    lastTime = now
    renderFrame(dt)
    if (shouldLoop()) raf = requestAnimationFrame(tick)
  }

  function applySize(w: number, h: number) {
    width = Math.max(1, w)
    height = Math.max(1, h)
    const next = layoutsForViewport(width)
    compact = next.compact
    syncLayoutMaps()
    // Aggressive framing: field fills ~60–75% width without CSS scale
    const aspect = width / height
    if (compact) {
      viewH = aspect > 1.1 ? 0.68 : 0.74
    } else if (width < 1100) {
      viewH = 0.78
    } else {
      viewH = aspect > 2.0 ? 0.72 : 0.78
    }
    if (!renderer || !camera) return
    renderer.setPixelRatio(maxDpr())
    renderer.setSize(width, height, false)
    const animatedViewW = viewH * aspect * focusScale
    camera.left = -animatedViewW
    camera.right = animatedViewW
    camera.top = viewH * focusScale
    camera.bottom = -viewH * focusScale
    camera.updateProjectionMatrix()
  }

  function mount(target: HTMLElement) {
    if (disposed) return
    if (!detectWebGL()) {
      options.onError?.(new Error('WebGL unavailable'))
      return
    }

    container = target
    scene = new Scene()
    scene.background = null

    camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    camera.position.set(0, 0, 3)
    camera.lookAt(0, 0, 0)

    root = new Group()
    scene.add(root)

    try {
      renderer = new WebGLRenderer({
        antialias: tier !== 'reduced',
        alpha: true,
        powerPreference: 'high-performance',
      })
    } catch (err) {
      options.onError?.(err instanceof Error ? err : new Error(String(err)))
      return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    renderer.domElement.addEventListener('webglcontextlost', onContextLost, false)
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false)
    document.addEventListener('visibilitychange', onVisibility)

    buildGeometries()
    applySize(container.clientWidth, container.clientHeight)
    renderFrame(0.016)
    options.onReady?.()

    if (!reducedMotion) {
      awakenTween?.kill()
      awakenTween = gsap.to(
        { v: awaken },
        {
          v: 1,
          duration: 0.9,
          ease: 'power2.out',
          onUpdate() {
            awaken = (this.targets()[0] as { v: number }).v
            if (!raf) renderFrame(0.016)
          },
          onComplete() {
            awakenTween = null
            ensureLoop()
          },
        },
      )
    } else {
      awaken = 1
      renderFrame(0)
    }
  }

  function setMode(next: IntelligenceMode) {
    if (disposed || next === mode) return
    mode = next
    const target = next === 'understand' ? 1 : 0
    modeTween?.kill()

    if (reducedMotion) {
      morph = target
      modeTween = null
      renderFrame(0)
      options.onHotspotChange?.(null)
      return
    }

    modeTween = gsap.to(
      { v: morph },
      {
        v: target,
        duration: 0.9,
        ease: 'power2.inOut',
        overwrite: true,
        onUpdate() {
          morph = (this.targets()[0] as { v: number }).v
          ensureLoop()
        },
        onComplete() {
          morph = target
          modeTween = null
        },
      },
    )
    options.onHotspotChange?.(null)
    ensureLoop()
  }

  function setPointer(nx: number, ny: number) {
    pointer.tx = Math.max(-1, Math.min(1, nx))
    pointer.ty = Math.max(-1, Math.min(1, ny))
    if (!reducedMotion) ensureLoop()

    if (!reducedMotion) ensureLoop()
  }

  function selectAt(nx: number, ny: number) {
    if (!nodePositions || !camera || !root) return
    let best: HotspotInfo | null = null
    let bestDist = 0.095
    for (const candidate of currentHotspots()) {
      const projected = projectNode(candidate.id)
      if (!projected) continue
      const px = (projected.x / width) * 2 - 1
      const py = -((projected.y / height) * 2 - 1)
      const distance = Math.hypot(px - nx, py - ny)
      if (distance < bestDist) {
        bestDist = distance
        best = candidate
      }
    }
    focusedHotspot = best?.id ?? null
    targetFocusScale = best ? (best.id === 'research' || best.id === 'agent' ? 0.72 : 0.42) : 1
    if (best) {
      const idx = nodeOrder.indexOf(best.id)
      targetFocusOffset.x = -(nodePositions[idx * 3] ?? 0)
      targetFocusOffset.y = -(nodePositions[idx * 3 + 1] ?? 0)
      targetFocusOffset.z = 0
    } else {
      targetFocusOffset.x = 0
      targetFocusOffset.y = 0
      targetFocusOffset.z = 0
    }
    options.onHotspotChange?.(best)
    ensureLoop()
  }

  function clearSelection() {
    focusedHotspot = null
    targetFocusScale = 1
    targetFocusOffset.x = 0
    targetFocusOffset.y = 0
    targetFocusOffset.z = 0
    options.onHotspotChange?.(null)
    ensureLoop()
  }

  function rotateBy(dx: number, dy: number) {
    if (reducedMotion) return
    rotationY += dx * 1.25
    rotationX = Math.max(-0.65, Math.min(0.65, rotationX + dy * 0.85))
    ensureLoop()
  }

  function setVisible(v: boolean) {
    visible = v
    if (v) ensureLoop()
    else stopLoop()
  }

  function setAwake(awake: boolean) {
    if (reducedMotion) {
      awaken = 1
      return
    }
    awakenTween?.kill()
    awakenTween = gsap.to(
      { v: awaken },
      {
        v: awake ? 1 : 0.25,
        duration: awake ? 0.85 : 0.4,
        ease: 'power2.out',
        onUpdate() {
          awaken = (this.targets()[0] as { v: number }).v
          if (!raf) renderFrame(0.016)
        },
        onComplete() {
          awakenTween = null
        },
      },
    )
    if (awake) ensureLoop()
  }

  function setReducedMotion(value: boolean) {
    reducedMotion = value
    if (value) {
      modeTween?.kill()
      awakenTween?.kill()
      modeTween = null
      awakenTween = null
      awaken = 1
      morph = mode === 'understand' ? 1 : 0
      stopLoop()
      renderFrame(0)
    } else {
      ensureLoop()
    }
  }

  function resize(w: number, h: number) {
    applySize(w, h)
    if (!raf) renderFrame(0)
  }

  function renderOnce() {
    renderFrame(0)
  }

  function projectNode(id: string) {
    if (!camera || !renderer || !nodePositions) return null
    const idx = nodeOrder.indexOf(id)
    if (idx < 0) return null
    world.set(
      nodePositions[idx * 3]!,
      nodePositions[idx * 3 + 1]!,
      nodePositions[idx * 3 + 2]!,
    )
    root?.updateMatrixWorld()
    camera.updateMatrixWorld()
    root?.localToWorld(world)
    world.project(camera)
    return {
      x: (world.x * 0.5 + 0.5) * width,
      y: (-world.y * 0.5 + 0.5) * height,
    }
  }

  function dispose() {
    if (disposed) return
    disposed = true
    stopLoop()
    modeTween?.kill()
    awakenTween?.kill()
    modeTween = null
    awakenTween = null
    document.removeEventListener('visibilitychange', onVisibility)

    if (renderer) {
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored)
      renderer.dispose()
      renderer.domElement.remove()
    }

    const disposeObj = (obj: Points | LineSegments | null) => {
      if (!obj) return
      obj.geometry.dispose()
      const mat = obj.material
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else mat.dispose()
    }
    disposeObj(primaryPoints)
    disposeObj(secondaryPoints)
    disposeObj(ambientPoints)
    disposeObj(edgeLines)
    disposeObj(verticalLines)
    disposeObj(hazePoints)
    pointTexture?.dispose()
    pointTexture = null

    primaryPoints = null
    secondaryPoints = null
    ambientPoints = null
    edgeLines = null
    verticalLines = null
    hazePoints = null
    scene = null
    camera = null
    root = null
    renderer = null
    container = null
  }

  return {
    mount,
    setMode,
    setPointer,
    selectAt,
    rotateBy,
    clearSelection,
    setVisible,
    setAwake,
    setReducedMotion,
    resize,
    renderOnce,
    dispose,
    getMode: () => mode,
    projectNode,
    getPrimaryLabels,
  }
}

export function resolvePerformanceTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'balanced'
  const w = window.innerWidth
  const dpr = window.devicePixelRatio || 1
  const cores = navigator.hardwareConcurrency || 4
  if (w < 720 || dpr >= 2.5 || cores <= 4) return 'reduced'
  if (w < 1100 || dpr >= 2 || cores <= 6) return 'balanced'
  return 'high'
}
