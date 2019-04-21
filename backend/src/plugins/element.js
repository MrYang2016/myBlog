import Vue from 'vue'
import { Button, Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, DropdownItem, Main, Table, TableColumn, Row, Col, Input, MessageBox, Message, Pagination } from 'element-ui'

Vue.use(Button);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Main);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Pagination);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
