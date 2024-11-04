import { createRouter, createWebHistory } from 'vue-router'
import LoginAdminView from '../views/LoginAdmin.vue';
import PainelView from '../views/PainelView.vue';
import AdminCreate from '../components/AdminCrud/AdminCreate.vue';
import AdminIndex from '../components/AdminCrud/AdminIndex.vue';
import HomeView from '../views/HomeView.vue';  
import AdminUpdate from '../components/AdminCrud/AdminUpdate.vue';
import verifyAuth from '@/services/verifyAuth';
import NotFound from '@/views/NotFound.vue';
import VeiculoIndex from '@/components/VeiculosCrud/VeiculoIndex.vue';
import VeiculoCreate from '@/components/VeiculosCrud/VeiculoCreate.vue';
import VeiculoUpdate from '@/components/VeiculosCrud/VeiculoUpdate.vue';
import MarcaIndex from '@/components/MarcaCrud/MarcaIndex.vue';
import MarcaCreate from '@/components/MarcaCrud/MarcaCreate.vue';
import MarcaUpdate from '@/components/MarcaCrud/MarcaUpdate.vue';
import CategoriaCreate from '@/components/CategoriaCrud/CategoriaCreate.vue';
import CategoriaIndex from '@/components/CategoriaCrud/CategoriaIndex.vue';
import CategoriaUpdate from '@/components/CategoriaCrud/CategoriaUpdate.vue';
import OpcionalIndex from '@/components/OpcionalCrud/OpcionalIndex.vue'; 
import OpcionalCreate from '@/components/OpcionalCrud/OpcionalCreate.vue';
import OpcionalUpdate from '@/components/OpcionalCrud/OpcionalUpdate.vue';
import Refresh from '@/services/refresh';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'painelLogin',
      component: LoginAdminView,
    },
    {
      path: '/admin/painel',
      name: 'painelAdmin',
      component: PainelView,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/painel/config',
      name: 'adminConfig',
      component: PainelView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/painel/create',
          name: 'AdminCreate',
          component: AdminCreate
        },
        {
          path: '/admin/painel/config',
          name: 'AdminIndex',
          component: AdminIndex
        },
        {
          path: '/admin/painel/edit/:id',
          name: 'AdminUpdate',
          component: AdminUpdate
        },
        {
          path: '/admin/painel/veiculos',
          name: 'VeiculoIndex',
          component: VeiculoIndex
        },
        {
          path: '/admin/painel/veiculo-create',
          name: 'VeiculoCreate',
          component: VeiculoCreate
        },
        {
          path: '/admin/painel/veiculo-update/:id',
          name: 'VeiculoUpdate',
          component: VeiculoUpdate
        },
        {
          path: '/admin/painel/marcas',
          name: 'MarcaIndex',
          component: MarcaIndex
        },
        {
          path: '/admin/painel/marca-update/:id',
          name: 'MarcaUpdate',
          component: MarcaUpdate 
        },
        {
          path: '/admin/painel/marca-create',
          name: 'MarcaCreate',
          component: MarcaCreate 
        },
        {
          path: '/admin/painel/categorias',
          name: 'CategoriaIndex',
          component: CategoriaIndex 
        },
        {
          path: '/admin/painel/categoria-create',
          name: 'CategoriaCreate',
          component: CategoriaCreate
        },
        {
          path: '/admin/painel/categoria-update/:id',
          name: 'CategoriaUpdate',
          component: CategoriaUpdate 
        },
        {
          path: '/admin/painel/opcionais',
          name: 'OpcionalIndex',
          component: OpcionalIndex
        },
        {
          path: '/admin/painel/opcional-create',
          name: 'OpcionalCreate',
          component: OpcionalCreate
        },
        {
          path: '/admin/painel/opcional-update/:id',
          name: 'OpcionalUpdate',
          component: OpcionalUpdate
        },

      ]
    },
    { 
      path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound 
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = await verifyAuth();
    if (isAuthenticated) {
      const refreshToken = await Refresh();
      if(refreshToken){
        next();
      }else{
        next({ name: 'home' });
      }
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});


export default router
