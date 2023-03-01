import styled from "@emotion/styled";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { enterAtom } from "../atoms";
import "../common/css/enter.css";

const VideoWrap = styled.div`
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const Video = styled.video`
  position: fixed; 
  right: 0; 
  bottom: 0;  
  min-width: 100%; 
  min-height: 100%;       
  width: auto; 
  height: auto; 
  background-size: cover;
  opacity: 0.8;
`;

const MessageOne = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  opacity: 0;

  @media screen and (max-width: 500px){
    font-size: 15px !important;
  }
`;
const MessageTwo = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  opacity: 0;
  
  @media screen and (max-width: 500px){
    font-size: 15px !important;
  }
`;
const MessageThree = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  opacity: 0;

  @media screen and (max-width: 500px){
    font-size: 15px !important;
  }
`;


function Enter() {
  const setEnter = useSetRecoilState(enterAtom);
  const pageDivRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const messageOneRef = useRef<HTMLDivElement>(null);
  const messageTwoRef = useRef<HTMLDivElement>(null);
  const messageThreeRef = useRef<HTMLDivElement>(null);

  const onClickEnter = () => {

    if(pageDivRef.current){
      setTimeout(() => setEnter(true), 15000);
      
      pageDivRef.current.classList.add("btn_animation");
      videoRef.current?.classList.add("video_animation");
      messageOneRef.current?.classList.add("message_one_animation");
      messageTwoRef.current?.classList.add("message_two_animation");
      messageThreeRef.current?.classList.add("message_three_animation");

    }    
  }

  return (
    <>
      <div className="container" ref={pageDivRef}>
        <button className="btn" onClick={onClickEnter} />
        <div className="wave_wrap">
            <div className="wave" />
            <div className="wave" />
            <div className="wave" />
        </div>
      </div>

      <VideoWrap ref={videoRef}>
        <Video className="video" autoPlay muted loop>
          <source src={require("../common/video/sea.mp4").default} type="video/mp4" />
        </Video>
      </VideoWrap>
      
      <MessageOne ref={messageOneRef}>오늘은 어떤 일이 있었나요?</MessageOne>
      <MessageTwo ref={messageTwoRef}>아니면, 어떤 일을 할꺼에요?</MessageTwo>
      <MessageThree ref={messageThreeRef}>궁금해요 알려주세요.</MessageThree>
    </>
  )
}

export default Enter;