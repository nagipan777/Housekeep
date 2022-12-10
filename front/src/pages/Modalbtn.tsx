import React from "react";

type Props = {
  title: string;
  onClick: any;
};
export const ModalBtn: React.VFC<Props> = (props) => {
  //クリックイベントで受け取ったonClickを発火させる
  return <button onClick={props.onClick}>{props.title}</button>;
};
export default ModalBtn;