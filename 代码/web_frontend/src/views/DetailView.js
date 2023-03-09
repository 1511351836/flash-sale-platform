import React, {Component, useState} from 'react';
import {
  Box,
  Text,
  HStack,
  VStack,
  Center,
  ScrollView,
  Flex,
  Icon,
  Image,
} from 'native-base';
import {useParams, withRouter} from 'react-router';
import DetailCard from '../components/DetailCard';
import Header from '../components/Header';
import PurchaseFooter from '../components/PurchaseFooter';

let w = window.innerWidth;
let h = window.innerHeight;

export class DetailViewWrapper extends React.Component{
  render() {
    const { props, userId } = this.props.location.state || {};
    console.log('detail screen wrapper props: ', props);
    console.log('detail screen wrapper userId: ', userId);
    return(
        <DetailView props={props} userId={userId}/>
    );
  }
}


const DetailView = ({props, userId}) => {
  console.log('detail screen props: ', props);
  console.log('detail screen userId: ', userId);
  // const {props} = route.params;
  // const {userId} = route.params;
  // const {groupId} = props.groupId;
  const [isCollected, setIsCollected] = useState(0);

  return (
    <>
      <ScrollView mb={0.1 * h}>
        <Header />
        {/*为了保证在中间*/}
        <Box ml={0.25 * w}>
          <DetailCard props={props} userId={userId} myAddressId={-1} />
        </Box>
      </ScrollView>
      <Box ml={0.25 * w}>
        <PurchaseFooter groupId={props.groupId} userId={userId} />
      </Box>
    </>
  );
};

export default withRouter(DetailViewWrapper);
