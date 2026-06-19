import GeoTIFF, { fromBlob, fromUrl, fromArrayBuffer } from 'geotiff';
import GeoTIFFImage from 'geotiff/dist-node/geotiffimage';
var tiff;
var image;
var rectangle;
class GeoTiffUtil {
  constructor() {
  }
   async init(){
     this.tiff = await fromUrl('/shpLayer/防洪大包围.tif');
    this.image = await this.tiff.getImage();
    let [west, south, east, north] = this.image.getBoundingBox();
    const code =
      this.image.geoKeys.ProjectedCSTypeGeoKey ||
      this.image.geoKeys.GeographicTypeGeoKey;
 
        let { x: w, y: n } = await (
       await fetch(
         `//epsgIo/trans?x=${west}&y=${north}&s_srs=${code}&t_srs=4326`
       )
     ).json();
     let { x: e, y: s } = await (
       await fetch(
         `//epsgIo/trans?x=${east}&y=${south}&s_srs=${code}&t_srs=4326`
       )
      ).json();
      const [red = [], green = [], blue = []] = await this.image.readRasters();
      // 将像素信息写入canvas
      const canvas = document.createElement("canvas");
      let width = this.image.getWidth();
      let height = this.image.getHeight();
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      let imageData = ctx.createImageData(width, height);
      for (var i = 0; i < imageData.data.length / 4; i += 1) {
          imageData.data[i * 4 + 0] = red[i];
          imageData.data[i * 4 + 1] = green[i] || 0;
          imageData.data[i * 4 + 2] = blue[i] || 0;
          imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
      }
 
      ctx.putImageData(imageData, 0, 0);
 
      return {canvas:canvas,rectangle:[w, s, e, n]};
  }
}
export default new GeoTiffUtil();