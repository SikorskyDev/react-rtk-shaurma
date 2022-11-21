import React from "react";

import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";

import MainLayout from "./layout/MainLayout";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const FullGoods = React.lazy(() => import(/* webpackChunkName: "FullGoods" */ "./pages/FullGoods"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"));

function App() {
    return (
        <Routes>
            <Route path="/react-rtk-shaurma" element={<MainLayout />}>
                <Route path="/react-rtk-shaurma" element={<Home />} />
                <Route
                    path="/react-rtk-shaurma/cart"
                    element={
                        <React.Suspense
                            fallback={
                                <div style={{ textAlign: "center" }}>
                                    Відбувається завантаження корзини...
                                    Будь-ласка, зачекайте
                                </div>
                            }
                        >
                            <Cart />
                        </React.Suspense>
                    }
                />
                <Route
                    path="/react-rtk-shaurma/goods/:id"
                    element={
                        <React.Suspense
                            fallback={
                                <div style={{ textAlign: "center" }}>
                                    Відбувається завантаження товарів...
                                    Будь-ласка, зачекайте
                                </div>
                            }
                        >
                            <FullGoods />
                        </React.Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <React.Suspense
                            fallback={
                                <div style={{ textAlign: "center" }}>
                                    Завантаження...
                                </div>
                            }
                        >
                            <NotFound />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
