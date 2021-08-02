import { h, defineComponent, App } from '@vue/runtime-core'
import TroisCanvas from './TroisCanvas'
import Gltf from './Gltf'
import { Trois } from '../types'

const createComponent = (tag: string) =>
    defineComponent({
        inheritAttrs: false,
        name: tag,
        render() {
            return h(tag, this.$attrs, this.$slots?.default?.() || [])
        }
    })

const autoGeneratedComponents = [

    'mesh',
    'instancedMesh',
    'scene',
    'sprite',

    // geometry
    'instancedBufferGeometry',
    'bufferGeometry',
    'boxBufferGeometry',
    'circleBufferGeometry',
    'coneBufferGeometry',
    'cylinderBufferGeometry',
    'dodecahedronBufferGeometry',
    'extrudeBufferGeometry',
    'icosahedronBufferGeometry',
    'latheBufferGeometry',
    'octahedronBufferGeometry',
    'parametricBufferGeometry',
    'planeBufferGeometry',
    'polyhedronBufferGeometry',
    'ringBufferGeometry',
    'shapeBufferGeometry',
    'sphereBufferGeometry',
    'tetrahedronBufferGeometry',
    'textBufferGeometry',
    'torusBufferGeometry',
    'torusKnotBufferGeometry',
    'tubeBufferGeometry',
    'wireframeGeometry',
    'parametricGeometry',
    'tetrahedronGeometry',
    'octahedronGeometry',
    'icosahedronGeometry',
    'dodecahedronGeometry',
    'polyhedronGeometry',
    'tubeGeometry',
    'torusKnotGeometry',
    'torusGeometry',
    'textGeometry',
    'sphereGeometry',
    'ringGeometry',
    'planeGeometry',
    'latheGeometry',
    'shapeGeometry',
    'extrudeGeometry',
    'edgesGeometry',
    'coneGeometry',
    'cylinderGeometry',
    'circleGeometry',
    'boxGeometry',

    // materials
    'material',
    'shadowMaterial',
    'spriteMaterial',
    'rawShaderMaterial',
    'shaderMaterial',
    'pointsMaterial',
    'meshPhysicalMaterial',
    'meshStandardMaterial',
    'meshPhongMaterial',
    'meshToonMaterial',
    'meshNormalMaterial',
    'meshLambertMaterial',
    'meshDepthMaterial',
    'meshDistanceMaterial',
    'meshBasicMaterial',
    'meshMatcapMaterial',
    'lineDashedMaterial',
    'lineBasicMaterial',

    // lights
    'light',
    'spotLightShadow',
    'spotLight',
    'pointLight',
    'rectAreaLight',
    'hemisphereLight',
    'directionalLightShadow',
    'directionalLight',
    'ambientLight',
    'lightShadow',
    'ambientLightProbe',
    'hemisphereLightProbe',
    'lightProbe',

    // textures
    'texture',
    'videoTexture',
    'dataTexture',
    'dataTexture3D',
    'compressedTexture',
    'cubeTexture',
    'canvasTexture',
    'depthTexture',

    // misc
    'group',
    'catmullRomCurve3',
    'points',

    // helpers
    'cameraHelper',

    // cameras
    'camera',
    'perspectiveCamera',
    'orthographicCamera',
    'cubeCamera',
    'arrayCamera',


].map(createComponent).reduce((acc, curr) => {
    ; (acc as any)[curr.name] = curr
    return acc
}, {})



export const components = {
    ...autoGeneratedComponents,
    TroisCanvas,
    Gltf,
}

// console.log(components, Gltf)


export const catalogue: Trois.Catalogue = {}

