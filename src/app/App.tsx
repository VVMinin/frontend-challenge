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
      <Layout className="min-h-screen bg-neutral-200">
        <header className="border-b border-black/10 bg-sky-600 shadow">
          <div className="mx-auto flex w-full max-w-[1160px] items-center px-3 md:px-4">
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as "all-cats" | "favorite-cats")}
                  className={[
                    "h-11 px-4 text-sm font-medium transition-colors !text-white",
                    isActive ? "bg-sky-700" : "hover:bg-sky-500",
                  ].join(" ")}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </header>
        <Layout.Content className="mx-auto w-full max-w-[1160px] px-3 py-6 md:px-4 md:py-8">
          {activeTab === "all-cats" ? <AllCatsPage /> : <FavoriteCatsPage />}
        </Layout.Content>
      </Layout>
    </ConfigProvider>
  );
};
