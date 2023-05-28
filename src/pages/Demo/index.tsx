import {FC, useState, useEffect, Fragment} from "react";
import axios from "axios";
import {connect} from "react-redux";
import {getDemoData} from "@/pages/Demo/store/demoReducer";
import {Helmet} from "react-helmet";

interface IProps {
  content?: string,
  getDemoData?: (data: string) => void;
}

const Demo: FC<IProps> = (data) => {
  // const [content, setContent] = useState("");
  //
  // useEffect(() => {
  //   axios
  //     .post("/api/getDemoData", {
  //       content: "这是一个demo页面",
  //     })
  //     .then((res: any) => {
  //       setContent(res.data?.data?.content);
  //     });
  // }, []);
  return (
    <Fragment>
      <Helmet>
        <title>简易的服务器端渲染框架 - DEMO</title>
        <meta name="description" content="服务器端渲染框架"></meta>
      </Helmet>
      <div>
        <h1>{data.content}</h1>
        <button
          onClick={(): void => {
            data.getDemoData && data.getDemoData("刷新过后的数据");
          }}>
          刷新
        </button>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    content: state?.demo?.content,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDemoData: (data: string) => {
      dispatch(getDemoData(data));
    }
  }
}

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo);

export default storeDemo;
