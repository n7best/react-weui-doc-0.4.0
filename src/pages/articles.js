import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Remarkable from 'react-remarkable';
import hljs from 'highlight.js';
import { Article, Toast, Tab, TabBody, NavBar, NavBarItem } from 'react-weui';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';
import './home.css';
//import { Button } from 'react-weui';

class Articles extends Component {
    static defaultProps = {
        langs: {
            detail: 'Detail',
            code: 'Code',
            srcCode: 'Source Code',
            loading: 'Loading...'
        }
    };

    constructor(props){
        super(props);
        this.state = {
            loading: true,
            content: null
        }
    }

    componentDidMount(){
        this.componentWillReceiveProps(this.props)
    }

    componentWillReceiveProps(nextProps){
        this.setState({loading: true, content: null});
        let article = this.props.docs[nextProps.params.id].items[nextProps.params.aid]
        fetch(article.docs).then((res)=>res.text()).catch(error=>{
            this.setState({
                loading: false
            })
            alert('Loading article Fail, try again');
        }).then(text=>{
            //console.log(text)
            this.setState({loading: false, content: text}, ()=>{
                const domNode = ReactDOM.findDOMNode(this);
                const nodes = domNode.querySelectorAll('pre code');

                if (nodes.length > 0) {
                  for (var i = 0; i < nodes.length; i=i+1) {
                    hljs.highlightBlock(nodes[i]);
                  }
                }
            });
        });
    }

    render(){
        const { code, langs } = this.props;
        return (
          <Tab type="navbar">
                <NavBarItem label={langs.detail}>
                    <Article>
                    {
                        this.state.loading ?
                        <Toast icon="loading" show={true}>{langs.loading}.</Toast> :
                        <div className="markdown-body">
                            <Remarkable source={this.state.content} />
                        </div>
                    }
                    </Article>
                </NavBarItem>

                <NavBarItem label={langs.srcCode} >
                    { code ?
                    <Article>
                        <h1>{langs.code}</h1>
                        <pre>
                            <code>
                                {code}
                            </code>
                        </pre>
                    </Article> : false}
                </NavBarItem>
          </Tab>
        );
    }
}

export default Articles;