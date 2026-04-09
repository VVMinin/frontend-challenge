import { ConfigProvider, Layout, Tabs, Typography } from "antd";
import { AllCatsPage } from "../pages/all-cats/ui/all-cats-page";
import { FavoriteCatsPage } from "../pages/favorite-cats/ui/favorite-cats-page";

export const App = () => {
  return (
    <ConfigProvider>
      <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
        <Layout.Content style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px", width: "100%" }}>
          <Typography.Title level={2} style={{ margin: 0 }}>
            Кошачий Pinterest
          </Typography.Title>
          <Tabs
            defaultActiveKey="all-cats"
            style={{ marginTop: 24 }}
            items={[
              {
                key: "all-cats",
                label: "Все котики",
                children: <AllCatsPage />,
              },
              {
                key: "favorite-cats",
                label: "Любимые котики",
                children: <FavoriteCatsPage />,
              },
            ]}
          />
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};
