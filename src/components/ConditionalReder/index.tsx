import React from 'react';

interface IProps {
  conditional: any,
  children: React.ReactNode
}

export const ConditionalRender: React.FC <IProps> = (props) => {

  return(
    <>
      {props.conditional ? props.children : false}
    </>
  )
}