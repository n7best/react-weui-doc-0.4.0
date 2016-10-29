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

    if(article){
      let componentExample = article.example ? require(`../examples/${article.example}`) : false;
    }

    this.state = {
      code: typeof componentExample === 'undefined' ? false : componentExample
    }

  }


  componentWillReceiveProps(nextProps){
    let article = nextProps.docs[nextProps.params.id].items[nextProps.params.aid]
    let componentExample = article.example ? require(`../examples/${article.example}`) : false;
    this.setState({
      code: componentExample
    })
  }

  render(){


    return (
      <SplitPane split="vertical" minSize={20} defaultSize="60%" primary="second">
          <div className="App__preview background--canvas flex-center">
              {this.state.code ?
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