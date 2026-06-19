/**
 * @Author: Caven
 * @Date: 2020-01-15 20:31:28
 */

import GCJ02TilingScheme from './GCJ02TilingScheme.js'
import { UrlTemplateImageryProvider } from '@cesium/engine'

const TILE_URL = {
  img: '//webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  elec: '//webrd{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  cva: '//webst{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
}

class AmapImageryProvider extends UrlTemplateImageryProvider {
  // 构造函数，接收一个options参数，默认为空对象
  constructor(options = {}) {
    // 如果options中没有url属性，则将url属性设置为protocol和TILE_URL[options.style]或TILE_URL['elec']的拼接结果
    options['url'] =
      options.url ||
      [
        options.protocol || '',
        TILE_URL[options.style] || TILE_URL['elec'],
      ].join('')
    // 如果options中没有subdomains属性，或者subdomains属性是一个空数组，则将subdomains属性设置为['01', '02', '03', '04']
    if (!options.subdomains || !options.subdomains.length) {
      options['subdomains'] = ['01', '02', '03', '04']
    }
    if (options.crs === 'WGS84') {
      options['tilingScheme'] = new GCJ02TilingScheme()
    }
    super(options)
  }
}
export default AmapImageryProvider
