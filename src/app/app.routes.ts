import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { UserInfoComponent } from './components/profile-user/components/user-info/user-info.component';
import { OrderHistoryComponent } from './components/profile-user/components/order-history/order-history.component';
import { CartComponent } from './components/cart/cart.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PublicComponent } from './components/public/public.component';
import { AdminShopComponent } from './components/admin-shop/admin-shop.component';
import { DashboardComponent } from './components/admin-shop/components/dashboard/dashboard.component';
import { ProductManagementComponent } from './components/admin-shop/components/product-management/product-management.component';
import { CategoryManagementComponent } from './components/admin-shop/components/category-management/category-management.component';
import { AddProductComponent } from './components/admin-shop/components/add-product/add-product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

// Guard
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {path: "", component: PublicComponent, 
        children: [
            {path: "", component: HomeComponent},
            {path: "product-list", component: ProductListComponent, // danh sách sp
                children: [
                    {path: "product-detail/:product_slug", component: ProductDetailComponent}, // chi tiết sp
                ],
            },
            {path: "product-detail/:product_slug", component: ProductDetailComponent}, // chi tiết sp
            {path: "shop-page/:shop_name", component: ShopPageComponent}, // trang của shop
            {path: "profile-user", component: ProfileUserComponent, // trang hồ sơ người dùng
                children: [
                    {path: 'info', component: UserInfoComponent},
                    {path: 'order-history', component: OrderHistoryComponent},
                ],
            },
            {path: "cart", component: CartComponent, canActivate : [authGuard],
                children : [
                    {path : "checkout", component : CheckoutComponent},
                ]
            }, // trang giỏ hàng
        ],
    },
    {path: "admin-shop", component: AdminShopComponent, canActivate: [authGuard],
        children: [
            {path: "", component: DashboardComponent},
            {path: "dashboard", component: DashboardComponent},
            {path: "product-management", component: ProductManagementComponent, canActivate:[authGuard],
                children: [
                    {path: "add-product", component: AddProductComponent},
                ],
            },
            {path: "category-management", component: CategoryManagementComponent},
            {path: "add-product", component: AddProductComponent},
        ],
    }, // trang admin của shop
    {path: "sign-in", component: SignInComponent}, // trang đăng nhập
    {path: "sign-up", component: SignUpComponent}, // trang đăng ký
    //{path : "checkout", component : CheckoutComponent},

    //    
    {path: "**", component: NotFoundComponent} // route Not Found nên ở cuối cùng
];
