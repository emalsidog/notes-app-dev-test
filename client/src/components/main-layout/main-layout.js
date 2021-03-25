// Dependencies
import React from "react";

// Components
import Navigation from "../navigation";

// Antd components
import { Layout } from 'antd';
const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout>
      <Navigation />
      <Content>
        { children }
      </Content>
    </Layout>
  )
}

export default MainLayout;