import React, {Component} from 'react';
import {Box, Image, AspectRatio, Text} from 'native-base';
import {Link} from 'react-router-dom';

let w = window.innerWidth * 0.5;
let h = window.innerHeight;

const BrowseCard = ({props, userId}) => {
  // console.log('browseCard:', props, 'and userId: ', userId);
  let title = props.groupTitle;
  if (props.groupTitle.length > 9) {
    title = props.groupTitle.substring(0, 9) + '...';
  }

  return (
    <Box width={0.47 * w} direction="column" margin={0.01 * w} height={0.4 * w}>
      <AspectRatio w="100%" ratio={{base: 4 / 3, md: 4 / 3}}>
        <Image
          source={{
            uri: props.picture,
          }}
          alt="image"
          borderRadius="lg"
        />
      </AspectRatio>
      {props.state === 2 ? (
        // <Link
        //   to={{
        //     screen: 'SecKill',
        //     initial: false,
        //     params: {props: props, userId: userId, addressId: -1},
        //   }}>
          <Text mt={0.02 * w} color="#71717a" bold size="xl">
            {title}
          </Text>
        // </Link>
      ) : (
        <Link to={{ pathname: '/Detail', state: {props: props, userId: userId}}}>
          <Text mt={0.02 * w} color="#71717a" bold size="xl">
            {title}
          </Text>
        </Link>
      )}
    </Box>
  );
};

export default BrowseCard;
