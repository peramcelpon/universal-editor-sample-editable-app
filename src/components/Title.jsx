/*
Copyright 2022 Adobe
All Rights Reserved.

NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useEffect, useMemo } from 'react';
import {fetchData} from '../utils/fetchData';

const Title = (props) => {
  const { itemID, itemProp, itemType, className } = props;
  const editorProps = useMemo(() => true && {
    itemID,
    itemProp,
    itemType
  }, [itemID, itemProp, itemType]);

  const [data,setData] = React.useState({});
  useEffect(() => {
    if(!itemID || !itemProp) return;
    fetchData(itemID).then((data) => setData(data));
  }, [itemID, itemProp]);

  const TitleTag = `${data.type}`;
  return (
    <TitleTag {...editorProps} className={className}>{data.text}</TitleTag>
  );
};

export default Title;
