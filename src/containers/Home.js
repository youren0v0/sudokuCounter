/**
 * Created by zhuyue on 18/1/16.
 */
import React, { Component } from 'react'
import AppRouter from '../router'
import {Link, HashRouter as Router, withRouter, Switch, Route} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon, Alert } from 'antd'
import music from '../asserts/music.mp3'
const { SubMenu } = Menu
const { Header, Footer, Sider, Content } = Layout
const Apps = () => (
  <ul className="app-list">
    <li>
      <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
    </li>
    <li>
      <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
    </li>
  </ul>
);

const breadcrumbNameMap = {
  '/newGame': 'newGame',
  '/counter': 'counter',
  '/mine': 'mine',
  '/newGame/:level': 'level',
  '/newGame/easy': 'easy'
};
class Home extends Component {



  render() {
    const { location } = this.props;
    console.log(this.props, 'props')
    console.log(location, 'location')
    const pathSnippets = location.pathname.split('/').filter(i => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems)
    return (
      <Layout>
        <div >
          <span onClick={() => {console.log(this.refs.audio, '111')}}>~~~~~~</span>
          <audio src={music} ref="audio" onClick={(e) => {console.log(e.target, '222')}}>
            1111111111
          </audio>
        </div>
        <Header style={{ background: '#999' }}>Header</Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />sudoku</span>}>
                <Menu.Item key="1"><Link to="/newGame">new game</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/counter">counter</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/mine">mine</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <AppRouter/>
            </Content>
          </Layout>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
export default withRouter(Home)