import { ConfigProvider, Layout, Typography } from "antd";

export const App = () => {
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <Layout.Content style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px", width: "100%" }}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Кошачий Pinterest
          </Typography.Title>
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};
