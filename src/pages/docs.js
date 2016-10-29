/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SplitPane from 'react-split-pane';
import Preview from "../components/preview";
import NoPreview from './nopreview';
import WeUI from 'react-weui';
import iconSrc from '../logo.svg';
import './home.css';
//import { Button } from 'react-weui';



class Docs extends Component {
  constructor(props){
    super(props);
    let article = this.props.docs[this.props.params.id].items[this.props.params.aid]

    this.state = {
      loading: !!article,
      code: false
    }

    if(article){
      this._fetchCode(article.example)
    }

  }

  _fetchCode(doc){
    if(!doc) return this.setState({loading: false, code: null})
    fetch(!process.env.NODE_ENV ? doc : `/react-weui-doc-0.4.0${doc}`).then((res)=>res.text()).catch(error=>{
        this.setState({
            loading: false
        })
        alert('Loading code Fail, try again');
    }).then(text=>{
        //console.log(text)
        this.setState({loading: false, code: text});
    });
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      loading: true,
      code: ''
    })
    let article = nextProps.docs[nextProps.params.id].items[nextProps.params.aid]
    if(article){
      this._fetchCode(article.example)
    }else{
      this.setState({
        loading: false
      })
    }
  }

  render(){


    return (
      <SplitPane split="vertical" minSize={20} defaultSize="60%" primary="second">
          <div className="App__preview background--canvas flex-center">
              {this.state.code && !this.state.loading ?
              <div className="App__mobileview">
              <Preview
                  context={{}}
                  code={this.state.code}
                  scope={{React, ReactDOM, Component, iconSrc, ...WeUI}}
                  noRender={true}
              /></div> : <NoPreview langs={this.props.langs.nopreview}/>
              }
          </div>
          <div className="App__detail">
            {this.props.children && React.cloneElement(this.props.children, {
              docs: this.props.docs,
              aid: this.props.params.aid,
              code: this.state.code,
              langs: this.props.langs.article
            })}
          </div>
      </SplitPane>

    );
  }
}


export default Docs;
//<Playground codeText={componentExample} scope={{React, ReactDOM, Component, ...WeUI}} initiallyExpanded={false}/>