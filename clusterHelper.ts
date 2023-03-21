export default class KMeans {
    data: any;
    k: any;
    constructor(data: any, k: any) {
      this.data = data;
      this.k = k;
    }
  
    assignClusters() {
      const clusters = Array.from({ length: this.k }, (_, i) => ({
        center: this.data[i].value,
        points: [],
      }));
  
      for (let i = 0; i < this.data.length; i++) {
        const point = this.data[i];
        let closestDist = Infinity;
        let closestCluster: any;
        for (let j = 0; j < clusters.length; j++) {
          const cluster = clusters[j];
          const dist = Math.abs(point.value - cluster.center);
          if (dist < closestDist) {
            closestDist = dist;
            closestCluster = cluster;
          }
        }
        closestCluster.points.push(point);
        if (point.value <= 55) {
          point.color = "#008ffb";
        } else if (point.value <= 75) {
          point.color = "#00ff96";
        } else if (point.value <= 100) {
          point.color = "#feb019";
        }
      }
  
      return this.data;
    }
  }