import * as THREE from "three";
interface LineYtfConfigOptions {
  scene: THREE.WebGLRenderer;
  basepoints: THREE.Vector3[];
  pathColor?: string;
  sphereColor?: string;
}
class LineYtf {
  basepoints: THREE.Vector3[];
  allPoints: THREE.Vector3[];
  sphere: THREE.SphereGeometry;
  index: number;
  divisions: number;
  scene: THREE.WebGLRenderer;
  pathColor: string;
  sphereColor: string;
  constructor(option: LineYtfConfigOptions) {
    this.basepoints = option.basepoints
    this.allPoints = []
    this.sphere = null
    this.index = 0
    this.divisions = 100
    this.scene = option.scene
    this.pathColor = option.pathColor !== undefined ? option.pathColor : "#ffcccc"
    this.sphereColor = option.sphereColor !== undefined ? option.sphereColor : "#7777ff"
    this.init()
  }
  init() {
    let line = new THREE.CatmullRomCurve3(this.basepoints)
    this.allPoints = line.getPoints(this.divisions)
    // 创建管状几何体
    const geom = new THREE.TubeGeometry(
      line, //创建样条曲线
      100,//管道的分段数
      3,//管道半径
      100,//管道截面圆的分段数
      false//是否头尾连接
    )
    const material2 = new THREE.MeshBasicMaterial({ color: this.pathColor });
    const torus2 = new THREE.Mesh(geom, material2);
    this.scene.add(torus2)

    //给球体添加材质
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshLambertMaterial({ color: this.sphereColor });
    this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    this.scene.add(this.sphere);
    setInterval(() => {
      this.sphere.position.x = this.allPoints[this.index % this.divisions].x
      this.sphere.position.y = this.allPoints[this.index % this.divisions].y
      this.sphere.position.z = this.allPoints[this.index % this.divisions].z
      this.index++
    }, 10);
  }
}

export default LineYtf