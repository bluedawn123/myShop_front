import React, { useState } from "react";
import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Dashboard, People, ShoppingCart } from "@mui/icons-material";
import ProductManagement from "./ProductManagement";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";

const drawerWidth = 240;

function AdminPage() {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const renderContent = () => {
    switch (selectedMenu) {
      case "products":
        return <ProductManagement />;
      case "users":
        return <UserManagement />;
      case "orders":
        return <OrderManagement />;
      default:
        return <Typography>대시보드를 선택하세요.</Typography>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* 상단 AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            관리자 페이지
          </Typography>
        </Toolbar>
      </AppBar>

      {/* 사이드바 Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button onClick={() => setSelectedMenu("dashboard")}>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="대시보드" />
            </ListItem>
            <ListItem button onClick={() => setSelectedMenu("products")}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="상품 관리" />
            </ListItem>
            <ListItem button onClick={() => setSelectedMenu("users")}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="사용자 관리" />
            </ListItem>
            <ListItem button onClick={() => setSelectedMenu("orders")}>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="주문 관리" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* 메인 컨텐츠 */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderContent()}
      </Box>
    </Box>
  );
}

export default AdminPage;
