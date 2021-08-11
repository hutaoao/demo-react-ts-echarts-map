import React, {FC, useEffect, useRef} from 'react';
import {
  init,
  registerMap,
} from 'echarts';
import './App.css';

const chinaJson = require('./jsonData/china.json');
const zjJson = require('./jsonData/zhejiang.json');
const jxJson = require('./jsonData/jiangxi.json');

const App: FC = () => {
  const echartsRef = useRef<HTMLDivElement>(null);

  const chinaOption = {
    backgroundColor: '#fff',
    title: {
      top: 20,
      text: '全国地图',
      subtext: '',
      x: 'center',
      textStyle: {
        color: '#000'
      }
    },
    //提示框组件
    tooltip: {
      trigger: "item"
    },
    //地理坐标系组件
    geo: {
      type: 'map',
      map: 'china', //地图名称
      roam: true, //是否开启鼠标缩放和平移漫游
      zoom: 1.1,  //当前视角的缩放比例
      label: {
        normal: { //默认
          show: true,
          textStyle: {
            color: '#000000'  //字体颜色
          }
        },
        emphasis: { //高亮时
          textStyle: {
            color: '#ff4242'  //选中后的字体颜色
          }
        }
      },
      itemStyle: { //地图区域的多边形 图形样式
        normal: {
          areaColor: '#EEEEEE', //地图区域的颜色
          borderColor: '#ff5555', //图形的描边颜色
        },
        emphasis: {
          areaColor: '#ffffff',
        }
      }
    },
    //视觉映射组件
    visualMap: {
      right: '20',
      bottom: '20',
      min: 100,
      max: 10000,
      inRange: { //视觉元素范围
        color: ['#84f670', '#ff4260']
      },
      text: ['高', '低'],//两端文本
      calculable: true
    },
    //用于地理区域数据的可视化，配合 visualMap 组件
    series: [
      {
        type: "map", //地图
        name: "mapName",
        geoIndex: 0,
        roam: true,
        map: 'china',
        data: [
          {name: '安徽省', value: 2000},
          {name: '台湾省', value: 5000},
          {name: '四川省', value: 8000},
        ],
        itemStyle: {
          // 设置每个市区的默认颜色
          areaColor: "#459bd0",
          borderColor: "rgba(37,213,94,0.58)",
        },
        emphasis: {
          // 设置每个市区hover的颜色和边框
          itemStyle: {
            areaColor: "#90eaff",
            borderWidth: 2,
          },
        },
        select: {
          // 设置选中市区的颜色和边框
          itemStyle: {
            areaColor: "#90eaff",
            borderWidth: 2,
          },
        },
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 400,
          color: '#484848'
        }
      },
      {
        type: 'scatter', //散点气泡
        name: 'scatterName',
        coordinateSystem: 'geo', //使用地理坐标系
        symbol: 'diamond', //标记的图形
        symbolSize: 20, //标记的大小
        encode: {
          lat: 'lat',
          lng: 'lng'
        },
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 400,
          color: '#484848',
          formatter: (params: any) => {
            return '¥'
          }
        },
        data: [
          {name: '哈尔滨市', value: [126.642464, 45.756967, 6000]}
        ]
      },
      {
        type: 'effectScatter', //带有涟漪特效动画的散点气泡
        name: 'effectScatterName',
        coordinateSystem: 'geo', //使用地理坐标系
        symbolSize: 15, //标记的大小
        encode: {value: 2},
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 400,
          color: '#484848',
          formatter: (params: any) => {
            return '$'
          }
        },
        data: [
          {name: '济南市', value: [117.000923, 36.675807, 9000]}
        ]
      },
    ]
  }

  const jxOption = {
    backgroundColor: '#fff',
    title: {
      top: 20,
      text: '用户注册区域展示',
      subtext: '',
      x: 'center',
      textStyle: {
        color: '#000'
      }
    },
    geo: {
      type: 'map',
      map: '江西省',
      roam: true,
      geoIndex: 1,
      zoom: 1.1,
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#000000'
          }
        },
        emphasis: {
          textStyle: {
            color: '#000000'
          }
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#EEEEEE',
          borderColor: '#8b8b8b',
        },
        emphasis: {
          areaColor: '#ffffff',
        }
      },
    },
  }

  const nameToCode: any = {
    '中国': 100000,
    '北京市': 110000,
    '天津市': 120000,
    '河北省': 130000,
    '山西省': 140000,
    '内蒙古自治区': 150000,
    '辽宁省': 210000,
    '吉林省': 220000,
    '黑龙江省': 230000,
    '上海市': 310000,
    '江苏省': 320000,
    '浙江省': 330000,
    '安徽省': 340000,
    '福建省': 350000,
    '江西省': 360000,
    '山东省': 370000,
    '河南省': 410000,
    '湖北省': 420000,
    '湖南省': 430000,
    '广东省': 440000,
    '广西壮族自治区': 450000,
    '海南省': 460000,
    '重庆市': 500000,
    '四川省': 510000,
    '贵州省': 520000,
    '云南省': 530000,
    '西藏自治区': 540000,
    '陕西省': 610000,
    '甘肃省': 620000,
    '青海省': 630000,
    '宁夏回族自治区': 640000,
    '新疆维吾尔自治区': 650000,
    '台湾省': 710000,
    '香港特别行政区': 810000,
    '澳门特别行政区': 820000,
  }

  useEffect(() => {
    if (echartsRef.current) {
      let myChart = init(echartsRef.current); //创建实例
      registerMap('china', chinaJson); //注册可用的地图（不可缺少）

      myChart.setOption(chinaOption);

      myChart.on("click", function (params: any) {
        if (nameToCode[params.name]) {
          if (params.name !== '江西省') {
            return;
          }
          // 重新注册地图
          registerMap(params.name, jxJson);
          myChart.setOption(jxOption);
        } else {
          registerMap('china', chinaJson);
          myChart.setOption(chinaOption);
        }
      });

      myChart.getZr().on('click', () => {
        registerMap('china', chinaJson);
        myChart.setOption(chinaOption);
      })
      return () => {
        myChart.off('click');
        myChart.dispose();
      }
    }
  })

  return (
    <div className="App" ref={echartsRef}/>
  );
}

export default App;