export const extend = ({ app, ...targets }: { app: App, [key: string]: any }) => {
    Object.keys(targets).forEach(key => {
        app.component(key, createComponent(key))
        catalogue[key] = targets[key]
    })
}
/*
// List copied from r3f
// https://github.com/pmndrs/react-three-fiber/blob/master/packages/fiber/src/three-types.ts

// IMPLEMENTED
    mesh
    instancedMesh
    scene
    sprite
    instancedBufferGeometry
    bufferGeometry
    boxBufferGeometry
    circleBufferGeometry
    coneBufferGeometry
    cylinderBufferGeometry
    dodecahedronBufferGeometry
    extrudeBufferGeometry
    icosahedronBufferGeometry
    latheBufferGeometry
    octahedronBufferGeometry
    parametricBufferGeometry
    planeBufferGeometry
    polyhedronBufferGeometry
    ringBufferGeometry
    shapeBufferGeometry
    sphereBufferGeometry
    tetrahedronBufferGeometry
    textBufferGeometry
    torusBufferGeometry
    torusKnotBufferGeometry
    tubeBufferGeometry
    wireframeGeometry
    parametricGeometry
    tetrahedronGeometry
    octahedronGeometry
    icosahedronGeometry
    dodecahedronGeometry
    polyhedronGeometry
    tubeGeometry
    torusKnotGeometry
    torusGeometry
    textGeometry
    sphereGeometry
    ringGeometry
    planeGeometry
    latheGeometry
    shapeGeometry
    extrudeGeometry
    edgesGeometry
    coneGeometry
    cylinderGeometry
    circleGeometry
    boxGeometry

    // Materials
    material
    shadowMaterial
    spriteMaterial
    rawShaderMaterial
    shaderMaterial
    pointsMaterial
    meshPhysicalMaterial
    meshStandardMaterial
    meshPhongMaterial
    meshToonMaterial
    meshNormalMaterial
    meshLambertMaterial
    meshDepthMaterial
    meshDistanceMaterial
    meshBasicMaterial
    meshMatcapMaterial
    lineDashedMaterial
    lineBasicMaterial

    // Lights
    light
    spotLightShadow
    spotLight
    pointLight
    rectAreaLight
    hemisphereLight
    directionalLightShadow
    directionalLight
    ambientLight
    lightShadow
    ambientLightProbe
    hemisphereLightProbe
    lightProbe

    // Textures
    texture
    videoTexture
    dataTexture
    dataTexture3D
    compressedTexture
    cubeTexture
    canvasTexture
    depthTexture

    // Misc
    group
    catmullRomCurve3
    points

    // Helpers
    cameraHelper

    // cameras
    camera
    perspectiveCamera
    orthographicCamera
    cubeCamera
    arrayCamera

// NOT IMPLEMENTED
    audioListener: AudioListenerProps
    positionalAudio: PositionalAudioProps

    lOD: LODProps
    skinnedMesh: SkinnedMeshProps
    skeleton: SkeletonProps
    bone: BoneProps
    lineSegments: LineSegmentsProps
    lineLoop: LineLoopProps
    // see `audio`
    // line: LineProps
    immediateRenderObject: ImmediateRenderObjectProps

    // primitive
    primitive: PrimitiveProps

    // helpers
    spotLightHelper: SpotLightHelperProps
    skeletonHelper: SkeletonHelperProps
    pointLightHelper: PointLightHelperProps
    hemisphereLightHelper: HemisphereLightHelperProps
    gridHelper: GridHelperProps
    polarGridHelper: PolarGridHelperProps
    directionalLightHelper: DirectionalLightHelperProps
    boxHelper: BoxHelperProps
    box3Helper: Box3HelperProps
    planeHelper: PlaneHelperProps
    arrowHelper: ArrowHelperProps
    axesHelper: AxesHelperProps


    // misc
    raycaster: RaycasterProps
    vector2: Vector2Props
    vector3: Vector3Props
    vector4: Vector4Props
    euler: EulerProps
    matrix3: Matrix3Props
    matrix4: Matrix4Props
    quaternion: QuaternionProps
    bufferAttribute: BufferAttributeProps
    instancedBufferAttribute: InstancedBufferAttributeProps
    color: ColorProps
    fog: FogProps
    fogExp2: FogExp2Props
    shape: ShapeProps
*/