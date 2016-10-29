import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'
import { SearchBar, Cells, CellHeader, CellBody, CellFooter } from 'react-weui';
import './style.css';

class Navigation extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchFilter: ''
        }
    }

    onSearch(text){
        this.setState({
            searchFilter: text
        })
    }

    renderSideBar() {
        return this.props.data.map((doc, i)=>{
            return (
              <Link
                to={`/docs/${i}`}
                className="navmenu__item"
                activeClassName="active"
                key={i}
              >
                <FontAwesome name={doc.icon} size="2x" />
                <p>{doc.name}</p>
              </Link>
            )
        })
    }

    renderMenu() {
        if(!this.props.current.id) return false;
        let menus = this.props.data[this.props.current.id].items;
        //console.log(this.state.searchFilter)
        return menus.map((item, i)=>{
            if(!this.state.searchFilter || item.name.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) > -1){
                return (
                    <Link className="weui_cell" activeClassName="active" key={i} to={`/docs/${this.props.current.id}/articles/${i}`}>
                        <CellHeader>
                            <img src={item.icon} alt={item.name} className="navMenu--icon" />
                        </CellHeader>
                        <CellBody></CellBody>
                        <CellFooter>{item.name}</CellFooter>
                    </Link>
                )
            }else{
                return false
            }

        })
    }

    render(){
        const { langs, logo } = this.props;
        return (
            <div className="App__nav">
                <nav className="navSidebar background--nav">
                  <div className="navSidebar--logo">
                      <img src={logo} alt="logo"/>
                  </div>
                  <ul className="navmenu">
                    { this.renderSideBar() }
                  </ul>
                </nav>
                <div className="navMenu">
                    <SearchBar
                        lang={langs.searchbar}
                        placeholder={langs.searchbar.placeholder}
                        onChange={this.onSearch.bind(this)}
                    />
                    <Cells access>
                    { this.renderMenu() }
                    </Cells>
                </div>
            </div>
        )
    }
}
export default Navigation;