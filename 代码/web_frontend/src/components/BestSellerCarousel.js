import * as React from 'react';
import {Box, Heading, HStack, Text, VStack} from 'native-base';
import {Image} from "antd/es";
import {timeStampToDay} from '../utils/parseTime';
import 'antd/dist/antd.css';
import { Carousel } from 'antd';

let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const picture = (props) => {
  return (
      <div style={{ flexDirection: 'row',
        justifyContent: 'center',
        width: w - 60,
        height: w * 0.6}}>
        <Image
            source={{uri:'https://img.zcool.cn/community/01b0e45e120106a80120a895a2e9af.jpg@1280w_1l_2o_100sh.jpg'}}
            containerStyle={{flex: 1,
              backgroundColor: 'white',
              borderRadius: 8}}
            style={{resizeMode: 'cover'}}
        />
        <Text style={{display: 'flex',
          position: 'absolute',
          bottom: 10,
          color: 'white',
          width: '100%',
          height: 45,
          lineHeight: 45,
          fontSize: 20,
          paddingLeft: 10,
          borderWidth: 5,
          borderTopWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 5,
          borderRightWidth: 0,
          borderLeftColor: '#9f1239'}} numberOfLines={2}>
          {'团购标题'}
        </Text>
</div>
  );
};

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


class BestSellerCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 这个就是传入的数据，如果是请求后台的数据的话，只要和下面这个对象数组格式保持一致就好
      entries: [
        {
          title: '团购标题',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration:
            'http://cf.dtcj.com/richeditor/e15f4895-3f10-4d0e-845d-997dc1c23637.jpg',
        },
        {
          title: '团购标题',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration:
            'https://img.zcool.cn/community/01b0e45e120106a80120a895a2e9af.jpg@1280w_1l_2o_100sh.jpg',
        },
        {
          title: '团购标题',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration:
            'http://seopic.699pic.com/photo/50050/6251.jpg_wh1200.jpg',
        },
      ],
    };
  }

  render() {
    const nowDate = new Date().getTime();
    const dateString = timeStampToDay(nowDate);
    return (
      <div style={{marginTop: -0.08 * h, height: 0.4 * h}}>
        <Box ml={0.1 * w}>
          <Heading style={{display: 'flex', color: '#9f1239',
            width: '100%',
            height: 45,
            lineHeight: 45,
            fontSize: 20,}}>猜你喜欢</Heading>
        </Box>
        <Carousel >
          {/*<div style={{ flexDirection: 'row',*/}
          {/*  justifyContent: 'center',*/}
          {/*  width: w - 60,*/}
          {/*  height: w * 0.6}}>*/}
          {/*  /!*<Image*!/*/}
          {/*  /!*    source={{uri:'https://img.zcool.cn/community/01b0e45e120106a80120a895a2e9af.jpg@1280w_1l_2o_100sh.jpg'}}*!/*/}
          {/*  /!*    containerStyle={{flex: 1,*!/*/}
          {/*  /!*      backgroundColor: 'white',*!/*/}
          {/*  /!*      borderRadius: 8}}*!/*/}
          {/*  /!*    style={{resizeMode: 'cover'}}*!/*/}
          {/*  /!*>*!/*/}
          {/*  <Text style={{display: 'flex',*/}
          {/*    position: 'absolute',*/}
          {/*    bottom: 10,*/}
          {/*    color: 'white',*/}
          {/*    width: '100%',*/}
          {/*    height: 45,*/}
          {/*    lineHeight: 45,*/}
          {/*    fontSize: 20,*/}
          {/*    paddingLeft: 10,*/}
          {/*    borderWidth: 5,*/}
          {/*    borderTopWidth: 0,*/}
          {/*    borderBottomWidth: 0,*/}
          {/*    borderLeftWidth: 5,*/}
          {/*    borderRightWidth: 0,*/}
          {/*    borderLeftColor: '#9f1239'}} numberOfLines={2}>*/}
          {/*    {'团购标题'}*/}
          {/*  </Text>*/}
          {/*</div>*/}
          {/*<picture/>*/}
          {/*<picture/>*/}
          {/*<picture/>*/}
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
        <Box ml={0.1 * w} width={w}>
          <Text style={{
            display: 'flex',
            // ml: 0.15 * w,
            color: '#9f1239',
            width: '100%',
            height: 45,
            lineHeight: 45,
            fontSize: 12,
          }}>{dateString}</Text>
        </Box>
      </div>
    );
  }
}

export default BestSellerCarousel;
