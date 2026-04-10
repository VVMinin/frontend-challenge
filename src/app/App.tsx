import { ConfigProvider, Layout } from "antd";
import { useMemo, useState } from "react";
import { AllCatsPage } from "../pages/all-cats/ui/all-cats-page";
import { FavoriteCatsPage } from "../pages/favorite-cats/ui/favorite-cats-page";

export const App = () => {
  const [activeTab, setActiveTab] = useState<"all-cats" | "favorite-cats">("all-cats");

  const tabItems = useMemo(
    () => [
      { key: "all-cats", label: "Все котики" },
      { key: "favorite-cats", label: "Любимые котики" },
    ],
    [],
  );

  return (
    <ConfigProvider>
      <Layout className="app-layout">
        <header className="app-header">
          <div className="app-header-inner">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as "all-cats" | "favorite-cats")}
                  className={[
                    "app-tab-button",
                    isActive ? "is-active" : "",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>
        <Layout.Content className="app-content">
          {activeTab === "all-cats" ? <AllCatsPage /> : <FavoriteCatsPage />}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};
