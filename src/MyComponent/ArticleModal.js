import React from 'react'
import AlertBox from './AlertBox.js';
import {useState} from "react"
const ArticleModal = ({reporter}) => {
    console.log(reporter,333333333)
    const [show, setShow] = useState(true);
    const hideModal = () => {setShow(false);    };
    return (
    <AlertBox show={show} handleClose={hideModal}>
      <h1>{reporter.id}</h1>
    </AlertBox>
  )
}
export default ArticleModal







